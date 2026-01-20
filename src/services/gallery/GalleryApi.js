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
      // Build query string with date parameter only
      let url = `https://diprkarnataka.duckdns.org/api/districts/news/${districtSlug}`;
      if (dateFilter && dateFilter.date) {
        url += `?date=${dateFilter.date}`;
      }
      
      // Use axios directly with full URL - same pattern as LatestNotification.js
      const response = await axios.get(url);
      
      if (!response || !response.data) {
        throw new Error("No data received from district news API");
      }
      
      // API response structure: { success: true, district: {...}, data: { news: [...], total, page, page_size } }
      const district = response.data?.district || {};
      let news = response.data?.data?.news || [];
      
      console.log('🔍 GalleryApi - Raw API response:', { 
        districtSlug, 
        dateFilter, 
        originalNewsCount: news.length,
        apiTotal: response.data?.data?.total 
      });
      
      // 🔥 CLIENT-SIDE DATE FILTER - Filter by publishedAt date
      if (dateFilter && dateFilter.date) {
        const filterDate = dateFilter.date; // e.g., "2025-11-10"
        
        if (news.length === 0) {
          console.warn(`⚠️  No news returned from API for date: ${filterDate}`);
        } else {
          console.log(`🔍 Starting date filter for: ${filterDate}`);
          console.log(`📊 Original news count: ${news.length}`);
          
          // Filter news to keep ONLY items where publishedAt date matches filterDate
          const filteredNews = news.filter((item, idx) => {
            // Extract publishedAt from MongoDB date format or ISO string
            const publishedDate = item.publishedAt?.$date || item.publishedAt;
            if (!publishedDate) {
              console.log(`⚠️  Item ${idx}: No publishedAt found`);
              return false;
            }
            
            // Convert to date string (YYYY-MM-DD) in UTC timezone
            const publishedDateStr = new Date(publishedDate).toISOString().split('T')[0];
            
            if (idx < 3) { // Log first 3 items for debugging
              console.log(`📰 Item ${idx}: publishedAt = ${publishedDateStr} | Match = ${publishedDateStr === filterDate}`);
            }
            
            // Compare: only keep if dates match exactly
            return publishedDateStr === filterDate;
          });
          
          // Log for debugging
          console.log(`✅ Date filter complete: ${filterDate} | Original: ${news.length} items → Filtered: ${filteredNews.length} items`);
          
          if (filteredNews.length === 0) {
            console.warn(`⚠️  No news found matching date: ${filterDate}`);
          }
          
          // Replace news array with filtered results
          news = filteredNews;
        }
      }
      
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
      
      // Return both district info and filtered news array
      return {
        district: normalizedDistrict,
        news: news,
        total: news.length, // ✅ Use filtered news count
        page: response.data?.data?.page || 1,
        page_size: response.data?.data?.page_size || 20
      };
    } catch (err) {
      console.error("Error fetching district news:", err);
      throw err;
    }
  }
};