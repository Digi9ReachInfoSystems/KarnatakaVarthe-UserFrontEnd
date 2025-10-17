import { useState, useEffect, useContext } from 'react';

import { getLongVideos } from "../../../../../services/videoApi/videoApi";
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
} from './LognVideo.Style.js';
import { LanguageContext } from '../../../../../context/LanguageContext.jsx';

const LongVideoMOK = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const { language } = useContext(LanguageContext);

  // Helper function to extract category name based on language
  const getCategoryName = (category) => {
    if (!category) return 'VIDEO';

    if (typeof category === "object" && category) {
      if (language === "English") {
        return category.name || category.title || 'VIDEO';
      } else if (language === "Hindi") {
        return category.hindi || category.name || category.title || 'VIDEO';
      } else if (language === "Kannada") {
        return category.kannada || category.name || category.title || 'VIDEO';
      }
    }

    return 'VIDEO';
  };

  // Header text translations
  const headerText = {
    English: "Latest Videos",
    Kannada: "ಲೆಟೆಸ್ಟ್ ವಿಡಿಯೋಸ್",
    Hindi: "लेटेस्ट वीडियोज़"
  };
  
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await getLongVideos();
        if (response && Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          setArticles([]);
          setError('Failed to load videos');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Error loading videos');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);
  
  // If loading, show shimmer effect
  if (loading) {
    return (
      <ArticlesSection>
        <Container>
          <SectionHeader>
            <Title>{headerText[language] || "Latest Videos"}</Title>
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
  
  // Get the main article and up to 4 small articles
  const mainArticle = articles[0];
  const smallArticles = articles.slice(1, 5);

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
        </SectionHeader>

        <ArticlesGrid>
          {/* Main Large Article */}
          <MainArticle>
            <ImageContainer large>
              {playingVideo === mainArticle._id ? (
                <video
                  id={mainArticle._id}
                  src={mainArticle.video_url}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  aria-label={mainArticle[language.toLowerCase()]?.title || mainArticle.title}
                />
              ) : (
                <>
                  <ArticleImage 
                    src={mainArticle.thumbnail || '/public/home/home.png'} 
                    alt={mainArticle[language.toLowerCase()]?.title || mainArticle.title} 
                  />
                  <Badge>{getCategoryName(mainArticle.category)}</Badge>
                  <PlayButton 
                    onClick={() => handlePlayClick(mainArticle._id, mainArticle.video_url)} 
                    aria-label={`Play ${mainArticle[language.toLowerCase()]?.title || mainArticle.title}`} 
                  />
                  <ArticleContent>
                    <ArticleTitle large>{mainArticle[language.toLowerCase()]?.title || mainArticle.title}</ArticleTitle>
                  </ArticleContent>
                </>
              )}
            </ImageContainer>
          </MainArticle>

          {/* Small Articles Grid */}
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
                  <Badge>{getCategoryName(article.category)}</Badge>
                  <ArticleTitle>{article[language.toLowerCase()]?.title || article.title}</ArticleTitle>
                </ArticleContent>
              </SmallArticle>
            ))}
          </SmallArticlesGrid>
        </ArticlesGrid>
      </Container>
    </ArticlesSection>
  );
};

export default LongVideoMOK;
