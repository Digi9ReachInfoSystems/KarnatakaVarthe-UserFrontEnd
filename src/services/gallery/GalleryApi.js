import apiClient from "../apiClient";
import axios from "axios";

export const PhotosApi = {
  getAllPhotos: async () => {
    try {
      const response = await apiClient.get("/api/photos/getAllPhotos");
      if (!response || !response.data) {
        throw new Error("No data received from photos API");
      }
      return response.data;
    } catch (err) {
      console.error("Error fetching photos:", err);
      throw err;
    }
  },
  getPhotosByCategory: async (categoryId) => {
    try {
      const endpoint = categoryId 
        ? `/api/photos/categories/${categoryId}` 
        : "/api/photos/getAllPhotos";
      const response = await apiClient.get(endpoint);
      if (!response || !response.data) {
        throw new Error("No data received from photos API");
      }
      return response.data;
    } catch (err) {
      console.error("Error fetching photos by category:", err);
      throw err;
    }
  },
  getPhotoCategories: async () => {
    try {
      // Use axios directly with full URL - same pattern as LatestNotification.js
      const response = await axios.get('https://diprkarnataka.duckdns.org/api/photo-category/list');
      
      if (!response || !response.data) {
        throw new Error("No data received from photo categories API");
      }
      
      // API response structure: { success: true, data: { photo_categories: [...], ... } }
      // So we need to access response.data.data.photo_categories
      const categories = response.data?.data?.photo_categories || response.data?.photo_categories || [];
      
      // Normalize the category data
      const normalizedCategories = categories.map(category => ({
        _id: category._id?.$oid || category._id,
        name: category.category_name || category.english,
        english: category.english,
        hindi: category.hindi,
        kannada: category.kannada,
        date_created: category.date_created?.$date || category.date_created
      }));
      
      return normalizedCategories;
    } catch (err) {
      console.error("Error fetching photo categories:", err);
      throw err;
    }
  },
  getDistricts: async () => {
    try {
      // Use axios directly with full URL - same pattern as LatestNotification.js
      const response = await axios.get('https://diprkarnataka.duckdns.org/api/districts/list');
      
      if (!response || !response.data) {
        throw new Error("No data received from districts API");
      }
      
      // API response structure: { success: true, data: { districts: [...], ... } }
      // So we need to access response.data.data.districts
      const districts = response.data?.data?.districts || response.data?.districts || [];
      
      // Normalize the district data
      const normalizedDistricts = districts.map(district => ({
        _id: district._id?.$oid || district._id,
        name: district.district_name,
        slug: district.district_slug,
        code: district.district_code,
        english: district.english || district.district_name,
        hindi: district.hindi || district.district_name,
        kannada: district.kannada || district.district_name,
        date_created: district.date_created?.$date || district.date_created
      }));
      
      return normalizedDistricts;
    } catch (err) {
      console.error("Error fetching districts:", err);
      throw err;
    }
  },
  getDistrictNews: async (districtSlug, dateFilter = null) => {
    try {
      // Build query string with date parameters
      let url = `https://diprkarnataka.duckdns.org/api/districts/news/${districtSlug}`;
      if (dateFilter) {
        const params = new URLSearchParams();
        if (dateFilter.date) params.append('date', dateFilter.date);
        if (dateFilter.start_date) params.append('start_date', dateFilter.start_date);
        if (dateFilter.end_date) params.append('end_date', dateFilter.end_date);
        if (params.toString()) url += `?${params.toString()}`;
      }
      
      // Use axios directly with full URL - same pattern as LatestNotification.js
      const response = await axios.get(url);
      
      if (!response || !response.data) {
        throw new Error("No data received from district news API");
      }
      
      // API response structure: { success: true, district: {...}, data: { news: [...], total, page, page_size } }
      const district = response.data?.district || {};
      const news = response.data?.data?.news || [];
      
      // Normalize district data
      const normalizedDistrict = {
        _id: district._id?.$oid || district._id,
        name: district.district_name,
        slug: district.district_slug,
        code: district.district_code,
        english: district.english || district.district_name,
        hindi: district.hindi || district.district_name,
        kannada: district.kannada || district.district_name,
      };
      
      // Return both district info and news array
      return {
        district: normalizedDistrict,
        news: news,
        total: response.data?.data?.total || 0,
        page: response.data?.data?.page || 1,
        page_size: response.data?.data?.page_size || 20
      };
    } catch (err) {
      console.error("Error fetching district news:", err);
      throw err;
    }
  }
};