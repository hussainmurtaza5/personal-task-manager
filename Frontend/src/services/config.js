const defaultApiUrl = import.meta.env.DEV
	? 'http://localhost:8000'
	: 'https://task-manage-backend-ten.vercel.app';

export const API_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, '');
