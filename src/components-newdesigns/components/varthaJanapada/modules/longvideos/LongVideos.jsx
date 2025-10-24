import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../../../../context/LanguageContext';
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
  ArticleContent,
  ArticleTitle,
  ShimmerContainer,
  ShimmerArticlesGrid,
  ShimmerMainArticle,
  ShimmerSmallArticlesGrid,
  ShimmerSmallArticle,
  ViewMoreButton,
} from './LongVideos.styles';

const LongVideos = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
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
                  <ArticleTitle>{article[language.toLowerCase()]?.title || article.title}</ArticleTitle>
                </ArticleContent>
              </SmallArticle>
            ))}
          </SmallArticlesGrid>
        </ArticlesGrid>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <a href="/videos" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>
                {buttonText[language] || "Show More"}
              </a>
            </div>
      </Container>
    </ArticlesSection>
  );
};

export default LongVideos;
