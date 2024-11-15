import React, { useState } from 'react';

const Settings = () => {
    const [isVerified, setIsVerified] = useState(false);

    const handleVerification = () => {
        // Implement verification logic
        setIsVerified(true);
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md mt-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>

            {/* Account Verification Section */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Account Verification</h2>
                {isVerified ? (
                    <p className="text-green-500">Your account is verified.</p>
                ) : (
                    <>
                        <p className="mb-4 text-gray-600">Upload your ID to verify your account.</p>
                        <input type="file" className="mb-4 w-full" />
                        <button
                            onClick={handleVerification}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Verify Account
                        </button>
                    </>
                )}
            </section>

            {/* Additional Settings */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Manage Account</h2>
                <ul className="text-gray-700 space-y-2">
                    <li>
                        <button className="text-blue-500 hover:underline">Change Password</button>
                    </li>
                    <li>
                        <button className="text-blue-500 hover:underline">Notification Preferences</button>
                    </li>
                    <li>
                        <button className="text-blue-500 hover:underline">Delete Account</button>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Settings;
