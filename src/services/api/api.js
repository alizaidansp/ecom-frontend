import { getToken } from './store';
import { goto } from '$app/navigation';


// const BASE_URL = `${window.location.protocol}//${window.location.hostname}/api/v1`;

const BASE_URL ='http://localhost:8081/api/v1';

/**
 * Generic API Request Helper
 * @param {string} endpoint - API endpoint (e.g., '/login')
 * @param {object} [options={}] - Fetch options (e.g., method, body)
 * @returns {Promise<any>} - The JSON response
 */
async function request(endpoint, options = {}) {
	const token = getToken();

	const headers = {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {})
	};

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			...options,
			headers
		});

		if (response.status === 401) {
			// Redirect to the login page if unauthorized
			goto('/user/auth/login');
			return;
		}

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Something went wrong');
		}

		return response.json();
	} catch (error) {
		console.error('API Request Error:', error);
		throw error; // Re-throw for better error handling
	}
}

/**
 * API Object for HTTP Requests
 */
export const api = {
	/** @param {string} endpoint */
	get: (endpoint) => request(endpoint),

	/** @param {string} endpoint, @param {object} data */
	post: (endpoint, data) =>
		request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
};