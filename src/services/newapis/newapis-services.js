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
 * @property {string} [date] - YYYY-MM-DD date filter (news-new + districts-new)
 */

/**
 * @typedef {Object} NewsListPageOptions
 * @property {string} [date] - YYYY-MM-DD — filters publishedAt UTC day
 * @property {number} [limit] - default 20, max 50
 * @property {MagazineType} [magazineType]
 */

/**
 * @typedef {Object} DistrictsNewsOptions
 * @property {boolean} [homepage]
 * @property {number} [page]
 * @property {number} [limit]
 * @property {MagazineType} [magazineType]
 * @property {string} [date]
 * @property {string} [districtSlug]
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

  if (opts.date) {
    params.set("date", opts.date);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
};

/**
 * Normalize date filter to YYYY-MM-DD or null.
 * @param {string|null|undefined} date
 * @returns {string|null}
 */
export const normalizeDateFilter = (date) =>
  date && typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? date
    : null;

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
const buildListPageOpts = (page = 1, opts = {}) => ({
  page,
  limit: opts.limit ?? 20,
  date: normalizeDateFilter(opts.date) ?? undefined,
  magazineType: opts.magazineType,
});

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
// LIST PAGE HELPERS (pagination / load more / date filter)
// Use pagination.hasNextPage for Load More button
// date=YYYY-MM-DD filters publishedAt UTC day (reset page=1 on date change)
// ==================================================

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchDistrictNewsPage = (page = 1, opts = {}) =>
  fetchNewsByType("districtnews", buildListPageOpts(page, opts));

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchStateNewsPage = (page = 1, opts = {}) =>
  fetchNewsByType("statenews", buildListPageOpts(page, opts));

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchSpecialNewsPage = (page = 1, opts = {}) =>
  fetchNewsByType("specialnews", buildListPageOpts(page, opts));

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchArticlesPage = (page = 1, opts = {}) =>
  fetchNewsByType("articles", buildListPageOpts(page, opts));

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchCombinedLatestNewsPage = (page = 1, opts = {}) =>
  fetchNewsByType("combinedlatestnews", buildListPageOpts(page, opts));

/**
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchCombinedNewsPage = (page = 1, opts = {}) =>
  fetchCombinedLatestNewsPage(page, opts);

/**
 * Combined latest via getLatestCombinedNews route (supports date filter).
 * @param {number} [page]
 * @param {NewsListPageOptions} [opts]
 */
export const fetchCombinedNewsPageLegacy = (page = 1, opts = {}) =>
  fetchCombinedNews(buildListPageOpts(page, opts));

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

// ==================================================
// DISTRICTS-NEW APIs
// GET /api/districts-new/list
// GET /api/districts-new/news
// GET /api/districts-new/news/:districtSlug
// ==================================================

/**
 * @param {import("axios").AxiosResponse} response
 */
const parseDistrictsResponse = (response) => {
  const json = response.data;

  if (response.status >= 400 || json?.success === false) {
    throw new Error(json?.message || "Request failed");
  }

  return json;
};

/**
 * @returns {Promise<Array<{ _id: string, name: string, slug: string, english: string, hindi: string, kannada: string, code: string }>>}
 */
export const fetchDistrictsList = async () => {
  try {
    const response = await apiClient.get("/api/districts-new/list");
    const json = parseDistrictsResponse(response);
    const districts = json?.data?.districts || [];

    return districts.map((district) => ({
      _id: district._id?.$oid || district._id,
      name: district.district_name,
      slug: district.district_slug,
      english: district.english || district.district_name,
      hindi: district.hindi || district.district_name,
      kannada: district.kannada || district.district_name,
      code: district.district_code,
    }));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch districts list";
    console.error("fetchDistrictsList error:", message);
    throw new Error(message);
  }
};

/**
 * @param {DistrictsNewsOptions} [opts]
 * @returns {Promise<{ success: boolean, district: object|null, data: { news: Array, total: number, page: number, page_size: number }, pagination: PaginationMeta }>}
 */
export const fetchDistrictsNews = async (opts = {}) => {
  try {
    const { districtSlug, ...queryOpts } = opts;
    const query = buildQueryString(queryOpts);
    const path = districtSlug
      ? `/api/districts-new/news/${encodeURIComponent(districtSlug)}`
      : "/api/districts-new/news";

    const response = await apiClient.get(`${path}${query}`);
    return parseDistrictsResponse(response);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch district news";
    console.error("fetchDistrictsNews error:", message);
    throw new Error(message);
  }
};

/**
 * @param {number} [page]
 * @param {{ date?: string, limit?: number, magazineType?: MagazineType }} [opts]
 */
export const fetchAllDistrictsNewsPage = (page = 1, opts = {}) =>
  fetchDistrictsNews({
    page,
    limit: opts.limit ?? 20,
    date: normalizeDateFilter(opts.date) ?? undefined,
    magazineType: opts.magazineType,
  });

/**
 * @param {string} districtSlug
 * @param {number} [page]
 * @param {{ date?: string, limit?: number, magazineType?: MagazineType }} [opts]
 */
export const fetchDistrictNewsBySlug = (districtSlug, page = 1, opts = {}) =>
  fetchDistrictsNews({
    districtSlug,
    page,
    limit: opts.limit ?? 20,
    date: normalizeDateFilter(opts.date) ?? undefined,
    magazineType: opts.magazineType,
  });

export const fetchHomepageAllDistrictsNews = (opts = {}) =>
  fetchDistrictsNews({ homepage: true, ...opts });

export default {
  fetchNewsByType,
  fetchCombinedNews,
  fetchShortVideos,
  fetchLongVideos,
  normalizeDateFilter,
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
  fetchCombinedNewsPageLegacy,
  fetchShortVideosPage,
  fetchLongVideosPage,
  fetchDistrictsList,
  fetchDistrictsNews,
  fetchAllDistrictsNewsPage,
  fetchDistrictNewsBySlug,
  fetchHomepageAllDistrictsNews,
};
