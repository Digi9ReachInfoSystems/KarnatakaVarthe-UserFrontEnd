import apiClient from "../apiClient";

/**
 * Latest non-Short YouTube videos via the backend cache.
 * GET /api/youtube/latest-videos?limit=5
 */
export const fetchYoutubeLatestVideos = async (limit = 5) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 5, 1), 50);
  try {
    const response = await apiClient.get(
      `/api/youtube/latest-videos?limit=${safeLimit}`
    );
    const payload = response?.data;
    return {
      success: Boolean(payload?.success),
      data: Array.isArray(payload?.data) ? payload.data : [],
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch YouTube videos";
    console.error("fetchYoutubeLatestVideos error:", message);
    throw new Error(message);
  }
};

export default { fetchYoutubeLatestVideos };
