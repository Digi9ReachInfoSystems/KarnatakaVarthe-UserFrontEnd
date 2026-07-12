import { useState, useEffect, useContext } from 'react';

import { fetchHomepageLongVideos } from "../../../../../services/newapis/newapis-services";
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

function getVideoId(video, index) {
  return video._id?.$oid || video._id || String(index);
}

function getVideoTitle(video, language) {
  const langKey =
    language === "English"
      ? "English"
      : language === "Hindi"
        ? "hindi"
        : "kannada";

  return (
    video?.[langKey]?.title ||
    video?.English?.title ||
    video?.kannada?.title ||
    video?.hindi?.title ||
    video?.title ||
    ""
  );
}

function getVideoUrl(video) {
  return video?.video_url || video?.videoUrl || "";
}

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
  const buttonText = {
    English: "Show More ->",
    Kannada: "ಹೆಚ್ಚು ತೋರಿಸಿ ->",
    Hindi: "और दिखाएँ ->"
  };
  
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetchHomepageLongVideos();
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
  const mainId = getVideoId(mainArticle, 0);
  const mainTitle = getVideoTitle(mainArticle, language);
  const mainUrl = getVideoUrl(mainArticle);

  const handlePlayClick = (articleId) => {
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
           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <a href="/videos" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>
                {buttonText[language] || "Show More"}
              </a>
            </div>
        </SectionHeader>

        <ArticlesGrid>
          {/* Main Large Article */}
          <MainArticle>
            <ImageContainer large>
              {playingVideo === mainId ? (
                <video
                  id={mainId}
                  src={mainUrl}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  aria-label={mainTitle}
                />
              ) : (
                <>
                  <ArticleImage 
                    src={mainArticle.thumbnail || '/public/home/home.png'} 
                    alt={mainTitle} 
                  />
                  <Badge>{getCategoryName(mainArticle.category)}</Badge>
                  <PlayButton 
                    onClick={() => handlePlayClick(mainId)} 
                    aria-label={`Play ${mainTitle}`} 
                  />
                  <ArticleContent>
                    <ArticleTitle large>{mainTitle}</ArticleTitle>
                  </ArticleContent>
                </>
              )}
            </ImageContainer>
          </MainArticle>

          {/* Small Articles Grid */}
          <SmallArticlesGrid>
            {smallArticles.map((article, index) => {
              const id = getVideoId(article, index + 1);
              const title = getVideoTitle(article, language);
              const url = getVideoUrl(article);

              return (
              <SmallArticle key={id}>
                <ImageContainer>
                  {playingVideo === id ? (
                    <video
                      id={id}
                      src={url}
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
                  <Badge>{getCategoryName(article.category)}</Badge>
                  <ArticleTitle>{title}</ArticleTitle>
                </ArticleContent>
              </SmallArticle>
              );
            })}
          </SmallArticlesGrid>
        </ArticlesGrid>
       
      </Container>
    </ArticlesSection>
  );
};

export default LongVideoMOK;
