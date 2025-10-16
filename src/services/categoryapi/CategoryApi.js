import apiClient from "../apiClient";

export const CategoryApi = async () => {
  try {
    const response = await apiClient.get("/api/category");
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const NewsApi = async (categoryId = null) => {
  try {
    const endpoint = categoryId ? `/api/news/categories/${categoryId}` : "/api/news";
    const response = await apiClient.get(endpoint);
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// video api 

export const VideoApi = async (videoId = null) => {
  try {
    const endpoint = videoId ? `/api/video/${videoId}` : "/api/video";
    const response = await apiClient.get(endpoint);
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (err) {
    throw err;
  }
};

// banner api 

export const BannerApi = async () => {
  try {
    const response = await apiClient.get("/api/banner/");
    if (!response || !response.data) {
      throw new Error("No data received from API");
    }
    return response.data;
  } catch (err) {
    throw err;
  }
};

// comment api

export const addComment = async (commentData) => {
  try {
    const response = await apiClient.post("/api/news/addComment", commentData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const likeComment = async (commentId) => {
  try {
    const response = await apiClient.post("/api/comments/like", { commentId });
    return response.data;
  } catch (err) {
    throw err;
  }
};