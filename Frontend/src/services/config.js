// Use the deployed API in local development too. Set VITE_API_URL=http://localhost:8000
// only when running the backend locally.
const defaultApiUrl = 'https://task-manage-backend-ten.vercel.app';

export const API_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, '');
