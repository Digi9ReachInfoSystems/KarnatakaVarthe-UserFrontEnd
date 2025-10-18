import apiClient from "../apiClient";
import axios from "axios";

export const SearchMagazineApi = async (query) => {
  try {
    const response = await apiClient.get(`/api/search/searchContent?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
// api to get the context  of the magizne
export const getMagazineContext = async (query) => {
  try {
    // This endpoint uses a different URL structure, so use direct axios call
    const response = await axios.post(`https://diprkarnataka.duckdns.org/api/search/query`, { query });
    return response.data;
  } catch (err) {
    console.error('API Error in getMagazineContext:', err);
    throw err;
  }
}