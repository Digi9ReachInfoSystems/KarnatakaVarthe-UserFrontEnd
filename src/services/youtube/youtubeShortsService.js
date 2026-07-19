import apiClient from "../apiClient";

/**
 * YouTube channel Shorts via backend cache.
 * GET /api/youtube/shorts?limit=10
 *
 * @param {number} [limit=10]
 * @returns {Promise<{ success: boolean, data: Array<{ videoId: string, title: string, thumbnail: string, url: string, publishedAt: string }> }>}
 */
export const fetchYoutubeShorts = async (limit = 10) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
  try {
    const response = await apiClient.get(
      `/api/youtube/shorts?limit=${safeLimit}`
    );
    const payload = response?.data;
    const data = Array.isArray(payload?.data) ? payload.data : [];
    return {
      success: Boolean(payload?.success),
      data,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch YouTube shorts";
    console.error("fetchYoutubeShorts error:", message);
    throw new Error(message);
  }
};

export default { fetchYoutubeShorts };
