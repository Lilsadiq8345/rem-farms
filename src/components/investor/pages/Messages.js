import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Messages = () => {
    const [messages, setMessages] = useState([]); // State to hold messages
    const [currentThread, setCurrentThread] = useState(null); // Current selected conversation
    const [newMessage, setNewMessage] = useState(''); // State to hold new message
    const [staffMembers, setStaffMembers] = useState([]); // List of staff members the investor can chat with
    const [loading, setLoading] = useState(false);

    // Fetch the staff members the investor is allowed to chat with
    useEffect(() => {
        const fetchStaff = async () => {
            setLoading(true);
            try {
                // Example: replace with actual API request to get staff related to the investor
                const response = await axios.get('/api/staff');
                setStaffMembers(response.data);
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    // Fetching messages for the current thread (dummy data for now)
    useEffect(() => {
        if (currentThread) {
            // Simulate fetching messages from an API
            setMessages([
                { sender: 'Staff', text: 'Hello! How can I assist you today?', time: '10:00 AM' },
                { sender: 'You', text: 'I have a question regarding my investments.', time: '10:05 AM' },
            ]);
        }
    }, [currentThread]);

    // Send message function (Simulating sending a message)
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                { sender: 'You', text: newMessage, time: new Date().toLocaleTimeString() },
            ]);
            setNewMessage('');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>

            <div className="flex">
                {/* Sidebar with list of staff members */}
                <div className="w-1/3 border-r-2 pr-4">
                    <h3 className="font-semibold mb-4">Conversations</h3>
                    {loading ? (
                        <p>Loading staff members...</p>
                    ) : (
                        <ul>
                            {staffMembers.length === 0 ? (
                                <li>No staff available to chat with.</li>
                            ) : (
                                staffMembers.map((staff) => (
                                    <li
                                        key={staff.id}
                                        className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${currentThread?.id === staff.id ? 'bg-gray-300' : ''}`}
                                        onClick={() => setCurrentThread(staff)}
                                    >
                                        {staff.name} ({staff.role})
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>

                {/* Chat Window */}
                <div className="w-2/3 pl-4">
                    {currentThread ? (
                        <>
                            <h3 className="font-semibold text-xl mb-4">Chat with {currentThread.name}</h3>
                            <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-md">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}
                                    >
                                        <p className={`text-sm ${message.sender === 'You' ? 'bg-blue-500 text-white inline-block p-2 rounded-lg' : 'bg-gray-200 inline-block p-2 rounded-lg'}`}>
                                            {message.text}
                                        </p>
                                        <span className="text-xs text-gray-400 ml-2">{message.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Message input */}
                            <div className="flex items-center mt-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button
                                    className="ml-2 text-white bg-green-600 p-2 rounded-lg"
                                    onClick={handleSendMessage}
                                >
                                    <FaPaperPlane size={18} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">Select a staff member to start chatting.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
