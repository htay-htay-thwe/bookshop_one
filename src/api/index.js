// src/api/index.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://gentle-adventure-production.up.railway.app/api'
});

export default api;
