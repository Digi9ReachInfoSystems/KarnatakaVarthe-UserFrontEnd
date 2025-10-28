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

export const checkuserExists = async (data) => {
  try {
    // data should be an object with either { phone_Number: "..." } or { email: "..." }
    const response = await apiClient.post("/api/auth/checkuser-exists", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const UserSignupWithPhoneApi = async (phoneData) => {
  try {
    const response = await apiClient.post("/api/auth/signup", phoneData);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const LoginUsingPhoneApi = async (firebaseUid) => {
  try {
    const response = await apiClient.get(`/api/auth/getuserbyfirebaseuid/${firebaseUid}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/api/users/users/${userId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};