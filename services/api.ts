import axios from 'axios';

// Use the permanent HTTPS tunnel for Vercel deployment!
const API_BASE_URL = 'https://ecosort-backend-2026.loca.lt/api';

// Globally bypass the local tunnel warning screen so AI images upload perfectly!
axios.defaults.headers.common['Bypass-Tunnel-Reminder'] = 'true';
axios.defaults.headers.common['localtunnel-skip-warning'] = 'true';

export const uploadWasteImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(`${API_BASE_URL}/classify`, formData);
    return response.data;
};

export const getAnalytics = async () => {
    // Falls back to dashboard stats if new architecture isn't fully seeded yet
    try {
        const response = await axios.get(`${API_BASE_URL}/analytics`);
        return response.data;
    } catch {
        const fallback = await axios.get(`${API_BASE_URL}/dashboard/stats`);
        return fallback.data;
    }
};

export const getRecyclingCenters = async () => {
    const response = await axios.get(`${API_BASE_URL}/recycling-centers`);
    return response.data;
};

export const getHotspots = async () => {
    const response = await axios.get(`${API_BASE_URL}/hotspots`);
    return response.data;
};

export const getEcoPoints = async () => {
    let userId = 'default_user';
    if (typeof window !== 'undefined') userId = localStorage.getItem('userId') || 'default_user';
    const response = await axios.get(`${API_BASE_URL}/eco-points`, { headers: { 'user-id': userId } });
    return response.data;
};

export const addEcoPoints = async (action: string) => {
    let userId = 'default_user';
    if (typeof window !== 'undefined') userId = localStorage.getItem('userId') || 'default_user';
    const response = await axios.post(`${API_BASE_URL}/add-points`, { action }, { headers: { 'user-id': userId } });
    return response.data;
};

// Auth services
export const loginUser = async (credentials: any) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
};

export const googleLoginUser = async (token: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/google`, { token });
    return response.data;
};

export const registerUser = async (data: any) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return response.data;
};

export const getHeatmapData = async () => {
    const response = await axios.get(`${API_BASE_URL}/heatmap`);
    return response.data;
};

export const getImpactStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/impact`);
    return response.data;
};
