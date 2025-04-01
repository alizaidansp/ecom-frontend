

import { api } from './api';
import { saveToken, clearToken } from './store';

/**
 * User Registration
 
 * @returns {Promise<any>} - A promise resolving to the API response
 */


/**
 * Fetch User Details
 * @returns {Promise<any>} - A promise resolving to the user's data
 */

export async function get_user() {
	// return api.get('/me');
	const response = await api.get('/user/get-user');
	console.log('API Response:', response); // Log the response
	return response; //
}