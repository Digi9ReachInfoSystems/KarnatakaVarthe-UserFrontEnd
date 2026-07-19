import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { fetchTrendingNews } from "../../../services/newapis/newapis-services";
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

const TRENDING_DISPLAY_COUNT = 7;

const TrendingBar = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useContext(LanguageContext);
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
  const magazineType = pageType === "magazine" || pageType === "magazine2" ? pageType : undefined;

  const [rawNews, setRawNews] = useState([]);

  // Fetch lean trending news from the fast dedicated endpoint
  useEffect(() => {
    let cancelled = false;
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const response = await fetchTrendingNews({
          limit: TRENDING_DISPLAY_COUNT,
          magazineType,
        });
        if (cancelled) return;
        const list = Array.isArray(response?.data) ? response.data : [];
        setRawNews(list);
      } catch (error) {
        console.error("Error fetching trending news:", error);
        if (!cancelled) setRawNews([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchTrending();
    return () => {
      cancelled = true;
    };
  }, [magazineType]);

  // Localize headlines whenever language or raw data changes
  useEffect(() => {
    if (rawNews.length > 0) {
      const localizedHeadlines = rawNews.map((article) => getLocalizedContent(article, "title"));
      setTrendingNews(localizedHeadlines);
    } else {
      setTrendingNews([]);
    }
  }, [language, rawNews]);

  // Get localized content based on language
  const getLocalizedContent = (article, field) => {
    if (!article) return "No content available";

    if (language === "English") {
      if (article.English && article.English[field]) {
        return article.English[field];
      }
      return article[field] || "No content available";
    } else if (language === "Hindi") {
      if (article.hindi && article.hindi[field]) {
        return article.hindi[field];
      }
      return article[field] || (article.English && article.English[field]) || "सामग्री उपलब्ध नहीं है";
    } else if (language === "Kannada") {
      if (article.kannada && article.kannada[field]) {
        return article.kannada[field];
      }
      return article[field] || (article.English && article.English[field]) || "ವಿಷಯ ಲಭ್ಯವಿಲ್ಲ";
    }
    return article[field] || "No content available";
  };

  // Get translated "Clarifications" label
  const getTrendingLabel = () => {
    const translations = {
      English: "Clarifications",
      Kannada: "ಕ್ಲಾರಿಫಿಕೇಶನ್ಸ್",
      Hindi: "क्लैरिफिकेशन्स",
    };
    return translations[language] || "Clarifications";
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
