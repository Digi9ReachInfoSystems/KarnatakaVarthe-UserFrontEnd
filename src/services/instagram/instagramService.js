import apiClient from "../apiClient";

/**
 * Latest Instagram media via the backend cache.
 * GET /api/instagram/media?limit=8
 *
 * @param {number} [limit=8]
 * @returns {Promise<{ success: boolean, data: Array<{ id: string, caption: string, mediaType: string, imageUrl: string, permalink: string, timestamp: string }> }>}
 */
export const fetchInstagramMedia = async (limit = 8) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 8, 1), 50);
  try {
    const response = await apiClient.get(
      `/api/instagram/media?limit=${safeLimit}`
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
      "Failed to fetch Instagram media";
    console.error("fetchInstagramMedia error:", message);
    throw new Error(message);
  }
};

/**
 * Latest Instagram Reels (VIDEO posts) via the backend cache.
 * GET /api/instagram/reels?limit=8
 *
 * @param {number} [limit=8]
 * @returns {Promise<{ success: boolean, data: Array<{ id: string, caption: string, mediaType: string, thumbnailUrl: string, videoUrl?: string, permalink: string, timestamp: string }> }>}
 */
export const fetchInstagramReels = async (limit = 8) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 8, 1), 50);
  try {
    const response = await apiClient.get(
      `/api/instagram/reels?limit=${safeLimit}`
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
      "Failed to fetch Instagram reels";
    console.error("fetchInstagramReels error:", message);
    throw new Error(message);
  }
};

export default { fetchInstagramMedia, fetchInstagramReels };
