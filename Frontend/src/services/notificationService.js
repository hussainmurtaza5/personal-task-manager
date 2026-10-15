import { getToken } from './authService';
import { API_URL } from './config';

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
            ...options.headers,
        },
    });
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || 'Notification request failed');
    }
    return response.json();
}

export function getNotifications() {
    return request('/notifications/');
}

export function acceptNotification(notificationId) {
    return request(`/notifications/${notificationId}/accept`, { method: 'POST' });
}

export function declineNotification(notificationId) {
    return request(`/notifications/${notificationId}/decline`, { method: 'POST' });
}
