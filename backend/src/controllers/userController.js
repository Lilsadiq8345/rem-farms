// /controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
    const { email, password, userType } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    User.createUser(email, passwordHash, userType, verificationToken, (err) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        const verificationLink = `https://rem-farms.onrender.com/api/users/verify/${verificationToken}`;
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`
        }, (error) => {
            if (error) return res.status(500).json({ message: 'Error sending verification email' });
            res.status(201).json({ message: 'User registered, verification email sent' });
        });
    });
};

exports.verifyEmail = (req, res) => {
    const { token } = req.params;
    User.verifyUser(token, (err, result) => {
        if (err || result.affectedRows === 0) return res.status(400).json({ message: 'Invalid or expired token' });
        res.json({ message: 'Email verified successfully' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        if (!user.VERIFIED) return res.status(400).json({ message: 'Please verify your email' });

        const isMatch = await bcrypt.compare(password, user.PASSWORD_HASH);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user.USER_ID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};
