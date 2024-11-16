// src/utils/api.js
import axios from 'axios';

const API_URL = 'https://rem-farms.onrender.com/api/auth';  // Replace with your backend URL

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;  // Return the response data (success, message, etc.)
    } catch (error) {
        throw error.response ? error.response.data : 'An error occurred';
    }
};



