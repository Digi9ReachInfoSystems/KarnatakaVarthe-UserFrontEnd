import apiClient from "../apiClient";

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

