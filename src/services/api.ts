import axios from 'axios';

// Define your API base URL
const baseURL = 'https://api.example.com';

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL,
});

// Define your API methods
export const get = async (url: string) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const post = async (url: string, data: any) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Export the api instance
export default api;