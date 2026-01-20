import axios from "axios";

// Base URL for the API - use DuckDNS URL directly
const BASE_URL = "https://diprkarnataka.duckdns.org";

/**
 * Get Special News with date filter
 * @param {string} date - Optional date filter (format: YYYY-MM-DD)
 * @returns {Promise} - API response with news data
 */
export const getSpecialNews = async (date = null) => {
  try {
    let url = `${BASE_URL}/api/news/getNewsByNewsType/specialnews`;
    if (date) {
      url += `?date=${date}`;
    }
    console.log('🌐 API Call - getSpecialNews URL:', url);
    const response = await axios.get(url);
    console.log('✅ API Response - getSpecialNews:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error - getSpecialNews:", error);
    throw error;
  }
};

/**
 * Get District News with date filter
 * @param {string} date - Optional date filter (format: YYYY-MM-DD)
 * @returns {Promise} - API response with news data
 */
export const getDistrictNews = async (date = null) => {
  try {
    let url = `${BASE_URL}/api/news/getNewsByNewsType/districtnews`;
    if (date) {
      url += `?date=${date}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching district news:", error);
    throw error;
  }
};

/**
 * Get State News with date filter
 * @param {string} date - Optional date filter (format: YYYY-MM-DD)
 * @returns {Promise} - API response with news data
 */
export const getStateNews = async (date = null) => {
  try {
    let url = `${BASE_URL}/api/news/getNewsByNewsType/statenews`;
    if (date) {
      url += `?date=${date}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching state news:", error);
    throw error;
  }
};

/**
 * Get Articles with date filter
 * @param {string} date - Optional date filter (format: YYYY-MM-DD)
 * @returns {Promise} - API response with news data
 */
export const getArticles = async (date = null) => {
  try {
    let url = `${BASE_URL}/api/news/getNewsByNewsType/articles`;
    if (date) {
      url += `?date=${date}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

/**
 * Get All News (across all types) with date filter
 * @param {string} date - Optional date filter (format: YYYY-MM-DD)
 * @returns {Promise} - API response with news data
 */
export const getAllNews = async (date = null) => {
  try {
    let url = `${BASE_URL}/api/`;
    if (date) {
      url += `?date=${date}`;
    }
    console.log('🌐 API Call - getAllNews URL:', url);
    const response = await axios.get(url);
    console.log('✅ API Response - getAllNews:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API Error - getAllNews:", error);
    throw error;
  }
};

/**
 * Get News by Type - Generic function
 * @param {string} newsType - Type of news (specialnews, districtnews, statenews, articles)
 * @param {string} date - Optional date filter (format: YYYY-MM-DD)
 * @returns {Promise} - API response with news data
 */
export const getNewsByType = async (newsType, date = null) => {
  try {
    let url = `${BASE_URL}/api/news/getNewsByNewsType/${newsType}`;
    if (date) {
      url += `?date=${date}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${newsType}:`, error);
    throw error;
  }
};

/**
 * Get News by ID
 * @param {string} id - News ID
 * @returns {Promise} - API response with news data
 */
export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news by id:", error);
    throw error;
  }
};

/**
 * Add comment to news
 * @param {Object} commentData - Comment data
 * @returns {Promise} - API response
 */
export const addComment = async (commentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/news/addComment`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

/**
 * Like news article
 * @param {Object} likeData - Like data
 * @returns {Promise} - API response
 */
export const likeNews = async (likeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/comments/like`, likeData);
    return response.data;
  } catch (error) {
    console.error("Error liking news:", error);
    throw error;
  }
};

/**
 * Track news click
 * @param {Object} newsData - News data for tracking
 * @returns {Promise} - API response
 */
export const trackNewsClick = async (newsData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/track-news-click`, newsData);
    return response.data;
  } catch (error) {
    console.error("Error tracking news click:", error);
    throw error;
  }
};

/**
 * Get recommended news for user
 * @param {string} userId - User ID
 * @returns {Promise} - API response with recommended news
 */
export const getRecommendedNews = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended news:", error);
    throw error;
  }
};

// Export all functions as default object
export default {
  getSpecialNews,
  getDistrictNews,
  getStateNews,
  getArticles,
  getAllNews,
  getNewsByType,
  getNewsById,
  addComment,
  likeNews,
  trackNewsClick,
  getRecommendedNews
};
