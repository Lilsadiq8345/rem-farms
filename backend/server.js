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
const dotenv = require('dotenv');



dotenv.config();

// Environment Variables
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS,
    PAYSTACK_SECRET_KEY,
    PORT = 5000
} = process.env;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://rem-farms-1.onrender.com',  // Update with your front-end URL
        methods: ['GET', 'POST'],
    },
});

// Paystack initialization
const paystack = new Paystack(PAYSTACK_SECRET_KEY, true);

// Configure MySQL connection pool
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
app.use(cors({ origin: 'https://rem-farms-1.onrender.com' }));  // Update to your React frontend URL
app.use('/recordings', express.static(path.join(__dirname, 'recordings')));

// Check Database Connection
db.getConnection()
    .then(() => console.log('Connected to MySQL'))
    .catch(err => console.error('MySQL Connection Error:', err));

// Utility Function - JWT Token Verification
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    const cleanToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(cleanToken, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.userId = decoded.userId;
        req.userType = decoded.userType;
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

// Routes

// User Registration
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, userType } = req.body;
    if (!userType || !['investor', 'staff', 'admin', 'super_admin'].includes(userType)) {
        return res.status(400).json({ message: 'Invalid or missing user type' });
    }

    try {
        const [results] = await db.query('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
        if (results.length > 0) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD_HASH, USER_TYPE) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, userType]
        );

        res.status(201).json({ success: true, message: 'Registration successful! You can now log in.' });
    } catch (err) {
        console.error('Error during registration:', err);
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

// Add items to the cart for logged-in users
app.post('/api/cart', verifyToken, async (req, res) => {
    const { commodityId, quantity } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO CART_ITEMS (USER_ID, COMMODITY_ID, QUANTITY) VALUES (?, ?, ?)',
            [req.userId, commodityId, quantity]
        );
        res.json({ message: 'Item added to cart successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Sync localStorage cart to database upon login
app.post('/api/cart/sync', verifyToken, async (req, res) => {
    const { cart } = req.body;

    try {
        for (const item of cart) {
            await db.query(
                'INSERT INTO CART_ITEMS (USER_ID, COMMODITY_ID, QUANTITY) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE QUANTITY = QUANTITY + VALUES(QUANTITY)',
                [req.userId, item.commodityId, item.quantity]
            );
        }
        res.json({ message: 'Cart synced successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Fetch all cart items for logged-in users
app.get('/api/cart', verifyToken, async (req, res) => {
    try {
        const [cartItems] = await db.query(
            `SELECT c.*, cm.NAME AS commodityName, cm.PRICE AS commodityPrice, cm.IMAGE_URL AS commodityImage
             FROM CART_ITEMS c
             JOIN COMMODITIES cm ON c.COMMODITY_ID = cm.COMMODITY_ID
             WHERE c.USER_ID = ?`,
            [req.userId]
        );
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});

// Fetch All Services
app.get('/api/services', async (req, res) => {
    try {
        const [services] = await db.query('SELECT * FROM SERVICES WHERE STATUS = "active"');
        res.json({ success: true, services });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
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
            res.json({ message: 'Payment successful!' });
        } else {
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error verifying payment', error: err.message });
    }
});


// Fetch Notification Count for User
app.get('/api/notifications/count/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId;
    try {
        const [notifications] = await db.query(
            'SELECT COUNT(*) AS count FROM NOTIFICATIONS WHERE USER_ID = ?',
            [userId]
        );
        res.json(notifications[0].count); // Return the count of notifications
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
});


// File Upload for User Avatar
app.post('/api/upload-avatar', verifyToken, (req, res) => {
    const { image } = req.body;
    const fileName = `avatar_${req.userId}.png`;
    const filePath = path.join(__dirname, 'uploads', fileName);

    fs.writeFile(filePath, image, 'base64', (err) => {
        if (err) return res.status(500).json({ message: 'Error saving avatar', error: err.message });
        res.json({ success: true, message: 'Avatar uploaded successfully', filePath });
    });
});

// Send or reply to a message (Investor <-> Staff)
app.post('/api/messages', verifyToken, async (req, res) => {
    const { receiverId, messageText, parentMessageId } = req.body;

    // Validate input
    if (!messageText || !receiverId) {
        return res.status(400).json({ message: 'Receiver ID and message text are required' });
    }

    try {
        // Ensure the sender is either an investor or a staff member
        const [sender] = await db.query('SELECT * FROM USERS WHERE USER_ID = ?', [req.userId]);
        if (sender.length === 0) {
            return res.status(400).json({ message: 'Sender not found' });
        }

        // Ensure the receiver is either an investor or staff
        const [receiver] = await db.query('SELECT * FROM USERS WHERE USER_ID = ?', [receiverId]);
        if (receiver.length === 0) {
            return res.status(400).json({ message: 'Receiver not found' });
        }

        // Insert the message into the database
        // If it's a reply, include the parent_message_id
        const [result] = await db.query(
            'INSERT INTO MESSAGES (SENDER_ID, RECEIVER_ID, MESSAGE_TEXT, PARENT_MESSAGE_ID) VALUES (?, ?, ?, ?)',
            [req.userId, receiverId, messageText, parentMessageId || null]  // Use null for non-replies
        );

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

// Fetch all messages for a user (both sent and received)
app.get('/api/messages', verifyToken, async (req, res) => {
    try {
        const [messages] = await db.query(`
            SELECT m.MESSAGE_ID, m.SENDER_ID, m.RECEIVER_ID, m.MESSAGE_TEXT, m.PARENT_MESSAGE_ID, m.CREATED_AT
            FROM MESSAGES m
            WHERE m.SENDER_ID = ? OR m.RECEIVER_ID = ?
            ORDER BY m.CREATED_AT DESC
        `, [req.userId, req.userId]);

        res.json({ success: true, messages });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});


// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
