import { API_URL } from './config';


export async function register(username, email, password) {
    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        }
    );

    if (!response.ok) {
        let errorMessage = "Registration failed";

        try {
            const error = await response.json();
            errorMessage = error.detail || error.message || errorMessage;
        } catch {
            // Ignore JSON parse failures and keep the default message.
        }

        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function login(usernameOrEmail, password) {

    const formData = new URLSearchParams();

    formData.append("username", usernameOrEmail);
    formData.append("password", password);

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },

            body: formData,
        }
    );
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
    }

    const data = await response.json();
    
    // Store token in localStorage
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("token_type", data.token_type);
    
    return data;
}

export function getToken() {
    return localStorage.getItem("access_token");
}

export function getUsername() {
    const token = getToken();
    if (!token) return "User";

    try {
        const payload = JSON.parse(window.atob(token.split(".")[1]));
        return payload.sub || "User";
    } catch {
        return "User";
    }
}

export function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
}

export function isAuthenticated() {
    return !!localStorage.getItem("access_token");
}


