import { api } from './api';
import { saveToken, clearToken } from './store';

/**
 * User Registration
 * @param {string} email - The user's email
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * @returns {Promise<any>} - A promise resolving to the API response
 */
export async function register( email, username, password) {
	return api.post('/register', { email, username,password });
}

// Fetch user details

/**
 * User Login
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<object>} - A promise resolving to the login response
 */
export async function login(email, password) {
	try {
		const response = await api.post('/login', { email, password });
		console.log(response); // Logs full response in the console

		// Alert the JSON stringified response
		alert(JSON.stringify(response.data, null, 2));

		if (response.access_token) {
			saveToken(response.access_token);
		}

		return response.data; // Contains access_token and user info
	} catch (error) {
		console.error("Login failed:", error);
		alert("Login failed: " + (error.response?.data?.message || error.message));
		return null;
	}
}



/**
 * User Logout - Clears the stored token
 */
export function logout() {
	clearToken();
}