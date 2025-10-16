import React, { useContext, useState, useEffect } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import {
  HeroWrap,
  HeroMedia,
  OverlayCard,
  Title,
  Excerpt,
  BottomBar,
  Dots,
  Dot,
  Arrows,
  ArrowBtn,
  RightDivider,
  SkeletonHeroWrap,
  SkeletonImage,
  SkeletonOverlay,
  SkeletonTitle,
  SkeletonExcerpt,
  SkeletonButtons,
  SkeletonDots,
  SkeletonDot,
  SkeletonArrows,
  SkeletonArrow,
} from "./Heronews.styles"
import { LanguageContext } from "../../../../../context/LanguageContext"
import { getNewsByTypeDistrict } from "../../../../../services/newsApi/NewsApi"
import { useNavigate } from "react-router-dom"

const FALLBACK_ITEMS = [
  {
    title:
      "District Development Projects Gain Momentum with New Infrastructure Initiatives",
    excerpt:
      "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.",
    image: "/state/state.jpg",
  },
  {
    title: "District unveils new community center for local residents.",
    excerpt: "Quisque aliquet velit sit amet sem interdum, ac facilisis massa aliquet.",
    image: "/state/sidebar.jpg",
  },
  {
    title: "District announces education program for underprivileged students.",
    excerpt: "Mauris non tempor quam, et lacinia sapien. Maecenas ac est sit amet augue pharetra.",
    image: "/state/sidebar2.jpg",
  },
]

export default function NewsHero() {
  const [index, setIndex] = React.useState(0)
  const { language } = useContext(LanguageContext)
  const navigate = useNavigate()
  const [districtNews, setDistrictNews] = useState([])
  const [rawData, setRawData] = useState([])
const [loading, setLoading] = useState(true)


useEffect(() => {
  let mounted = true;
  const fetchDistrictNews = async () => {
    try {
      setLoading(true);
      const response = await getNewsByTypeDistrict();
      console.log("District news:", response.data);
      if (response?.success && Array.isArray(response.data)) {
        if (mounted) {
          setRawData(response.data);
          setIndex(0); // reset carousel to start of API data
        }
      } else {
        if (mounted) setRawData([]);
      }
    } catch (err) {
      console.error("Error fetching district news:", err);
      if (mounted) setRawData([]);
    } finally {
      if (mounted) setLoading(false);
    }
  };
  fetchDistrictNews();
  return () => {
    mounted = false;
  };
}, [language]);

useEffect(() => {
  if (rawData.length > 0) {
    const langKey =
      language === "English"
        ? "English"
        : language === "Hindi"
        ? "hindi"
        : "kannada";
    const normalized = rawData.map((it, i) => ({
      _id: it._id,
      id: it._id ?? it.id ?? `api-${i}`,
      title: (it[langKey]?.title.slice(0, 50) ?? " ") + "..." ,
      excerpt: (it[langKey]?.description.slice(0, 150)?? " ") + "..." ,
      image: it.newsImage ?? "/placeholder.svg",
    }));
    setDistrictNews(normalized);
  }
}, [language, rawData]);

  const len = districtNews.length

  useEffect(() => {
    if (len === 0) {
      setIndex(0);
      return;
    }
    setIndex((i) => (i >= len ? 0 : i));
  }, [len]);

  const go = (next) => {
    if (len === 0) return;
    setIndex((i) => (i + (next ? 1 : -1) + len) % len);
  };

  const current = districtNews[index] || districtNews[0] || {};

  // Handle keyboard navigation for dots
  const handleDotKeyDown = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIndex(i)
    }
  }

  // Handle keyboard navigation for arrows
  const handleArrowKeyDown = (e, isNext) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      go(isNext)
    }
  }

  // Shimmer loading component
  if (loading || districtNews.length === 0) {
    return (
      <SkeletonHeroWrap>
        <SkeletonImage />
        <SkeletonOverlay>
          <SkeletonTitle />
          <SkeletonTitle style={{ width: "60%" }} />
          <SkeletonExcerpt />
          <SkeletonExcerpt style={{ width: "70%" }} />
          <SkeletonExcerpt style={{ width: "50%" }} />
          <SkeletonButtons>
            <SkeletonDots>
              <SkeletonDot />
              <SkeletonDot />
              <SkeletonDot />
            </SkeletonDots>
            <SkeletonArrows>
              <SkeletonArrow />
              <SkeletonArrow />
            </SkeletonArrows>
          </SkeletonButtons>
        </SkeletonOverlay>
        <RightDivider aria-hidden="true" />
      </SkeletonHeroWrap>
    )
  }

  return (
    <HeroWrap 
      role="region" 
      aria-roledescription="carousel" 
      aria-label="Featured district news stories"
      aria-live="polite"
    >
      <HeroMedia>
        {/* Background image */}
        <img 
          src={current.image || "/placeholder.svg"} 
          alt="" 
          aria-hidden="true" 
          loading="lazy"
          onClick={() => navigate(`/newsdetails/${current._id}`)}
          style={{ cursor: 'pointer' }}
        />
      </HeroMedia>
      <OverlayCard>
          <Title as="h3" onClick={() => navigate(`/newsdetails/${current._id}`)} style={{ cursor: 'pointer' }}>{current.title}</Title>
          <Excerpt>{current.excerpt}</Excerpt>

          <BottomBar>
            <Dots role="tablist" aria-label="Carousel navigation">
              {districtNews.slice(0, 3).map((_, i) => (
                <Dot
                  key={i}
                  role="tab"
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={(e) => handleDotKeyDown(e, i)}
                  $active={i === index}
                  aria-label={`Go to slide ${i + 1} of ${len}`}
                  aria-selected={i === index}
                  aria-controls="hero-content"
                />
              ))}
            </Dots>

            <Arrows role="group" aria-label="Carousel controls">
              <ArrowBtn 
                aria-label="Previous story" 
                onClick={() => go(false)}
                onKeyDown={(e) => handleArrowKeyDown(e, false)}
                type="button"
              >
                <IoChevronBack size={25} aria-hidden="true" />
              </ArrowBtn>
              <ArrowBtn 
                aria-label="Next story" 
                onClick={() => go(true)}
                onKeyDown={(e) => handleArrowKeyDown(e, true)}
                type="button"
              >
                <IoChevronForward size={25} aria-hidden="true" />
              </ArrowBtn>
            </Arrows>
          </BottomBar>
        </OverlayCard>
        <RightDivider aria-hidden="true" />
        
        {/* Screen reader announcement */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
          style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Showing story {index + 1} of {len}: {current.title}
        </div>
    </HeroWrap>
  )
}

