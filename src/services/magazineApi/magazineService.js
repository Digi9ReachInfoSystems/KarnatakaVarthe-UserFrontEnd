import apiClient from "../apiClient";

export const getMagazines = async () => {
  try {
    const response = await apiClient.get("/api/magazine");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const MarchMagazines = async () => {
  try {
    const response = await apiClient.get("/api/magazine2");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get magazine by id
export const getMagazineById = async (id) => {
  try {
    const response = await apiClient.get(`/api/magazine/getMagazineById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get magazine2 by id
export const getMagazine2ById = async (id) => {
  try {
    const response = await apiClient.get(`/api/magazine2/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
