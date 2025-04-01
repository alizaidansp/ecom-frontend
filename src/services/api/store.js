const TOKEN_KEY = 'jwt_token';

/**
 * Save JWT token to localStorage
 * @param {string} token - The JWT token to save
 */
export function saveToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get JWT token from localStorage
 * @returns {string | null} - The stored token or null if not found
 */
export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token from localStorage
 */
export function clearToken() {
	localStorage.removeItem(TOKEN_KEY);
}

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
export function isAuthenticated() {
	return !!getToken();
}