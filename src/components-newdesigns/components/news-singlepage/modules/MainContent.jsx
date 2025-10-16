import React, { useContext, useEffect, useState, useRef } from 'react'
import SocialShare from './SocialShare'
import { FaUser, FaPlay, FaPause } from 'react-icons/fa'
import {
  MainContentContainer,
  DateTag,
  LocationTag,
  ArticleTitle,
  AuthorCard,
  AuthorImage,
  AuthorInfo,
  AuthorName,
  HeroImage,
  ImageCaption,
  ArticleContent,
  ArticleParagraph,
  SkeletonLine,
  SkeletonImage,
  SkeletonAuthorCard,
  SkeletonAvatar,
  AudioBookContainer,
  AudioBookButton,
  AudioBookIcon,
  AudioBookText,
} from './MainContent.styles'
import { LanguageContext } from '../../../../context/LanguageContext'
import { getNewsByid } from '../../../../services/newsApi/NewsApi'
import { useParams } from 'react-router-dom'

const MainContent = () => {
  const {language, setPageLanguage, resetToGlobalLanguage} = useContext(LanguageContext)
  const {id} = useParams()

  const [rawNews, setRawNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState(null)
  const audioRef = useRef(null)
  const [news, setNews] = useState({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    paragraphs: ['', ''],
    date: '',
    image: '/placeholder.svg',
    category: '',
    author: '',
    authorImage: '/placeholder.svg',
    alt: '',
    tags: [],
    quote: ''
  });
  // get news by id
  useEffect(() => {
    let mounted = true;
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getNewsByid(id);
        console.log('getNewsByid response', response);
  
        if (!mounted) return;
        // handle both single-object and array responses
        const data = response?.data
          ? Array.isArray(response.data)
            ? response.data
            : [response.data]
          : [];
  
        setRawNews(data);
      } catch (err) {
        console.error('fetchNews error', err);
        setRawNews([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (id) fetchNews();
    return () => { mounted = false; };
  }, [id]);

  // Set page language based on magazineType
  useEffect(() => {
    if (rawNews && rawNews.length > 0) {
      const magazineType = rawNews[0]?.magazineType;
      console.log('News magazineType:', magazineType);
      
      if (magazineType === "magazine2") {
        // March of Karnataka - set to English
        setPageLanguage("magazine2");
      } else if (magazineType === "magazine") {
        // Vartha Janapada - set to Kannada
        setPageLanguage("magazine");
      } else {
        // Other news - use global language
        resetToGlobalLanguage();
      }
    }

    // Cleanup: reset to global language when component unmounts
    return () => {
      resetToGlobalLanguage();
    };
  }, [rawNews, setPageLanguage, resetToGlobalLanguage]);

  useEffect(() => {
    if (!rawNews || rawNews.length === 0) {
      console.log('rawNews empty', rawNews);
      setNews(null);
      setAudioUrl(null);
      return;
    }
  
    const langKey = language === "English" ? "English" : language === "Hindi" ? "hindi" : "kannada";
  
    try {
      // Extract audio URL based on language
      const audioDescUrl = rawNews[0]?.[langKey]?.audio_description || null;
      console.log('Audio URL for language', langKey, ':', audioDescUrl);
      setAudioUrl(audioDescUrl);
      
      // Stop playing audio when language changes
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      const localized = rawNews.map((item) => {
        // safe category extraction
        const cat = item.category;
        let categoryName = "";
        if (cat) {
          if (typeof cat === "string") {
            categoryName = cat;
          } else if (typeof cat === "object") {
            // cat[langKey] could be string or object
            const localizedCat = cat[langKey];
            categoryName =
              (localizedCat && (typeof localizedCat === "string" ? localizedCat : localizedCat.name)) ||
              cat.name ||
              cat.title ||
              "";
          }
        }
  
        const title = (item[langKey] && item[langKey].title) || item.title || "";
        const excerpt = (item[langKey] && item[langKey].description) || item.description || "";
        let paragraph1 = "";
        let paragraph2 = "";
        
        if (excerpt.length > 0) {
          // Split content into paragraphs based on sentence boundaries
          // Look for natural paragraph breaks (double line breaks, sentence endings)
          const sentences = excerpt.match(/[^.!?]+[.!?]+/g) || [excerpt];
          
          if (sentences.length > 1) {
            // Split roughly in half
            const midpoint = Math.ceil(sentences.length / 2);
            paragraph1 = sentences.slice(0, midpoint).join(' ').trim();
            paragraph2 = sentences.slice(midpoint).join(' ').trim();
          } else {
            // If no sentences found, split by length
            const middle = Math.floor(excerpt.length / 2);
            const splitPoint = excerpt.indexOf(' ', middle);
            
            if (splitPoint !== -1) {
              paragraph1 = excerpt.slice(0, splitPoint).trim();
              paragraph2 = excerpt.slice(splitPoint).trim();
            } else {
              paragraph1 = excerpt.trim();
              paragraph2 = "";
            }
          }
        }
        return {
          id: item._id,
          title: title || "Untitled Article",
          excerpt: excerpt ? (excerpt.length > 200 ? excerpt.slice(0, 200) + "..." : excerpt) : "",
          content: excerpt,
          paragraphs: [paragraph1, paragraph2],
          date: item.publishedAt || item.createdAt
            ? new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : "",
          image: item.newsImage || "/placeholder.svg",
          category: categoryName,
          author: item.author || "DIPR Karnataka",
          alt: item.title || "News Article Image",
          tags: item.tags || [],
          quote: item.quote || "",
        };
      });
  
      console.log('localized =>', localized);
      // this is a single-article page: use the first item as the article object
      setNews(localized[0] || null);
    } catch (err) {
      console.error('localize error', err);
      setNews(null);
    }
  }, [rawNews, language]);

  // Handle audio play/pause
  const handleAudioToggle = () => {
    if (!audioUrl) {
      console.log('No audio URL available for this article');
      return;
    }

    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setIsPlaying(false);
      });
    }

    // Update audio source if it changed
    if (audioRef.current.src !== audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }

    // Toggle play/pause
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <MainContentContainer as="article" role="article" aria-labelledby="article-title">
        {/* Skeleton for Location and Date */}
        <SkeletonLine width="200px" height="14px" $marginBottom="8px" />
        <SkeletonLine width="150px" height="24px" $marginBottom="16px" />
        
        {/* Skeleton for Title */}
        <SkeletonLine width="90%" height="40px" $marginBottom="16px" />
        <SkeletonLine width="80%" height="40px" $marginBottom="16px" />
        
        {/* Skeleton for Subheadline */}
        <SkeletonLine width="100%" height="18px" $marginBottom="8px" />
        <SkeletonLine width="95%" height="18px" $marginBottom="24px" />
        
        {/* Skeleton for Author Card */}
        <SkeletonAuthorCard>
          <SkeletonAvatar />
          <div style={{ flex: 1 }}>
            <SkeletonLine width="150px" height="20px" />
          </div>
        </SkeletonAuthorCard>
        
        {/* Skeleton for Hero Image */}
        <SkeletonImage />
        
        {/* Skeleton for Article Content */}
        <div>
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="95%" height="16px" $marginBottom="24px" />
          
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="90%" height="16px" $marginBottom="24px" />
          
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="100%" height="16px" $marginBottom="8px" />
          <SkeletonLine width="85%" height="16px" $marginBottom="24px" />
        </div>
      </MainContentContainer>
    );
  }

  // Don't render if news is null (error state or no data)
  if (!news) {
    return (
      <MainContentContainer as="article" role="article" aria-labelledby="article-title">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Article not found or unable to load.
        </div>
      </MainContentContainer>
    );
  }

  return (
    <MainContentContainer as="article" role="article" aria-labelledby="article-title">
      {/* Location and Date Tags */}
      {news.category && (
        <LocationTag as="div" aria-label="Article category">
          {news.category}
        </LocationTag>
      )}
      <DateTag as="time" dateTime={news.date}>{news.date}</DateTag>
      
      {/* Main Article Title */}
      <ArticleTitle id="article-title" as="h2">
        {news.title}
      </ArticleTitle>
      
      {/* Subheadline */}
      <p style={{ 
        fontSize: '17px', 
        color: '#666', 
        marginBottom: '14px',
        marginTop: '8px',
        fontStyle: 'italic',
        lineHeight: '1.5',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        textAlign: 'justify'
      }}>
        {news.excerpt}
      </p>
      
      {/* Author Information Card */}
      <AuthorCard as="aside" role="complementary" aria-labelledby="author-info-heading">
        <h3 
          id="author-info-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Article Author Information
        </h3>
        <AuthorImage>
          <FaUser 
            size={24} 
            color="#666"
            aria-hidden="true"
          />
        </AuthorImage>
        <AuthorInfo>
          <AuthorName aria-label={`Written by ${news.author}`}>
             {news.author}
          </AuthorName>
        </AuthorInfo>
      </AuthorCard>
      
      {/* Hero Image with Caption */}
      <HeroImage as="figure" role="img" aria-labelledby="hero-image-caption">
        <img 
          src={news.image} 
          alt="Raichur's green transformation showing lush greenery and transformed landscapes" 
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
        <ImageCaption id="hero-image-caption" as="figcaption">
          {news.title}
        </ImageCaption>
      </HeroImage>
      
      {/* Audio Book Button - Only show if audio URL is available */}
      {audioUrl && (
        <AudioBookContainer>
          <AudioBookButton
            onClick={handleAudioToggle}
            aria-label={isPlaying ? "Pause audio book" : "Play audio book version of this article"}
          >
            <AudioBookIcon>
              {isPlaying ? (
                <FaPause 
                  size={12} 
                  color="#fff"
                />
              ) : (
                <FaPlay 
                  size={12} 
                  color="#fff"
                  style={{ marginLeft: '2px' }}
                />
              )}
            </AudioBookIcon>
            <AudioBookText>{isPlaying ? 'Pause' : 'Audio Book'}</AudioBookText>
          </AudioBookButton>
        </AudioBookContainer>
      )}
      
      {/* Article Content */}
      <ArticleContent>
        {news.paragraphs[0] && (
          <ArticleParagraph>{news.paragraphs[0]}</ArticleParagraph>
        )}
        {news.paragraphs[1] && (
          <ArticleParagraph>{news.paragraphs[1]}</ArticleParagraph>
        )}
        {/* Display full content if paragraphs are empty */}
        {!news.paragraphs[0] && !news.paragraphs[1] && news.content && (
          <ArticleParagraph>{news.content}</ArticleParagraph>
        )}
      </ArticleContent>
      
      {/* Article Tags */}
      {/* <ArticleTags as="nav" role="navigation" aria-labelledby="article-tags-heading">
        <h3 
          id="article-tags-heading" 
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Article Tags
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <li><Tag as="a" href="#raichur" tabIndex="0">raichur</Tag></li>
          <li><Tag as="a" href="#karnataka" tabIndex="0">karnataka</Tag></li>
          <li><Tag as="a" href="#nature" tabIndex="0">nature</Tag></li>
          <li><Tag as="a" href="#conservation" tabIndex="0">conservation</Tag></li>
          <li><Tag as="a" href="#eco-tourism" tabIndex="0">eco-tourism</Tag></li>
          <li><Tag as="a" href="#heritage" tabIndex="0">heritage</Tag></li>
          <li><Tag as="a" href="#environment" tabIndex="0">environment</Tag></li>
          <li><Tag as="a" href="#sustainability" tabIndex="0">sustainability</Tag></li>
          <li><Tag as="a" href="#community" tabIndex="0">community</Tag></li>
          <li><Tag as="a" href="#transformation" tabIndex="0">transformation</Tag></li>
        </ul>
      </ArticleTags> */}
      
      {/* Social Share */}
      <SocialShare />   

      </MainContentContainer>
  )
}

export default MainContent
