// src/components/investor/pages/Portfolio.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch portfolio data
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await axios.get('/api/investor/portfolio'); // API endpoint to fetch portfolio data
                setPortfolioData(response.data);
            } catch (err) {
                setError('Failed to load portfolio data');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="portfolio-page">
            <h1>My Portfolio</h1>
            <div className="portfolio-summary">
                <h2>Portfolio Summary</h2>
                <p>Total Investment: ${portfolioData.totalInvestment}</p>
                <p>Current Value: ${portfolioData.currentValue}</p>
                <p>Returns: {portfolioData.returns}%</p>
            </div>

            <div className="portfolio-assets">
                <h2>My Assets</h2>
                <ul>
                    {portfolioData.assets.map((asset, index) => (
                        <li key={index}>
                            {asset.name}: {asset.quantity} {asset.unit}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="portfolio-distribution">
                <h2>Asset Distribution</h2>
                {portfolioData.distribution.map((dist, index) => (
                    <p key={index}>{dist.type}: {dist.percentage}%</p>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
