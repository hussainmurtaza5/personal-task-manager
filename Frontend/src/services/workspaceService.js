import { getToken } from './authService';
import { API_URL } from './config';


async function request(path, options = {}) {
    const token = getToken();
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        let message = 'Workspace request failed';
        try {
            const error = await response.json();
            message = error.detail || error.message || message;
        } catch {
            // Keep the default message when the API does not return JSON.
        }
        throw new Error(message);
    }

    return response.json();
}

export function getWorkspaces() {
    return request('/workspaces/');
}

export function createWorkspace({ name, description = null }) {
    return request('/workspaces/create', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
    });
}

export function addMember(workspaceId, { usernameOrEmail }) {
    return request(`/workspaces/${workspaceId}/members`, {
        method: 'POST',
        body: JSON.stringify({ username_or_email: usernameOrEmail }),
    });
}
