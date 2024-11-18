// server.js

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

// Environment Variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;  // The email should be stored in an environment variable
const EMAIL_PASS = process.env.EMAIL_PASS;  // The email password should also be stored in an environment variable
const PORT = process.env.PORT || 5000;  // Default to 5000 if not set

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://rem-farms-1.onrender.com',  // Change to your front-end URL
        methods: ['GET', 'POST'],
    },
});

// Paystack initialization (ensure PAYSTACK_SECRET_KEY is defined somewhere in your environment)
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY, true);

// Configure MySQL
const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10,
});

// Configure Nodemailer for email verification
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://rem-farms-1.onrender.com' }));  // Add your React frontend URL here
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
    console.log('User connected:', socket.id);

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

        const verificationLink = `https://rem-farms-1.onrender.com/api/auth/verify/${verificationToken}`;

        // Send verification email
        await transporter.sendMail({
            from: EMAIL_USER,
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
            amount: amount * 100,  // Paystack expects amount in kobo
            callback_url: "https://rem-farms-1.onrender.com/payment-callback"
        });

        await db.query(
            "INSERT INTO TRANSACTIONS (USER_ID, SERVICE_ID, TRANSACTION_REFERENCE, AMOUNT) VALUES (?, ?, ?, ?)",
            [req.userId, serviceId, transaction.data.reference, amount]
        );

        res.json({ authorization_url: transaction.data.authorization_url });
    } catch (error) {
        res.status(500).json({ message: 'Error initializing payment', error: error.message });
    }
});

// Payment Callback
app.get("/payment-callback", async (req, res) => {
    const { reference } = req.query;
    try {
        const verification = await paystack.verifyTransaction(reference);
        if (verification.data.status === 'success') {
            await db.query(
                "UPDATE TRANSACTIONS SET STATUS = ? WHERE TRANSACTION_REFERENCE = ?",
                ['completed', reference]
            );
            res.json({ success: true, message: "Payment successful" });
        } else {
            res.status(400).json({ message: "Payment failed" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment', error: error.message });
    }
});

// Email Verification
app.get('/api/auth/verify/:token', (req, res) => {
    const { token } = req.params;
    console.log('Verification token received:', token);  // Log the token for debugging

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        const { email } = decoded;
        console.log('Decoded token:', decoded);  // Log the decoded token to check if the email is present

        try {
            const [results] = await db.query('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
            if (results.length === 0) {
                console.error('User not found with email:', email);
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('User found:', results[0]);

            const updateResult = await db.query('UPDATE USERS SET VERIFIED = 1 WHERE EMAIL = ?', [email]);
            console.log('Update result:', updateResult);  // Log the result of the update operation

            if (updateResult.affectedRows > 0) {
                res.json({ success: true, message: 'Email successfully verified' });
            } else {
                console.error('Failed to update verification status for email:', email);
                res.status(500).json({ message: 'Failed to update verification status' });
            }
        } catch (err) {
            console.error('Error during verification process:', err);
            res.status(500).json({ message: 'Database error', error: err });
        }
    });
});


// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
