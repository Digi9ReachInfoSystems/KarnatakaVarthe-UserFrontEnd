import apiClient from "../apiClient";
import axios from "axios";

export const getLatestNotification = async () => {
  try {
    const response = await apiClient.get("/api/latestnotifications/getAlllatestNotification");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLatestService = async () => {
  try{
    const response = await axios.get('https://diprkarnataka.duckdns.org/api/newarticles/list');
    return response.data;
  }
  catch(err){
    throw err;
  }
};