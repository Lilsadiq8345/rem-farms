// config/db.js
const mysql = require('mysql2/promise');  // Using the promise version

const db = mysql.createPool({
    host: process.env.DB_HOST || 'sql8.freesqldatabase.com',
    user: process.env.DB_USER || 'sql8747082',
    password: process.env.DB_PASSWORD || 'lLlLASfBlt',
    database: process.env.DB_NAME || 'sql8747082',
});

// Test the database connection using async/await
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the database');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testConnection();

module.exports = { db };
