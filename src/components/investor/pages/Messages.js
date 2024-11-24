import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

// Main Chat Component
const Messages = ({ userType }) => {
    const [messages, setMessages] = useState([]); // State to hold messages
    const [currentThread, setCurrentThread] = useState(null); // Current selected conversation
    const [newMessage, setNewMessage] = useState(''); // State to hold new message
    const [userList, setUserList] = useState([]); // List of staff or investors the user can chat with
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    // Fetch the list of users (staff for investors, investors for staff)
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const endpoint = userType === 'investor' ? '/api/staff' : '/api/investors';
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://rem-farms.onrender.com${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set user list based on user type
                setUserList(userType === 'investor' ? response.data.staff : response.data.investors);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [userType]);

    // Fetch messages for the current thread
    useEffect(() => {
        if (currentThread) {
            // Simulate fetching messages from an API
            const fetchMessages = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`https://rem-farms.onrender.com/api/messages/${currentThread.USER_ID}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setMessages(response.data.messages || []);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };

            fetchMessages();
        }
    }, [currentThread]);

    // Send a message
    const handleSendMessage = async () => {
        if (newMessage.trim() && currentThread) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'https://rem-farms.onrender.com/api/messages',
                    {
                        receiverId: currentThread.USER_ID,
                        messageText: newMessage,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    // Update local state with the new message
                    setMessages([
                        ...messages,
                        { SENDER_ID: 'you', MESSAGE_TEXT: newMessage, CREATED_AT: new Date().toISOString() },
                    ]);
                    setNewMessage(''); // Clear input after sending
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    // Filtered user list based on search term
    const filteredUsers = userList.filter(user =>
        user.USERNAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.EMAIL.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>

            <div className="flex">
                {/* Sidebar with list of users */}
                <div className="w-1/3 border-r-2 pr-4">
                    <h3 className="font-semibold mb-4">Conversations</h3>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {filteredUsers.length === 0 ? (
                                <li>No users available to chat with.</li>
                            ) : (
                                filteredUsers.map((user) => (
                                    <li
                                        key={user.USER_ID}
                                        className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${currentThread?.USER_ID === user.USER_ID ? 'bg-gray-300' : ''
                                            }`}
                                        onClick={() => setCurrentThread(user)}
                                    >
                                        {user.USERNAME} ({user.EMAIL})
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
                            <h3 className="font-semibold text-xl mb-4">Chat with {currentThread.USERNAME}</h3>
                            <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-md">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`mb-4 ${message.SENDER_ID === 'you' ? 'text-right' : ''}`}
                                    >
                                        <p className={`text-sm ${message.SENDER_ID === 'you' ? 'bg-blue-500 text-white inline-block p-2 rounded-lg' : 'bg-gray-200 inline-block p-2 rounded-lg'}`}>
                                            {message.MESSAGE_TEXT}
                                        </p>
                                        <span className="text-xs text-gray-400 ml-2">{new Date(message.CREATED_AT).toLocaleTimeString()}</span>
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
                        <p className="text-gray-500">Select a user to start chatting.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
