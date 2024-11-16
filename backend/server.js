require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const http = require('http');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const Paystack = require('paystack-node');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY, true);

// Configure MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lilsadiq8345',
    database: 'rem_farms',
    connectionLimit: 10,
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'BTh7ckdEi97Tkzkhdn0PHA/Q1VsoDid837z96QArotA=';

// Configure Nodemailer for email verification
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/recordings', express.static(path.join(__dirname, 'recordings')));

// Check Database Connection
db.getConnection()
    .then(() => console.log('Connected to MySQL'))
    .catch(err => console.error('MySQL Connection Error:', err));

// Utility Function - JWT Token Verification
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.userId = decoded.userId;
        next();
    });
};

// Socket.IO Events
io.on('connection', (socket) => {
    // Handle video start and stop events
    socket.on('video-start', () => io.emit('video-start'));
    socket.on('video-stop', () => io.emit('video-stop'));

    // Record video data
    socket.on('video-data', (data) => fs.appendFile('video_recording.webm', data, (err) => {
        if (err) console.error('Error recording video:', err);
    }));

    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

// User Registration with Email Verification
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, userType } = req.body;
    if (!userType || !['investor', 'staff', 'admin', 'super_admin'].includes(userType)) {
        return res.status(400).json({ message: 'Invalid or missing user type' });
    }

    try {
        const [results] = await db.query('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
        if (results.length > 0) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        const [result] = await db.query(
            'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD_HASH, USER_TYPE) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, userType]
        );

        const verificationLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;

        // Send verification email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Account Verification',
            text: `Please verify your account by clicking the following link: ${verificationLink}`,
        });

        res.status(201).json({ success: true, message: 'Registration successful! Please check your email for verification.' });
    } catch (err) {
        console.error('Error during registration:', err);  // Improved logging
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});


// User Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
        if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

        const user = results[0];
        if (user.VERIFIED === 0) return res.status(403).json({ message: 'Please verify your email before logging in' });

        const isValidPassword = await bcrypt.compare(password, user.PASSWORD_HASH);
        if (!isValidPassword) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user.USER_ID, userType: user.USER_TYPE }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Fetch User Profile
app.get('/api/users/profile', verifyToken, async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM USER_PROFILES WHERE USER_ID = ?', [req.userId]);
        res.json({ success: true, profile: results[0] });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Fetch All Commodities
app.get('/api/commodities', async (req, res) => {
    try {
        const [commodities] = await db.query('SELECT * FROM COMMODITIES WHERE STATUS = "available"');
        res.json({ success: true, commodities });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Add New Commodity
app.post('/api/commodities', verifyToken, async (req, res) => {
    const { name, category, description, price, quantity, imageUrl, staffId } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO COMMODITIES (NAME, CATEGORY, DESCRIPTION, PRICE, QUANTITY, IMAGE_URL, STAFF_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, category, description, price, quantity, imageUrl, staffId]
        );
        res.status(201).json({ success: true, message: 'Commodity added successfully', commodityId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Add to Cart
app.post("/api/cart", verifyToken, async (req, res) => {
    const { commodityId, quantity } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO CART_ITEMS (USER_ID, COMMODITY_ID, QUANTITY) VALUES (?, ?, ?)',
            [req.userId, commodityId, quantity]
        );
        res.json({ message: 'Commodity added to cart successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Initiate Payment
app.post("/api/checkout", verifyToken, async (req, res) => {
    const { serviceId, amount } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM USERS WHERE USER_ID = ?", [req.userId]);
        if (!user) return res.status(404).json({ message: "User not found" });

        const transaction = await paystack.initializeTransaction({
            email: user[0].EMAIL,
            amount: amount * 100,
            callback_url: "http://localhost:3000/payment-callback"
        });

        await db.query(
            "INSERT INTO TRANSACTIONS (USER_ID, SERVICE_ID, TRANSACTION_REFERENCE, AMOUNT) VALUES (?, ?, ?, ?)",
            [req.userId, serviceId, transaction.data.reference, amount]
        );

        res.json({ authorization_url: transaction.data.authorization_url });
    } catch (error) {
        res.status(500).json({ message: "Error initializing payment", error });
    }
});

// Verify Payment
app.get("/api/verify/:reference", async (req, res) => {
    try {
        const response = await paystack.verifyTransaction(req.params.reference);
        const status = response.data.status;
        res.json({ status, message: status === 'success' ? 'Payment successful' : 'Payment failed' });
    } catch (error) {
        res.status(500).json({ message: "Error verifying payment", error });
    }
});

app.get('/api/auth/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        await db.query('UPDATE USERS SET VERIFIED = 1 WHERE EMAIL = ?', [email]);
        res.redirect('http://localhost:3000/investor-login'); // Redirect to login page after verification
    } catch (err) {
        res.status(500).json({ message: 'Error verifying account', error: err });
    }
});




// Fetch all services (active and inactive) for all users
app.get('/api/services', async (req, res) => {
    try {
        const [services] = await db.query('SELECT * FROM SERVICES');
        res.json({ success: true, services });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
