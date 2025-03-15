/**
 * Utility functions for API operations
 */

import { checkApiHealth } from '../services/Api';

/**
 * Checks if the API server is available
 * @returns {Promise<boolean>} True if server is available, false otherwise
 */
export const isApiServerAvailable = async () => {
  try {
    await checkApiHealth();
    return true;
  } catch (error) {
    console.error('API server unavailable:', error);
    return false;
  }
};

/**
 * Formats error messages from API responses
 * @param {Error} error - The error object from API call
 * @returns {string} Formatted error message
 */
export const formatApiError = (error) => {
  if (!error) return 'Unknown error occurred';
  
  if (error.response) {
    // The server responded with a status code outside of 2xx range
    const { status, data } = error.response;
    
    if (status === 401) return 'You are not authorized to perform this action';
    if (status === 403) return 'You do not have permission to access this resource';
    if (status === 404) return 'The requested resource was not found';
    if (status === 500) return 'Internal server error. Please try again later';
    
    // Use error message from the server if available
    if (data && data.message) return data.message;
    
    return `Server error: ${status}`;
  } 
  
  if (error.request) {
    // The request was made but no response was received
    return 'Unable to connect to the server. Please check your internet connection';
  }
  
  // Something happened in setting up the request
  return error.message || 'An unexpected error occurred';
};

/**
 * Helper to safely extract data from API responses
 * @param {Function} apiCall - The API call function to execute
 * @param {any} defaultValue - Default value to return on error
 * @returns {Promise<any>} The API response data or default value
 */
export const safeApiCall = async (apiCall, defaultValue = []) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error('API call failed:', formatApiError(error));
    return defaultValue;
  }
};
