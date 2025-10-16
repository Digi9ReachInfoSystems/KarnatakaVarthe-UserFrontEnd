import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import {
  ExclusiveAllNewsContainer,
  ExclusiveAllNewsTabsContainer,
  ExclusiveAllNewsTab,
  ExclusiveAllNewsNewsCard,
  ExclusiveAllNewsNewsImage,
  ExclusiveAllNewsNewsContent,
  ExclusiveAllNewsNewsHeader,
  ExclusiveAllNewsNewsTitle,
  ExclusiveAllNewsNewsText,
  ExclusiveAllNewsShareIcons,
  ExclusiveAllNewsReadMore,
  ExclusiveAllNewsTrendingTag,
  ExclusiveAllNewsNewsMeta,
  ExclusiveAllNewsTitle,
} from "../exclusiveallnews/ExclusiveAllNews.styles";
import {
  CategoryApi,
  NewsApi,
} from "../../../../services/categoryapi/CategoryApi";
import AddComments from "../../comments/AddComments";
import { getVideos } from "../../../../services/videoApi/videoApi";

const ExclusiveAllNews = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryApi();
        if (
          response?.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setCategories(response.data);
        } else {
          console.warn("Empty category API response.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await NewsApi(activeTab);
        if (
          response?.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          console.log("Received news data:", response.data);
          setNewsData(response.data);
        } else {
          console.warn("Empty news API response.");
          setNewsData([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData([]);
      }
    };

    fetchNews();
  }, [activeTab]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        if (response.success && Array.isArray(response.data)) {
          setVideosData(response.data);
        } else {
          console.warn("No video data found.");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const shareOnFacebook = (url) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnTwitter = (url) => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const handleVideoHover = (videoId, isHovered) => {
    const videoElement = document.getElementById(videoId);
    if (isHovered) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return <div>rajat</div>;
};

export default ExclusiveAllNews;
