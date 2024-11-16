// config/db.js
const mysql = require('mysql2/promise');  // Using the promise version

const db = mysql.createPool({
    host: process.env.DB_HOST || 'rem-farms-db.db.render.com',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rem_farms',
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
