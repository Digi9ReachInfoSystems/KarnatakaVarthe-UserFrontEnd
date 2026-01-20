import apiClient from "../apiClient";

export const getNews = async (dateFilter = null) => {
  try {
    let url = "/api/news";
    if (dateFilter) {
      const params = new URLSearchParams();
      if (dateFilter.date) params.append('date', dateFilter.date);
      if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
      if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
      if (params.toString()) url += `?${params.toString()}`;
    }
    const response = await apiClient.get(url);
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


export const getLatestNews = async (dateFilter = null) => {
  try {
    let url = "/api/news/latest";
    if (dateFilter) {
      const params = new URLSearchParams();
      if (dateFilter.date) params.append('date', dateFilter.date);
      if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
      if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
      if (params.toString()) url += `?${params.toString()}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getNewsByTypeState = async (dateFilter = null) => {
  try{
    let url = "api/news/getNewsByNewsType/statenews";
    if (dateFilter) {
      const params = new URLSearchParams();
      if (dateFilter.date) params.append('date', dateFilter.date);
      if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
      if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
      if (params.toString()) url += `?${params.toString()}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getNewsByTypeDistrict = async (dateFilter = null) => {
  try{
    let url = "api/news/getNewsByNewsType/districtnews";
    if (dateFilter) {
      const params = new URLSearchParams();
      if (dateFilter.date) params.append('date', dateFilter.date);
      if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
      if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
      if (params.toString()) url += `?${params.toString()}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getNewsByTypeSpecialnews = async (dateFilter = null) => {
  try{
    let url = "api/news/getNewsByNewsType/specialnews";
    if (dateFilter) {
      const params = new URLSearchParams();
      if (dateFilter.date) params.append('date', dateFilter.date);
      if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
      if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
      if (params.toString()) url += `?${params.toString()}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//get articles by type news
export const getNewsByTypeArticles = async (dateFilter = null) => {
  try {
    let url = "api/news/getNewsByNewsType/articles";
    if (dateFilter) {
      const params = new URLSearchParams();
      if (dateFilter.date) params.append('date', dateFilter.date);
      if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
      if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
      if (params.toString()) url += `?${params.toString()}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
