import backend_url from "../config";

const login = async (email, password) => {
    try {
        const response = await fetch(`${backend_url}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
    }
}

const register = async (firstName, lastName, email, password) => {
    try {
        const response = await fetch(`${backend_url}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

export { login, register };