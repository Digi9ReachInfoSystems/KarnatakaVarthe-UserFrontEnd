import apiClient from "../apiClient";

/**
 * @typedef {"statenews" | "districtnews" | "specialnews" | "articles" | "combinedlatestnews"} NewsType
 * @typedef {"magazine" | "magazine2"} MagazineType
 *
 * @typedef {Object} PaginationMeta
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} totalRecords
 * @property {number} limit
 * @property {boolean} hasNextPage
 * @property {boolean} hasPreviousPage
 *
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success
 * @property {Array} data
 * @property {PaginationMeta} pagination
 *
 * @typedef {Object} PaginationOptions
 * @property {boolean} [homepage] - true => latest 10 items for homepage sections
 * @property {number} [page] - page number (default 1)
 * @property {number} [limit] - min 1, max 50 (default 20 when homepage is false)
 * @property {MagazineType} [magazineType] - news endpoints only
 */

/**
 * @param {PaginationOptions} [opts]
 * @returns {string}
 */
const buildQueryString = (opts = {}) => {
  const params = new URLSearchParams();

  if (opts.homepage) {
    params.set("homepage", "true");
  }

  if (opts.page !== undefined && opts.page !== null) {
    params.set("page", String(opts.page));
  }

  if (opts.limit !== undefined && opts.limit !== null) {
    const limit = Math.min(50, Math.max(1, Number(opts.limit)));
    params.set("limit", String(limit));
  }

  if (opts.magazineType) {
    params.set("magazineType", opts.magazineType);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
};

/**
 * @param {import("axios").AxiosResponse} response
 * @returns {PaginatedResponse}
 */
const parsePaginatedResponse = (response) => {
  const json = response.data;

  if (response.status >= 400 || json?.success === false) {
    throw new Error(json?.message || "Request failed");
  }

  return json;
};

// ==================================================
// API 1 — NEWS BY TYPE
// GET /api/news-new/getNewsByNewsType/:newsType
// ==================================================

/**
 * @param {NewsType} newsType
 * @param {PaginationOptions} [opts]
 * @returns {Promise<PaginatedResponse>}
 */
export const fetchNewsByType = async (newsType, opts = {}) => {
  try {
    const query = buildQueryString(opts);
    const response = await apiClient.get(
      `/api/news-new/getNewsByNewsType/${newsType}${query}`
    );
    return parsePaginatedResponse(response);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch news";
    console.error(`fetchNewsByType(${newsType}) error:`, message);
    throw new Error(message);
  }
};

// ==================================================
// API 2 — COMBINED LATEST NEWS (STATE + SPECIAL)
// GET /api/news-new/getLatestCombinedNews
// ==================================================

/**
 * @param {PaginationOptions} [opts]
 * @returns {Promise<PaginatedResponse>}
 */
export const fetchCombinedNews = async (opts = {}) => {
  try {
    const query = buildQueryString(opts);
    const response = await apiClient.get(
      `/api/news-new/getLatestCombinedNews${query}`
    );
    return parsePaginatedResponse(response);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch combined news";
    console.error("fetchCombinedNews error:", message);
    throw new Error(message);
  }
};

// ==================================================
// API 3 — SHORT VIDEOS
// GET /api/video-new
// ==================================================

/**
 * @param {Omit<PaginationOptions, "magazineType">} [opts]
 * @returns {Promise<PaginatedResponse>}
 */
export const fetchShortVideos = async (opts = {}) => {
  try {
    const query = buildQueryString(opts);
    const response = await apiClient.get(`/api/video-new${query}`);
    return parsePaginatedResponse(response);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch short videos";
    console.error("fetchShortVideos error:", message);
    throw new Error(message);
  }
};

// ==================================================
// API 4 — LONG VIDEOS
// GET /api/longVideo-new
// ==================================================

/**
 * @param {Omit<PaginationOptions, "magazineType">} [opts]
 * @returns {Promise<PaginatedResponse>}
 */
export const fetchLongVideos = async (opts = {}) => {
  try {
    const query = buildQueryString(opts);
    const response = await apiClient.get(`/api/longVideo-new${query}`);
    return parsePaginatedResponse(response);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch long videos";
    console.error("fetchLongVideos error:", message);
    throw new Error(message);
  }
};

// ==================================================
// HOMEPAGE HELPERS (homepage=true => 10 items)
// ==================================================

/** @param {MagazineType} [magazineType] */
export const fetchHomepageDistrictNews = (magazineType) =>
  fetchNewsByType("districtnews", { homepage: true, magazineType });

/** @param {MagazineType} [magazineType] */
export const fetchHomepageStateNews = (magazineType) =>
  fetchNewsByType("statenews", { homepage: true, magazineType });

/** @param {MagazineType} [magazineType] */
export const fetchHomepageSpecialNews = (magazineType) =>
  fetchNewsByType("specialnews", { homepage: true, magazineType });

/** @param {MagazineType} [magazineType] */
export const fetchHomepageArticles = (magazineType) =>
  fetchNewsByType("articles", { homepage: true, magazineType });

/** @param {MagazineType} [magazineType] */
export const fetchHomepageCombinedLatestNews = (magazineType) =>
  fetchNewsByType("combinedlatestnews", { homepage: true, magazineType });

/** @param {MagazineType} [magazineType] */
export const fetchHomepageCombinedNews = (magazineType) =>
  fetchHomepageCombinedLatestNews(magazineType);

export const fetchHomepageShortVideos = () =>
  fetchShortVideos({ homepage: true });

export const fetchHomepageLongVideos = () =>
  fetchLongVideos({ homepage: true });

// ==================================================
// LIST PAGE HELPERS (pagination / load more)
// Use pagination.hasNextPage for Load More button
// ==================================================

/**
 * @param {number} [page]
 * @param {MagazineType} [magazineType]
 */
export const fetchDistrictNewsPage = (page = 1, magazineType) =>
  fetchNewsByType("districtnews", { page, magazineType });

/**
 * @param {number} [page]
 * @param {MagazineType} [magazineType]
 */
export const fetchStateNewsPage = (page = 1, magazineType) =>
  fetchNewsByType("statenews", { page, magazineType });

/**
 * @param {number} [page]
 * @param {MagazineType} [magazineType]
 */
export const fetchSpecialNewsPage = (page = 1, magazineType) =>
  fetchNewsByType("specialnews", { page, magazineType });

/**
 * @param {number} [page]
 * @param {MagazineType} [magazineType]
 */
export const fetchArticlesPage = (page = 1, magazineType) =>
  fetchNewsByType("articles", { page, magazineType });

/**
 * @param {number} [page]
 * @param {MagazineType} [magazineType]
 */
export const fetchCombinedLatestNewsPage = (page = 1, magazineType) =>
  fetchNewsByType("combinedlatestnews", { page, magazineType });

/**
 * @param {number} [page]
 * @param {MagazineType} [magazineType]
 */
export const fetchCombinedNewsPage = (page = 1, magazineType) =>
  fetchCombinedLatestNewsPage(page, magazineType);

/**
 * @param {number} [page]
 * @param {number} [limit]
 */
export const fetchShortVideosPage = (page = 1, limit) =>
  fetchShortVideos({ page, limit });

/**
 * @param {number} [page]
 * @param {number} [limit]
 */
export const fetchLongVideosPage = (page = 1, limit) =>
  fetchLongVideos({ page, limit });

export default {
  fetchNewsByType,
  fetchCombinedNews,
  fetchShortVideos,
  fetchLongVideos,
  fetchHomepageDistrictNews,
  fetchHomepageStateNews,
  fetchHomepageSpecialNews,
  fetchHomepageArticles,
  fetchHomepageCombinedLatestNews,
  fetchHomepageCombinedNews,
  fetchHomepageShortVideos,
  fetchHomepageLongVideos,
  fetchDistrictNewsPage,
  fetchStateNewsPage,
  fetchSpecialNewsPage,
  fetchArticlesPage,
  fetchCombinedLatestNewsPage,
  fetchCombinedNewsPage,
  fetchShortVideosPage,
  fetchLongVideosPage,
};
