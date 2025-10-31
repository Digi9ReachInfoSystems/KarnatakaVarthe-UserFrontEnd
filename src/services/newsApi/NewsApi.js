import apiClient from "../apiClient";

export const getNews = async () => {
  try {
    const response = await apiClient.get("/api/news");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsByid = async (id) => {
  try {
    const response = await apiClient.get(`/api/news/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await apiClient.post("/api/news/addComment", commentData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const likeNews = async (commentData) => {
  try {
    const response = await apiClient.post("/api/comments/like", commentData);
    return response.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err;
  }
};

export const trackClick = async (newsData) => {
  try {
    const response = await apiClient.post("/api/users/track-news-click", newsData);
    return response.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    throw err;
  }
};

export const getRecommendedNews = async (userId) => {
  try {
    const response = await apiClient.get(`/api/users/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getLatestNews = async () => {
  try {
    const response = await apiClient.get("/api/news/latest");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getNewsByTypeState = async () => {
  try{
    const response = await apiClient.get("api/news/getNewsByNewsType/statenews");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getNewsByTypeDistrict = async () => {
  try{
    const response = await apiClient.get("api/news/getNewsByNewsType/districtnews");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getNewsByTypeSpecialnews = async () => {
  try{
    const response = await apiClient.get("api/news/getNewsByNewsType/specialnews");
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get articles by type news
export const getNewsByTypeArticles = async () => {
  try {
    const response = await apiClient.get("api/news/getNewsByNewsType/articles");
    return response.data;
  } catch (error) {
    throw error;
  }
};
