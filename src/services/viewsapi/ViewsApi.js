import apiClient from "../apiClient";

export const RegisterVisitorApi = async () => {
  try {
    // Prepare the request body
    const bodyData = {
      totalVisits: 1,
      time: "2025-03-05T10:00:00Z", 
    };
    // Make the POST request
    const response = await apiClient.post("/visitors/register", bodyData);
    return response.data;
  } catch (err) {
    throw err; 
  }
};

export const GetTotalVisitorApi = async () => {
  try {
    // Construct the URL with query parameters
    const response = await apiClient.get("/visitors/total", {
      params: {
        totalVisits: 1,
        time: "2025-03-05T10:00:00Z"
      }
    });
    
    return response.data;
  } catch (err) {
    throw err; 
  }
};
