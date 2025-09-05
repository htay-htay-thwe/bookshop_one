// src/api/index.js
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const api = axios.create({
    // baseURL: 'https://gentle-adventure-production.up.railway.app/api'
    baseURL: `${BASE_URL}/api`,
});

export const BOOKS_BASE_URL = `${BASE_URL}/books/`;

