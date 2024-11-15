// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { db } = require('../config/db'); // Assuming db connection is in config/db.js
const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password, userType } = req.body;

    try {
        // Check if the user already exists
        const [existingUser] = await db.query('SELECT * FROM USERS WHERE EMAIL = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database with verification status as 'pending'
        const result = await db.query(
            'INSERT INTO USERS (EMAIL, PASSWORD_HASH, USER_TYPE, VERIFICATION_STATUS) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, userType || 'investor', 'pending']
        );

        // Send verification email
        const verificationToken = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link:
            http://localhost:5000/api/auth/verify/${verificationToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'Registration successful. Please check your email.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Email Verification Route
router.get('/verify/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [user] = await db.query('SELECT * FROM USERS WHERE ID = ?', [decoded.userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update verification status
        await db.query('UPDATE USERS SET VERIFICATION_STATUS = ? WHERE ID = ?', ['verified', decoded.userId]);

        res.redirect('http://localhost:3000/investor-login');  // Redirect to the login page
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired verification link' });
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const [user] = await db.query('SELECT * FROM USERS WHERE EMAIL = ?', [email]);

        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the user is verified
        if (user[0].VERIFICATION_STATUS !== 'verified') {
            return res.status(400).json({ message: 'Please verify your email before logging in.' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user[0].PASSWORD_HASH);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user[0].USER_ID, email: user[0].EMAIL },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
