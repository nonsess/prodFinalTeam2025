import {BASE_URL} from "@/services/constants";

const API_URL = BASE_URL + "/api/v1"

export async function registerUser(user) {
    await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
}

export async function loginUser(credentials) {
    const urlEncoded = new URLSearchParams();
    urlEncoded.append('username', credentials.email);
    urlEncoded.append('password', credentials.password);

    const response = await fetch(`${API_URL}/auth/jwt/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncoded.toString()
    });

    if (!response.ok) {
        console.error('Login failed with status:', response.status);
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
}

export async function getUser(token) {
    const res = await fetch(`${API_URL}/users/me/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json();
}

export async function getUserById(id) {
    const res = await fetch(`${API_URL}/users/get_user/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}