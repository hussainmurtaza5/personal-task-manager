import { getToken } from './authService';

const API_URL = 'http://localhost:8000';

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
        let message = 'Task request failed';
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

export function getPersonalTasks() {
    return request('/tasks/personal');
}

export function createPersonalTask({ title, description = null, status = 'pending', priority = 0, dueDate = null }) {
    return request('/tasks/create', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            status,
            priority: Number(priority),
            due_date: dueDate,
        }),
    });
}

export function getWorkspaceTasks(workspaceId) {
    return request(`/tasks/workspace/${workspaceId}`);
}

export function createWorkspaceTask(workspaceId, { title, description = null, status = 'pending', priority = 0, dueDate = null }) {
    return request(`/tasks/workspace/${workspaceId}/create`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            status,
            priority: Number(priority),
            due_date: dueDate,
        }),
    });
}
