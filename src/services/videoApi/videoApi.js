import apiClient from "../apiClient";
import axios from "axios";

// Fetch all videos
export const getVideos = async () => {
  try {
    const response = await apiClient.get("/api/video");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all long videos
export const getLongVideos = async () => {
  try {
    const response = await apiClient.get("/api/longVideo");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all long videos from list endpoint (for videos page with filter)
export const getLongVideosList = async () => {
  try {
    // Use axios directly with full URL - same pattern as photo categories
    const response = await axios.get('https://varthe.digi9.co.in/api/longvideos/list');
    
    if (!response || !response.data) {
      throw new Error("No data received from long videos list API");
    }
    
    // API response structure: { success: true, data: { longvideos: [...] } }
    return response.data;
  } catch (error) {
    console.error("Error fetching long videos list:", error);
    throw error;
  }
};

// Like a long video
export const likeLongVideo = async (commentData) => {
  try {
    const response = await apiClient.post("/api/comments/likeLongVideo", commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a comment to a long video
export const LongVideoaddComment = async (commentData) => {
  try {
    const response = await apiClient.post("/api/longVideo/addComment", commentData);
    return response.data;
  } catch (error) {
    throw error;

  }
};

// videos by id
export const getVideoById = async (id) => {
  try {
    if (!id) throw new Error("Invalid video ID");
    
    const response = await apiClient.get(`/api/video/${id}`);
    if (response.status !== 200) throw new Error(`HTTP error! status: ${response.status}`);
    
    const result = response.data;
    
    // Handle cases where data is null or undefined
    if (!result || !result.video) {
      return { 
        success: false, 
        error: "Video data not found",
        data: null 
      };
    }
    
    return {
      success: true,
      data: {
        ...result.video,
        thumbnail: result.video.thumbnail || "/placeholder-video.png",
        video_url: result.video.video_url || "",
        total_Likes: result.video.total_Likes || 0,
        total_Views: result.video.total_Views || 0,
        Comments: result.video.Comments || [],
        channel: result.video.channel || {
          name: "Unknown Channel",
          profileImage: "/placeholder-channel.png",
          subscribers: 0
        },
        createdAt: result.video.createdAt || new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("Error fetching video:", error);
    return { 
      success: false, 
      error: error.message,
      data: null 
    };
  }
};

// short videos like
export const ShortlikeVideo = async (likeData) => {
  try {
    const response = await apiClient.post("/api/comments/likeVideo", likeData);
    return response.data;
  } catch (error) {
    console.error("Error liking video:", error);
    throw error;
  }
};

// short video add comment
export const ShortVideoaddComment = async (commentData) => {
  try {
    const response = await apiClient.post("/api/video/addComment", commentData);
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Fetch video categories
export const getVideoCategories = async () => {
  try {
    // Use axios directly with full URL - same pattern as photo categories
    const response = await axios.get('https://varthe.digi9.co.in/api/video-category/list');
    
    if (!response || !response.data) {
      throw new Error("No data received from video categories API");
    }
    
    // API response structure: { success: true, data: { video_categories: [...], ... } }
    const categories = response.data?.data?.video_categories || response.data?.video_categories || [];
    
    // Normalize the category data
    const normalizedCategories = categories.map(category => ({
      _id: category._id?.$oid || category._id,
      name: category.category_name || category.english,
      english: category.english,
      hindi: category.hindi,
      kannada: category.kannada,
      date_created: category.date_created?.$date || category.date_created
    }));
    
    return normalizedCategories;
  } catch (err) {
    console.error("Error fetching video categories:", err);
    throw err;
  }
};
