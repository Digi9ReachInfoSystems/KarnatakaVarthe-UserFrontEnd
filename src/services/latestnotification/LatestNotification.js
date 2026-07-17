import apiClient from "../apiClient";

export const getLatestNotification = async () => {
  try {
    const response = await apiClient.get(
      "/api/latestnotifications/getAlllatestNotification"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLatestService = async () => {
  try {
    const response = await apiClient.get("/api/newarticles/list");
    return response.data;
  } catch (err) {
    throw err;
  }
};
