import apiClient from "../apiClient";

export const PhotosApi = {
  getAllPhotos: async () => {
    try {
      const response = await apiClient.get("/api/photos/getAllPhotos");
      if (!response || !response.data) {
        throw new Error("No data received from photos API");
      }
      return response.data;
    } catch (err) {
      console.error("Error fetching photos:", err);
      throw err;
    }
  }
};