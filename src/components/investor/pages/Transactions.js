import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                // Replace with your actual API endpoint
                const response = await axios.get('https://rem-farms.onrender.com/api/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
            {loading ? (
                <p>Loading transactions...</p>
            ) : (
                <ul>
                    {transactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        transactions.map((transaction) => (
                            <li key={transaction.id} className="p-2 border-b">
                                <div className="flex justify-between">
                                    <span>{transaction.date}</span>
                                    <span>{transaction.amount}</span>
                                </div>
                                <p>{transaction.description}</p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default Transactions;
