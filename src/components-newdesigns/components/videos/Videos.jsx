import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import { getLongVideosList, getVideoCategories } from '../../../services/videoApi/videoApi';
import {
  ArticlesSection,
  Container,
  SectionHeader,
  Title,
  ArticlesGrid,
  MainArticle,
  SmallArticlesGrid,
  SmallArticle,
  ImageContainer,
  ArticleImage,
  PlayButton,
  Badge,
  ArticleContent,
  ArticleTitle,
  ShimmerContainer,
  ShimmerArticlesGrid,
  ShimmerMainArticle,
  ShimmerSmallArticlesGrid,
  ShimmerSmallArticle,
  ViewMoreButton,
  ShimmerThumbnail,
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

function Videos() {
     const [articles, setArticles] = useState([]);
     const [allVideos, setAllVideos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [playingVideo, setPlayingVideo] = useState(null);
      const [categories, setCategories] = useState([]);
      const [activeCategory, setActiveCategory] = useState(null);
      const [categoriesLoading, setCategoriesLoading] = useState(true);
      const { language } = useContext(LanguageContext);
    
    
    
      // Header text translations
      const headerText = {
        English: "Latest Videos",
        Kannada: "ಲೆಟೆಸ್ಟ್ ವಿಡಿಯೋಸ್",
        Hindi: "लेटेस्ट वीडियोज़"
      };
      const buttonText = {
        English: "Show More",
        Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ",
        Hindi: "और दिखाएँ"
      };
      
      // Fetch categories
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            setCategoriesLoading(true);
            const response = await getVideoCategories();
            if (response && Array.isArray(response) && response.length > 0) {
              setCategories(response);
            } else {
              console.warn("Empty video category API response.");
            }
          } catch (error) {
            console.error("Error fetching video categories:", error);
          } finally {
            setCategoriesLoading(false);
          }
        };

        fetchCategories();
      }, []);

      // Fetch videos
      useEffect(() => {
        const fetchVideos = async () => {
          setLoading(true);
          try {
            const response = await getLongVideosList();
            // API returns: { success: true, data: { longvideos: [...] } }
            const videos = response?.data?.longvideos || [];
            if (Array.isArray(videos) && videos.length > 0) {
              setAllVideos(videos);
              setArticles(videos);
            } else {
              setAllVideos([]);
              setArticles([]);
              setError('Failed to load videos');
            }
          } catch (error) {
            console.error('Error fetching videos:', error);
            setError('Error loading videos');
            setAllVideos([]);
            setArticles([]);
          } finally {
            setLoading(false);
          }
        };
        
        fetchVideos();
      }, []);

      // Filter videos by category
      useEffect(() => {
        if (!activeCategory) {
          // Show all videos when no category is selected
          setArticles(allVideos);
          return;
        }

        const filtered = allVideos.filter((video) => {
          // If video has no category, exclude it when filtering by specific category
          if (!video.category) {
            return false;
          }
          
          // Extract category ID and normalize to string
          let categoryId = null;
          if (typeof video.category === "object") {
            // Handle MongoDB $oid format: { "$oid": "..." }
            categoryId = video.category.$oid || video.category._id?.$oid || video.category._id;
          } else {
            categoryId = video.category;
          }
          
          // Convert both to strings for comparison
          const normalizedCategoryId = String(categoryId || "");
          const normalizedActiveCategory = String(activeCategory || "");
          
          return normalizedCategoryId === normalizedActiveCategory;
        });

        setArticles(filtered);
      }, [activeCategory, allVideos]);
      
      // If loading, show shimmer effect
      if (loading) {
        return (
          <ArticlesSection>
            <Container>
              <SectionHeader>
                <Title>{headerText[language] || "Latest Videos"}</Title>
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
                      {categories.map((category) => {
                        const categoryName = 
                          language === "English" ? category.english || category.name :
                          language === "Hindi" ? category.hindi || category.name :
                          category.kannada || category.name;
                        return (
                          <option key={category._id} value={category._id}>
                            {categoryName}
                          </option>
                        );
                      })}
                    </CategorySelect>
                  </CategorySelectWrapper>
                </CategoryDropdownContainer>
              </SectionHeader>
              <ShimmerContainer>
                <ShimmerArticlesGrid>
                  {/* Shimmer Main Article */}
                  <ShimmerMainArticle />
                  
                  {/* Shimmer Small Articles Grid */}
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
                  <ViewMoreButton href="/videos">{buttonText[language] || "Show More"}</ViewMoreButton>
                </SectionHeader>
                <div>
                  {error ? 
                    (language === "English" ? error : 
                     language === "Kannada" ? "ವೀಡಿಯೋಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ" : 
                     language === "Hindi" ? "वीडियो लोड करने में विफल" : error) : 
                    (language === "English" ? "No videos available" : 
                     language === "Kannada" ? "ಯಾವುದೇ ವೀಡಿಯೋಗಳು ಲಭ್ಯವಿಲ್ಲ" : 
                     language === "Hindi" ? "कोई वीडियो उपलब्ध नहीं है" : "No videos available")
                  }
                </div>
              </Container>
            </ArticlesSection>
          );
        }
         const mainArticle = articles[0];
  const smallArticles = articles.slice(0, 5);

  const handlePlayClick = (articleId, videoSrc) => {
    setPlayingVideo(playingVideo === articleId ? null : articleId);
    
    // Force the video to load and play after a short delay
    setTimeout(() => {
      const videoElement = document.getElementById(articleId);
      if (videoElement) {
        videoElement.load(); // Reload the video source
        videoElement.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    }, 100);
  };
  return (
     <ArticlesSection>
          <Container>
            <SectionHeader>
              <Title>{headerText[language] || "Latest Videos"}</Title>
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
                    {categories.map((category) => {
                      const categoryName = 
                        language === "English" ? category.english || category.name :
                        language === "Hindi" ? category.hindi || category.name :
                        category.kannada || category.name;
                      return (
                        <option key={category._id} value={category._id}>
                          {categoryName}
                        </option>
                      );
                    })}
                  </CategorySelect>
                </CategorySelectWrapper>
              </CategoryDropdownContainer>
            </SectionHeader>
    
            <ArticlesGrid>
            {loading ? (
              <ShimmerThumbnail>
                <ShimmerSmallArticle />
                <ShimmerSmallArticle />
                <ShimmerSmallArticle />
                <ShimmerSmallArticle />
              </ShimmerThumbnail>
            ) : (
              <SmallArticlesGrid>
                {smallArticles.map((article) => (
                  <SmallArticle key={article._id}>
                    <ImageContainer>
                      {playingVideo === article._id ? (
                        <video
                          id={article._id}
                          src={article.video_url}
                          controls
                          autoPlay
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          aria-label={article[language.toLowerCase()]?.title || article.title}
                        />
                      ) : (
                        <>
                          <ArticleImage 
                            src={article.thumbnail || '/public/home/home.png'} 
                            alt={article[language.toLowerCase()]?.title || article.title} 
                          />
                          <PlayButton 
                            onClick={() => handlePlayClick(article._id, article.video_url)} 
                            aria-label={`Play ${article[language.toLowerCase()]?.title || article.title}`} 
                          />
                        </>
                      )}
                    </ImageContainer>
                    <ArticleContent>
                      <ArticleTitle>{article[language.toLowerCase()]?.title || article.title}</ArticleTitle>
                    </ArticleContent>
                  </SmallArticle>
                ))}
              </SmallArticlesGrid>
            )}
            </ArticlesGrid>
        
          </Container>
        </ArticlesSection>
  )
}

export default Videos
