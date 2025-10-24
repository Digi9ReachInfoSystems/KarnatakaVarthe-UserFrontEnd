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

export const checkuserExists = async (phone_Number) => {
  try {
    const response = await apiClient.post("/api/auth/checkuser-exists", { phone_Number });
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