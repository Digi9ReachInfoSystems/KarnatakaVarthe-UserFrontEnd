import apiClient from "../apiClient";

export const LoginApi = async (idToken) => {
  try {
    const response = await apiClient.post("/api/users/login-on-web", { idToken });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// start a session
export const startSession = async (userId, platform = "web") => {
  try {
    const response = await apiClient.post("/sessions/start", { userId, platform });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// end-sessions
export const endSession = async (userId, platform = "web") => {
  try {
    const response = await apiClient.post("/sessions/end", { userId, platform });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const LoginPageApi = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/login", userData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const  UpdateUserDetailsApi = async (firebaseId, data) => {
  try {
    const response = await apiClient.put(`/api/users/update-profile/${firebaseId}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
