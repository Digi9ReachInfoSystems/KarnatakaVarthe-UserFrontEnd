import apiClient from "../apiClient";

// Reading History API
export const logReadingHistory = async (historyData) => {
  try {
    const response = await apiClient.post("/api/reading-history", historyData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReadingHistory = async (userId) => {
  try {
    const response = await apiClient.get(`/api/reading-history/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Recommendations API
export const getRecommendations = async (userId) => {
  try {
    const response = await apiClient.get(`/api/recommendations/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};