import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchHomepageCombinedNews } from "../../../../../services/newapis/newapis-services";
import { LanguageContext } from "../../../../../context/LanguageContext";
import {
  NotificationPanel,
  PanelHeader,
  NotificationList,
  ListItem,
  ListIndex,
  ListBody,
  ListLink,
  LoadingText,
  ErrorText,
  ShimmerContainer,
  ShimmerItem,
  ShimmerIndex,
  ShimmerContent,
  ShimmerText,
  ShimmerLink,
  ShimmerAnimation,
} from "../LatestNotification.styles";

const translations = {
  English: {
    header: "Latest News",
    seeMore: "See more",
    failedToLoad: "Failed to load news",
    noNews: "No news available",
    news: "News",
    ariaLabel: "See more about news",
  },
  Kannada: {
    header: "ಇತ್ತೀಚಿನ ಸುದ್ದಿ",
    seeMore: "ಹೆಚ್ಚು ನೋಡಿ",
    failedToLoad: "ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ",
    noNews: "ಯಾವುದೇ ಸುದ್ದಿಗಳು ಲಭ್ಯವಿಲ್ಲ",
    news: "ಸುದ್ದಿ",
    ariaLabel: "ಸುದ್ದಿಯ ಬಗ್ಗೆ ಹೆಚ್ಚು ನೋಡಿ",
  },
  Hindi: {
    header: "नवीनतम समाचार",
    seeMore: "और देखें",
    failedToLoad: "समाचार लोड करने में विफल",
    noNews: "कोई समाचार उपलब्ध नहीं",
    news: "समाचार",
    ariaLabel: "समाचार के बारे में और देखें",
  },
};

function Services({ magazineType = "magazine" }) {
  const { language } = useContext(LanguageContext);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const t = translations[language] || translations.English;

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHomepageCombinedNews(magazineType);
        setNewsItems(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching latest news:", err);
        setError("failedToLoad");
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, [magazineType]);

  useEffect(() => {
    if (newsItems.length > 0 && !loading && !error && scrollRef.current && !isHovered) {
      const scrollContainer = scrollRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;

      if (scrollHeight > clientHeight) {
        const interval = setInterval(() => {
          if (scrollContainer.scrollTop >= scrollHeight - clientHeight - 10) {
            scrollContainer.scrollTop = 0;
          } else {
            scrollContainer.scrollTop += 1;
          }
        }, 60);

        return () => clearInterval(interval);
      }
    }
  }, [newsItems.length, loading, error, isHovered]);

  const getNewsContent = (item, index) => {
    const maxLength = 100;
    const langKey =
      language === "English"
        ? "English"
        : language === "Hindi"
          ? "hindi"
          : "kannada";
    const newsId = item._id?.$oid || item._id;
    const fullText =
      item[langKey]?.title ||
      item.title ||
      item.English?.title ||
      item.kannada?.title ||
      item.hindi?.title ||
      `${t.news} ${index + 1}`;

    const truncatedText =
      fullText.length > maxLength
        ? `${fullText.substring(0, maxLength)}...`
        : fullText;

    const link = newsId ? `/newsdetails/${newsId}` : "#";

    return { text: truncatedText, link };
  };

  const ShimmerLoader = () => (
    <ShimmerContainer>
      <ShimmerAnimation />
      {[1, 2, 3, 4, 5].map((item) => (
        <ShimmerItem key={item}>
          <ShimmerIndex />
          <ShimmerContent>
            <ShimmerText width="90%" />
            <ShimmerText width="75%" marginBottom="8px" />
            <ShimmerLink />
          </ShimmerContent>
        </ShimmerItem>
      ))}
    </ShimmerContainer>
  );

  return (
    <NotificationPanel aria-labelledby="latest-news-heading">
      <PanelHeader id="latest-news-heading">{t.header}</PanelHeader>
      <NotificationList
        aria-label="Latest news list"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <ShimmerLoader />
        ) : error ? (
          <ErrorText>{t.failedToLoad}</ErrorText>
        ) : newsItems.length > 0 ? (
          newsItems.map((item, index) => {
            const { text, link } = getNewsContent(item, index);
            const isExternalLink =
              link && (link.startsWith("http://") || link.startsWith("https://"));

            return (
              <ListItem key={item._id?.$oid || item._id || index}>
                <ListIndex aria-hidden="true">{index + 1}.</ListIndex>
                <ListBody>
                  {text}
                  {isExternalLink ? (
                    <ListLink
                      as="a"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.ariaLabel} ${index + 1}`}
                    >
                      {t.seeMore} <span aria-hidden="true">→</span>
                    </ListLink>
                  ) : (
                    <ListLink
                      as={Link}
                      to={link}
                      aria-label={`${t.ariaLabel} ${index + 1}`}
                    >
                      {t.seeMore} <span aria-hidden="true">→</span>
                    </ListLink>
                  )}
                </ListBody>
              </ListItem>
            );
          })
        ) : (
          <LoadingText>{t.noNews}</LoadingText>
        )}
      </NotificationList>
    </NotificationPanel>
  );
}

export default Services;
