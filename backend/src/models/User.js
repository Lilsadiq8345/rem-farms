// /models/User.js
const db = require('../config/db');

const User = {
    createUser: (email, passwordHash, userType, verificationToken, callback) => {
        const sql = `INSERT INTO USERS (EMAIL, PASSWORD_HASH, USER_TYPE, VERIFICATION_TOKEN) VALUES (?, ?, ?, ?)`;
        db.query(sql, [email, passwordHash, userType, verificationToken], callback);
    },
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM USERS WHERE EMAIL = ?`;
        db.query(sql, [email], callback);
    },
    verifyUser: (token, callback) => {
        const sql = `UPDATE USERS SET VERIFIED = TRUE, VERIFICATION_TOKEN = NULL WHERE VERIFICATION_TOKEN = ?`;
        db.query(sql, [token], callback);
    }
};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
