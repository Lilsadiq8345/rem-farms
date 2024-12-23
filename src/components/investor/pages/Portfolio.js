import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [assets, setAssets] = useState([]);
    const [assetDistribution, setAssetDistribution] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch portfolio data on component mount
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                // Replace with actual API endpoint
                const portfolioResponse = await axios.get('https://rem-farms.onrender.com/api/portfolio');
                const assetsResponse = await axios.get('https://rem-farms.onrender.com/api/assets');
                const assetDistributionResponse = await axios.get('https://rem-farms.onrender.com/api/asset-distribution');

                setPortfolio(portfolioResponse.data);
                setAssets(assetsResponse.data);
                setAssetDistribution(assetDistributionResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!portfolio) {
        return <div>No portfolio data available.</div>;
    }

    return (
        <div className="portfolio-container">
            <h1 className="text-xl font-semibold mb-4">Investor Portfolio</h1>

            <div className="portfolio-summary mb-6">
                <div className="total-investment">
                    <h2>Total Investment</h2>
                    <p>${portfolio.TOTAL_INVESTMENT}</p>
                </div>
                <div className="current-value">
                    <h2>Current Value</h2>
                    <p>${portfolio.CURRENT_VALUE}</p>
                </div>
                <div className="returns">
                    <h2>Returns</h2>
                    <p>{portfolio.RETURNS}%</p>
                </div>
            </div>

            <div className="portfolio-assets mb-6">
                <h2 className="text-lg font-semibold mb-2">Assets</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Asset Name</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <tr key={asset.ASSET_ID}>
                                <td className="border border-gray-300 px-4 py-2">{asset.NAME}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.QUANTITY}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.UNIT}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="portfolio-distribution">
                <h2 className="text-lg font-semibold mb-2">Asset Distribution</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assetDistribution.map((distribution) => (
                            <tr key={distribution.DISTRIBUTION_ID}>
                                <td className="border border-gray-300 px-4 py-2">{distribution.TYPE}</td>
                                <td className="border border-gray-300 px-4 py-2">{distribution.PERCENTAGE}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;
