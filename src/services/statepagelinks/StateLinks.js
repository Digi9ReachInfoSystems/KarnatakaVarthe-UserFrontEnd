import apiClient from "../apiClient";

export const getStateLinks = async () => {
    try {
        const response = await apiClient.get("/api/static/getAllStaticPage");
        return response.data;
    } catch (error) {
        throw error;
    }
}