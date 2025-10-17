// auth.js - Authentication utilities

const API_BASE_URL = 'http://localhost:8080/api';

// Check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
}

// Get authentication token
function getToken() {
    return localStorage.getItem('token');
}

// Get current user info
function getCurrentUser() {
    return {
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
    };
}

// Logout user
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Make authenticated API call
async function authenticatedFetch(url, options = {}) {
    const token = getToken();

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401 || response.status === 403) {
            logout();
            return;
        }

        return response;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Save test result
async function saveTestResult(wpm, accuracy, difficulty, duration) {
    const response = await authenticatedFetch(`${API_BASE_URL}/results`, {
        method: 'POST',
        body: JSON.stringify({
            wpm: wpm,
            accuracy: accuracy,
            difficulty: difficulty,
            duration: duration
        })
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to save test result');
    }
}

// Get user's test results
async function getUserResults() {
    const response = await authenticatedFetch(`${API_BASE_URL}/results/user`);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch results');
    }
}

// Get user's best results
async function getUserBestResults() {
    const response = await authenticatedFetch(`${API_BASE_URL}/results/user/best`);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch best results');
    }
}

// Get user's statistics
async function getUserStats() {
    const response = await authenticatedFetch(`${API_BASE_URL}/results/user/stats`);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch statistics');
    }
}