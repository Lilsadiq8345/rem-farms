import React from "react";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
    const navigate = useNavigate();

    // Handle Invest Now Button Click
    const handleInvestNow = (planType) => {
        console.log(`Selected Plan: ${planType}`);
        navigate("/investor-register"); // Redirect to the investor-register page
    };

    return (
        <section className="bg-green-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Section Header */}
                <h2 className="text-4xl font-bold mb-4">
                    Choose the Best Offered <span className="text-green-300">Plan</span> From Rem-Farms
                </h2>
                <p className="text-lg mb-12">
                    Gain unparalleled access to farmland investments, carefully vetted through rigorous due
                    diligence to ensure optimal returns.
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Plan 1 */}
                    <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Basic</h3>
                        <p className="text-4xl font-bold mb-4">$50</p>
                        <ul className="text-left space-y-2 mb-6">
                            <li>✔️ 2.5% Profit</li>
                            <li>✔️ Return Period: Daily</li>
                            <li>✔️ Duration: 2 Days</li>
                            <li>✔️ Total ROI: 5%</li>
                            <li>✔️ Capital Back</li>
                        </ul>
                        <button
                            onClick={() => handleInvestNow("Basic")}
                            className="bg-green-400 hover:bg-green-500 text-green py-2 px-4 rounded-lg"
                        >
                            Invest Now
                        </button>
                    </div>

                    {/* Plan 2 */}
                    <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Standard</h3>
                        <p className="text-4xl font-bold mb-4">$1,000</p>
                        <ul className="text-left space-y-2 mb-6">
                            <li>✔️ 3.5% Profit</li>
                            <li>✔️ Return Period: Daily</li>
                            <li>✔️ Duration: 2 Days</li>
                            <li>✔️ Total ROI: 7%</li>
                            <li>✔️ Capital Back</li>
                        </ul>
                        <button
                            onClick={() => handleInvestNow("Standard")}
                            className="bg-green-400 hover:bg-green-500 text-green py-2 px-4 rounded-lg"
                        >
                            Invest Now
                        </button>
                    </div>

                    {/* Plan 3 */}
                    <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Premium</h3>
                        <p className="text-4xl font-bold mb-4">$3,000</p>
                        <ul className="text-left space-y-2 mb-6">
                            <li>✔️ 5% Profit</li>
                            <li>✔️ Return Period: Daily</li>
                            <li>✔️ Duration: 5 Days</li>
                            <li>✔️ Total ROI: 25%</li>
                            <li>✔️ Capital Back</li>
                        </ul>
                        <button
                            onClick={() => handleInvestNow("Premium")}
                            className="bg-green-400 hover:bg-green-500 text-green py-2 px-4 rounded-lg"
                        >
                            Invest Now
                        </button>
                    </div>

                    {/* Plan 4 */}
                    <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                        <p className="text-4xl font-bold mb-4">$5,000</p>
                        <ul className="text-left space-y-2 mb-6">
                            <li>✔️ 7% Profit</li>
                            <li>✔️ Return Period: Daily</li>
                            <li>✔️ Duration: 5 Days</li>
                            <li>✔️ Total ROI: 35%</li>
                            <li>✔️ Capital Back</li>
                        </ul>
                        <button
                            onClick={() => handleInvestNow("Enterprise")}
                            className="bg-green-400 hover:bg-green-500 text-green py-2 px-4 rounded-lg"
                        >
                            Invest Now
                        </button>
                    </div>

                    {/* Plan 5 */}
                    <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Business Plan</h3>
                        <p className="text-4xl font-bold mb-4">$7,000</p>
                        <ul className="text-left space-y-2 mb-6">
                            <li>✔️ 8.5% Profit</li>
                            <li>✔️ Return Period: Daily</li>
                            <li>✔️ Duration: 10 Days</li>
                            <li>✔️ Total ROI: 85%</li>
                            <li>✔️ Capital Back</li>
                        </ul>
                        <button
                            onClick={() => handleInvestNow("Business Plan")}
                            className="bg-green-400 hover:bg-green-500 text-green py-2 px-4 rounded-lg"
                        >
                            Invest Now
                        </button>
                    </div>

                    {/* Plan 6 */}
                    <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Ultimate</h3>
                        <p className="text-4xl font-bold mb-4">$10,000</p>
                        <ul className="text-left space-y-2 mb-6">
                            <li>✔️ 10% Profit</li>
                            <li>✔️ Return Period: Daily</li>
                            <li>✔️ Duration: 10 Days</li>
                            <li>✔️ Total ROI: 100%</li>
                            <li>✔️ Capital Back</li>
                        </ul>
                        <button
                            onClick={() => handleInvestNow("Ultimate")}
                            className="bg-green-400 hover:bg-green-500 text-green py-2 px-4 rounded-lg"
                        >
                            Invest Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;
