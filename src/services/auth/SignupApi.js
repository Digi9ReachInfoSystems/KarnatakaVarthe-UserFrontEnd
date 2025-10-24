import apiClient from "../apiClient";

export const SignupApi = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/signup", userData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const SignupPageApi = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/signup", userData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const checkuserExists = async (phoneNumber) => {
  try {
    const response = await apiClient.post("/api/auth/checkuser-exists", { phoneNumber });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const UserSignupWithPhoneApi = async (phoneData) => {
  try {
    const response = await apiClient.post("/api/auth/signup-with-phone", phoneData);
    return response.data;
  } catch (err) {
    throw err;
  }
};
