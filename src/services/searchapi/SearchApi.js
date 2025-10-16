import apiClient from "../apiClient";

export const SearchMagazineApi = async (query) => {
  try {
    const response = await apiClient.get(`/api/search/searchContent?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}