import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedCalls = () => {
    const [savedCalls, setSavedCalls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSavedCalls = async () => {
            setLoading(true);
            try {
                // Replace with your actual API endpoint
                const response = await axios.get('https://rem-farms.onrender.com/api/saved-calls');
                setSavedCalls(response.data);
            } catch (error) {
                console.error('Error fetching saved calls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedCalls();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Saved Live Calls</h2>
            {loading ? (
                <p>Loading saved calls...</p>
            ) : (
                <ul>
                    {savedCalls.length === 0 ? (
                        <p>No saved calls found.</p>
                    ) : (
                        savedCalls.map((call) => (
                            <li key={call.id} className="p-2 border-b">
                                <div className="flex justify-between">
                                    <span>{call.title}</span>
                                    <span>{call.date}</span>
                                </div>
                                <p>{call.description}</p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default SavedCalls;
