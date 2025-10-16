import React, { useState, useEffect, useContext, useRef } from "react";
import { 
  Container,
  Content,
  Title,
  VideoThumbnail,
  VideoCard,
  VideoDetails,
  NewsMeta,
  VideoMetacat,
  BookmarkIconWrapper,
  TabsContainer,
  Tab,
  PaginationWrapper,
  NoContent,
  TabIndicator,
  CategoryTabs,
  TrendingBadge,
  AuthorInfo,
  CardFooter,
  ScrollButton
} from "./LatestTab.styles";
import videoThumbnail from "../../../assets/v1.png";
import { NewsApi, CategoryApi } from "../../../services/categoryapi/CategoryApi";
import { CiBookmark } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FontSizeContext } from "../../../context/FontSizeProvider";
import { LanguageContext } from "../../../context/LanguageContext";
import { Pagination } from "@mui/material";

const LatestTab = () => {
  const [videosData, setVideosData] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem("bookmarkedVideos");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [activeTab, setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const { fontSize } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);

  // Responsive items per page
  const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width <= 480) return 4; // Mobile
    if (width <= 768) return 6; // Tablet
    return 8; 
  };
  
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarkedVideos", JSON.stringify([...bookmarkedVideos]));
  }, [bookmarkedVideos]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await CategoryApi();
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          setCategories(response.data);
          setActiveTab(response.data[0]._id);
        } else {
          console.warn("Empty category API response.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch news for active tab
  useEffect(() => {
    const fetchNews = async () => {
      if (activeTab === null) return;
      
      try {
        setLoading(true);
        const response = await NewsApi(activeTab);
        if (response?.data && Array.isArray(response.data)) {
          setVideosData(response.data);
        } else {
          console.warn("Empty news API response.");
          setVideosData([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setVideosData([]);
      } finally {
        setLoading(false);
        // Reset to page 1 when changing tabs
        setCurrentPage(1);
      }
    };

    fetchNews();
  }, [activeTab]);

  const handlePostClick = (postId) => {
    navigate(`/news/${postId}`);
  };

  const handleBookmarkClick = (videoId, event) => {
    event.stopPropagation();
    
    setBookmarkedVideos((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(videoId)) {
        newBookmarks.delete(videoId);
      } else {
        newBookmarks.add(videoId);
      }
      return newBookmarks;
    });
  };

  const getLocalizedContent = (video, field) => {
    if (!video) return "No content available";
    
    if (language === "English") {
      return video[field] || "No content available";
    } else if (language === "Hindi") {
      return video.hindi?.[field] || video[field] || "No content available";
    } else if (language === "Kannada") {
      return video.kannada?.[field] || video[field] || "No content available";
    }
    return video[field] || "No content available";
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videosData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of content when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab scrolling functions
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const container = tabsRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
  };

  const fontSizeStyle = fontSize !== 100 ? { fontSize: `${fontSize}%` } : {};

  return (
    <Container style={fontSizeStyle} role="region" aria-label="Latest news section">
      <CategoryTabs>
        <ScrollButton 
          direction="left" 
          onClick={() => scrollTabs('left')}
          disabled={scrollPosition <= 0}
          aria-label="Scroll tabs left"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollTabs('left')
            }
          }}
        >
          <FiChevronLeft aria-hidden="true" />
        </ScrollButton>
        
        <TabsContainer 
          ref={tabsRef} 
          style={fontSizeStyle}
          role="tablist"
          aria-label="News categories"
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <Tab
                key={category._id}
                active={activeTab === category._id}
                onClick={() => handleTabClick(category._id)}
                style={fontSizeStyle}
                role="tab"
                aria-selected={activeTab === category._id}
                tabIndex={activeTab === category._id ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTabClick(category._id)
                  }
                }}
              >
                {category.name}
                {activeTab === category._id && <TabIndicator />}
              </Tab>
            ))
          ) : (
            <Tab role="tab" aria-selected="false">No Categories Available</Tab>
          )}
        </TabsContainer>
        
        <ScrollButton 
          direction="right" 
          onClick={() => scrollTabs('right')}
          aria-label="Scroll tabs right"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollTabs('right')
            }
          }}
        >
          <FiChevronRight aria-hidden="true" />
        </ScrollButton>
      </CategoryTabs>

      <div role="tabpanel" aria-label="News content">
        {loading ? (
          <Content style={fontSizeStyle}>
            {[...Array(4)].map((_, index) => (
              <VideoCard key={`skeleton-${index}`} className="skeleton-card" aria-hidden="true">
                <div className="skeleton-image"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </VideoCard>
            ))}
          </Content>
        ) : (
          <Content style={fontSizeStyle} role="list" aria-label="News articles">
            {currentItems.length > 0 ? (
              currentItems.map((video) => (
                <VideoCard
                  key={video._id}
                  onClick={() => handlePostClick(video._id)}
                  role="listitem"
                  tabIndex="0"
                  aria-label={`Read article: ${getLocalizedContent(video, "title")}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handlePostClick(video._id)
                    }
                  }}
                >
                  <VideoThumbnail
                    src={video.newsImage || videoThumbnail}
                    alt={getLocalizedContent(video, "title")}
                    loading="lazy"
                  />
                  <VideoDetails>
                    <NewsMeta style={fontSizeStyle}>
                      {video.isTrending && <TrendingBadge>Trending</TrendingBadge>}
                      <AuthorInfo style={fontSizeStyle}>
                        {video.author || "Unknown Author"} • {" "}
                        {video.category?.name || "General"}
                      </AuthorInfo>
                    </NewsMeta>
                    <Title style={fontSizeStyle}>
                      {getLocalizedContent(video, "title")}
                    </Title>
                    <CardFooter>
                      <VideoMetacat style={fontSizeStyle}>
                        {video.category?.name}
                      </VideoMetacat>
                      <BookmarkIconWrapper
                        onClick={(e) => handleBookmarkClick(video._id, e)}
                        isBookmarked={bookmarkedVideos.has(video._id)}
                        aria-label={bookmarkedVideos.has(video._id) ? "Remove bookmark" : "Add bookmark"}
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleBookmarkClick(video._id, e)
                          }
                        }}
                      >
                        <CiBookmark size={20} aria-hidden="true" />
                      </BookmarkIconWrapper>
                    </CardFooter>
                  </VideoDetails>
                </VideoCard>
              ))
            ) : (
              <NoContent role="status" aria-live="polite">No posts available for this category.</NoContent>
            )}
          </Content>
        )}
      </div>

      {videosData.length > 0 && (
        <PaginationWrapper role="navigation" aria-label="News pagination">
          <Pagination
            count={Math.ceil(videosData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            size={window.innerWidth <= 768 ? "small" : "medium"}
            aria-label="News pages"
          />
        </PaginationWrapper>
      )}
    </Container>
  );
};

export default LatestTab;
