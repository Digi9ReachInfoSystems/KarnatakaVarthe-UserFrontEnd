import apiClient from "../apiClient";


export const getCommentByuserIdNewsId = async (userId, newsId) => {
  try {
    const response = await apiClient.get(`/api/comments/userandnews/${userId}/${newsId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw error;
  }
};