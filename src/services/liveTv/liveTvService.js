import apiClient from "../apiClient";

/**
 * Public Live TV status from admin-configured stream.
 * GET /api/live-tv
 *
 * @returns {Promise<{ success: boolean, data: {
 *   title: string,
 *   isOnline: boolean,
 *   youtubeVideoId: string,
 *   playbackUrl: string,
 *   thumbnail: string,
 *   embedUrl: string|null,
 *   updatedAt?: string|null
 * }|null }>}
 */
export const fetchLiveTv = async () => {
  try {
    const response = await apiClient.get("/api/live-tv");
    const payload = response?.data;
    return {
      success: Boolean(payload?.success),
      data: payload?.data || null,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch Live TV";
    console.error("fetchLiveTv error:", message);
    throw new Error(message);
  }
};

export default { fetchLiveTv };
