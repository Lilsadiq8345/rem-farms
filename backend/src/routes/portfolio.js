// routes/portfolio.js
const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Assuming a database configuration file

// GET portfolio data for a specific user
router.get('/portfolio/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch portfolio details
        const [portfolio] = await db.query(
            `SELECT TOTAL_INVESTMENT, CURRENT_VALUE, RETURNS FROM PORTFOLIOS WHERE USER_ID = ?`,
            [userId]
        );

        // Fetch assets
        const assets = await db.query(
            `SELECT NAME, QUANTITY, UNIT FROM ASSETS WHERE PORTFOLIO_ID = ?`,
            [portfolio[0].PORTFOLIO_ID]
        );

        // Fetch asset distribution
        const distribution = await db.query(
            `SELECT TYPE, PERCENTAGE FROM ASSET_DISTRIBUTION WHERE PORTFOLIO_ID = ?`,
            [portfolio[0].PORTFOLIO_ID]
        );

        res.json({ portfolio: portfolio[0], assets, distribution });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching portfolio data' });
    }
});

module.exports = router;
