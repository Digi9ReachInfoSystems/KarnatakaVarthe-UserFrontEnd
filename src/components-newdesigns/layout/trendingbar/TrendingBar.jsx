import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { NewsApi } from "../../../services/categoryapi/CategoryApi";
import {
  TrendingWrapper,
  TrendingContainer,
  TrendingLabel,
  TrendingContent,
  TrendingScroller,
  TrendingItem,
  Divider,
  ShimmerWrapper,
  ShimmerItem,
} from "./TrendingBar.styles";

const TrendingBar = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language, currentMagazineType } = useContext(LanguageContext);
  const location = useLocation();

  // Determine current page type based on URL
  const getCurrentPageType = () => {
    if (location.pathname === "/" || location.pathname === "/magazinesvartha" || location.pathname.includes("/varthamagazines")) {
      return "magazine"; // Vartha Janapada
    } else if (location.pathname === "/marchofkarnataka" || location.pathname === "/marchofkarnatakmagzine" || location.pathname.includes("/marchofkarnataka")) {
      return "magazine2"; // March of Karnataka
    }
    return null; // Other pages
  };

  const pageType = getCurrentPageType();

  // Store all news data to avoid refetching
  const [allNewsData, setAllNewsData] = useState([]);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  
  // Fetch news data only once when component mounts
  useEffect(() => {
    const fetchAllNews = async () => {
      if (!initialFetchDone) {
        setIsLoading(true);
        try {
          const data = await NewsApi();
          if (data?.data && Array.isArray(data.data)) {
            setAllNewsData(data.data);
          }
        } catch (error) {
          console.error("Error fetching news data:", error);
        } finally {
          setInitialFetchDone(true);
          setIsLoading(false);
        }
      }
    };
    
    fetchAllNews();
  }, [initialFetchDone]);
  
  // Process news data when pageType, language, or allNewsData changes
  useEffect(() => {
    if (allNewsData.length > 0) {
      // Filter news based on magazine type
      let filteredNews = allNewsData;
      
      // Filter ONLY by magazine type if on a specific magazine page
      if (pageType === "magazine") {
        // For Vartha Janapada pages - show all newsTypes
        filteredNews = allNewsData.filter(item => item.magazineType === "magazine");
      } else if (pageType === "magazine2") {
        // For March of Karnataka pages - show all newsTypes
        filteredNews = allNewsData.filter(item => item.magazineType === "magazine2");
      }
      
      // Sort by trending or popularity if available
      filteredNews.sort((a, b) => {
        // Sort by views count or trending score if available
        if (a.views && b.views) return b.views - a.views;
        if (a.trending && b.trending) return b.trending - a.trending;
        return 0;
      });
      
      // Get top 4 trending news items
      const topNews = filteredNews.slice(0, 4);
      
      // If we don't have enough news items, add some from the general pool
      if (topNews.length < 4) {
        const remainingCount = 4 - topNews.length;
        const generalNews = allNewsData
          .filter(item => !topNews.includes(item))
          .slice(0, remainingCount);
        topNews.push(...generalNews);
      }
      
      // Get localized content based on language
      const localizedHeadlines = topNews.map(article => getLocalizedContent(article, "title"));
      setTrendingNews(localizedHeadlines);
    } else if (initialFetchDone) {
      // Use empty array if no data
      setTrendingNews(getEmptyNews());
    }
  }, [pageType, language, allNewsData, initialFetchDone]);

  // Empty array for when no news is available
  const getEmptyNews = () => {
    return [];
  };

  // Get localized content based on language
  const getLocalizedContent = (article, field) => {
    if (!article) return "No content available";
    
    if (language === "English") {
      // First check if there's an English object with the field
      if (article.English && article.English[field]) {
        return article.English[field];
      }
      // Then check the direct field
      return article[field] || "No content available";
    } else if (language === "Hindi") {
      // First check if there's a Hindi object with the field
      if (article.hindi && article.hindi[field]) {
        return article.hindi[field];
      }
      // Then check direct field, then English fallback
      return article[field] || (article.English && article.English[field]) || "सामग्री उपलब्ध नहीं है";
    } else if (language === "Kannada") {
      // First check if there's a Kannada object with the field
      if (article.kannada && article.kannada[field]) {
        return article.kannada[field];
      }
      // Then check direct field, then English fallback
      return article[field] || (article.English && article.English[field]) || "ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ";
    }
    return article[field] || "No content available";
  };

  // Get translated "Trending" label
  const getTrendingLabel = () => {
    const translations = {
      English: "Trending",
      Kannada: "ಟ್ರೆಂಡಿಂಗ್",
      Hindi: "ट्रेंडिंग"
    };
    return translations[language] || "Trending";
  };

  return (
    <TrendingWrapper>
      <TrendingContainer>
        <TrendingLabel className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}>
          {getTrendingLabel()}
        </TrendingLabel>
        <TrendingContent>
          {isLoading && !trendingNews.length ? (
            <ShimmerWrapper>
              <ShimmerItem />
              <ShimmerItem />
              <ShimmerItem />
              <ShimmerItem />
            </ShimmerWrapper>
          ) : (
            <TrendingScroller id="trending-scroller">
              {/* Display news items three times to ensure continuous scrolling without gaps */}
              {trendingNews.map((news, index) => (
                <TrendingItem 
                  key={index}
                  className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                >
                  {news}<Divider>|</Divider>
                </TrendingItem>
              ))}
              {trendingNews.map((news, index) => (
                <TrendingItem 
                  key={`duplicate-${index}`}
                  className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                >
                  {news}<Divider>|</Divider>
                </TrendingItem>
              ))}
              {trendingNews.map((news, index) => (
                <TrendingItem 
                  key={`triplicate-${index}`}
                  className={language === "Kannada" || language === "Hindi" ? "kannada-text" : ""}
                >
                  {news}<Divider>|</Divider>
                </TrendingItem>
              ))}
            </TrendingScroller>
          )}
        </TrendingContent>
      </TrendingContainer>
    </TrendingWrapper>
  );
};

export default TrendingBar;
