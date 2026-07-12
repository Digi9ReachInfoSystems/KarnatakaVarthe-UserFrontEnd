import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import { fetchLongVideosPage, fetchVideoCategories } from '../../../services/newapis/newapis-services';
import LoadMoreSpinner from '../common/LoadMoreSpinner/LoadMoreSpinner';
import {
  ArticlesSection,
  Container,
  SectionHeader,
  Title,
  ArticlesGrid,
  SmallArticlesGrid,
  SmallArticle,
  ImageContainer,
  ArticleImage,
  PlayButton,
  ArticleContent,
  ArticleTitle,
  ShimmerContainer,
  ShimmerArticlesGrid,
  ShimmerMainArticle,
  ShimmerSmallArticlesGrid,
  ShimmerSmallArticle,
  CategoryDropdownContainer,
  CategorySelect,
  CategorySelectWrapper,
  FilterLabel,
} from './Video.Styles';

const allTabText = {
  English: "All",
  Kannada: "ಎಲ್ಲಾ",
  Hindi: "सभी",
};

const PAGE_LIMIT = 20;

function Videos() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { language } = useContext(LanguageContext);
  const sentinelRef = useRef(null);
  const loadingMoreRef = useRef(false);

  const headerText = {
    English: "Latest Videos",
    Kannada: "ಲೆಟೆಸ್ಟ್ ವಿಡಿಯೋಸ್",
    Hindi: "लेटेस्ट वीडियोज़"
  };

  const getVideoTitle = (article) => {
    const langKey = language === "English" ? "english" : language === "Hindi" ? "hindi" : "kannada";
    return article?.[langKey]?.title || article?.title || "";
  };

  const getCategoryLabel = (category) => {
    if (language === "English") return category.english || category.English || category.name;
    if (language === "Hindi") return category.hindi || category.name;
    return category.kannada || category.name;
  };

  // Fetch video categories (VideoCategory collection — not news categories)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const normalized = await fetchVideoCategories();
        setCategories(normalized);
      } catch (err) {
        console.error("Error fetching video categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch page 1 when category changes
  useEffect(() => {
    let cancelled = false;
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      setPage(1);
      setHasNextPage(false);
      try {
        const res = await fetchLongVideosPage(1, {
          limit: PAGE_LIMIT,
          category: activeCategory || undefined,
        });
        if (cancelled) return;
        if (res?.success && Array.isArray(res.data)) {
          setArticles(res.data);
          setHasNextPage(Boolean(res.pagination?.hasNextPage));
          setPage(1);
        } else {
          setArticles([]);
          setHasNextPage(false);
          setError("Failed to load videos");
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        if (!cancelled) {
          setArticles([]);
          setHasNextPage(false);
          setError("Error loading videos");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasNextPage || loading) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const res = await fetchLongVideosPage(nextPage, {
        limit: PAGE_LIMIT,
        category: activeCategory || undefined,
      });
      if (res?.success && Array.isArray(res.data)) {
        setArticles((prev) => [...prev, ...res.data]);
        setHasNextPage(Boolean(res.pagination?.hasNextPage));
        setPage(nextPage);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      console.error("Error loading more videos:", err);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [hasNextPage, loading, page, activeCategory]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore, loading, hasNextPage]);

  const handlePlayClick = (articleId) => {
    setPlayingVideo(playingVideo === articleId ? null : articleId);

    setTimeout(() => {
      const videoElement = document.getElementById(articleId);
      if (videoElement) {
        videoElement.load();
        videoElement.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      }
    }, 100);
  };

  const categoryFilter = (
    <CategoryDropdownContainer>
      <FilterLabel>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        {language === "English" ? "Filter" : language === "Kannada" ? "ಫಿಲ್ಟರ್" : "फ़िल्टर"}
      </FilterLabel>
      <CategorySelectWrapper>
        <CategorySelect
          value={activeCategory || ""}
          onChange={(e) => setActiveCategory(e.target.value || null)}
          aria-label={language === "English" ? "Filter videos by category" : language === "Kannada" ? "ವರ್ಗದಿಂದ ವೀಡಿಯೋಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ" : "श्रेणी के अनुसार वीडियो फ़िल्टर करें"}
        >
          <option value="">{allTabText[language] || "All"}</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {getCategoryLabel(category)}
            </option>
          ))}
        </CategorySelect>
      </CategorySelectWrapper>
    </CategoryDropdownContainer>
  );

  if (loading) {
    return (
      <ArticlesSection>
        <Container>
          <SectionHeader>
            <Title>{headerText[language] || "Latest Videos"}</Title>
            {categoryFilter}
          </SectionHeader>
          <ShimmerContainer>
            <ShimmerArticlesGrid>
              <ShimmerMainArticle />
              <ShimmerSmallArticlesGrid>
                <ShimmerSmallArticle />
                <ShimmerSmallArticle />
                <ShimmerSmallArticle />
                <ShimmerSmallArticle />
              </ShimmerSmallArticlesGrid>
            </ShimmerArticlesGrid>
          </ShimmerContainer>
        </Container>
      </ArticlesSection>
    );
  }

  if (error || articles.length === 0) {
    return (
      <ArticlesSection>
        <Container>
          <SectionHeader>
            <Title>{headerText[language] || "Latest Videos"}</Title>
            {categoryFilter}
          </SectionHeader>
          <div>
            {error
              ? (language === "English" ? error :
                 language === "Kannada" ? "ವೀಡಿಯೋಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ" :
                 language === "Hindi" ? "वीडियो लोड करने में विफल" : error)
              : (language === "English" ? "No videos available" :
                 language === "Kannada" ? "ಯಾವುದೇ ವೀಡಿಯೋಗಳು ಲಭ್ಯವಿಲ್ಲ" :
                 language === "Hindi" ? "कोई वीडियो उपलब्ध नहीं है" : "No videos available")
            }
          </div>
        </Container>
      </ArticlesSection>
    );
  }

  return (
    <ArticlesSection>
      <Container>
        <SectionHeader>
          <Title>{headerText[language] || "Latest Videos"}</Title>
          {categoryFilter}
        </SectionHeader>

        <ArticlesGrid>
          <SmallArticlesGrid>
            {articles.map((article) => {
              const id = article._id?.$oid || article._id;
              const title = getVideoTitle(article);
              return (
                <SmallArticle key={id}>
                  <ImageContainer>
                    {playingVideo === id ? (
                      <video
                        id={id}
                        src={article.video_url}
                        controls
                        autoPlay
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        aria-label={title}
                      />
                    ) : (
                      <>
                        <ArticleImage
                          src={article.thumbnail || '/public/home/home.png'}
                          alt={title}
                        />
                        <PlayButton
                          onClick={() => handlePlayClick(id)}
                          aria-label={`Play ${title}`}
                        />
                      </>
                    )}
                  </ImageContainer>
                  <ArticleContent>
                    <ArticleTitle>{title}</ArticleTitle>
                  </ArticleContent>
                </SmallArticle>
              );
            })}
          </SmallArticlesGrid>
        </ArticlesGrid>

        {hasNextPage && (
          <div
            ref={sentinelRef}
            aria-hidden="true"
            style={{ height: 1, width: "100%" }}
          />
        )}
        {loadingMore && <LoadMoreSpinner />}
      </Container>
    </ArticlesSection>
  );
}

export default Videos;
