import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
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
} from "./styles/Banner.style";
import { getNewsByTypeArticles } from "../../../../services/newsApi/NewsApi";

import { LanguageContext } from "../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

function Banner() {
    //Banner for Articles page
     const [index, setIndex] = React.useState(0);
      const { language } = useContext(LanguageContext);
      const navigate = useNavigate()
    
      const [articles , setArticles] = useState([]);
      const [rawData, setRawData] = useState([]);
      const [loading, setLoading] = useState(true);
    // Article api call
      useEffect(() => {
        let mounted = true;
        const fetchArticlesNews = async () => {
          try {
            setLoading(true);
            const response = await getNewsByTypeArticles();
         
            if (response?.success && Array.isArray(response.data)) {
              if (mounted) {
                setRawData(response.data);
                setIndex(0);
              }
            } else {
              if (mounted) setRawData([]);
            }
          } catch (err) {
            console.error("Error fetching state news:", err);
            if (mounted) setRawData([]);
          } finally {
            if (mounted) setLoading(false);
          }
        };
        fetchArticlesNews();
        return () => {
          mounted = false;
        };
      }, [language]);
    // convert api data based on language selection
      useEffect(() => {
        if (rawData.length > 0) {
          const langKey =
            language === "English"
              ? "English"
              : language === "Hindi"
              ? "hindi"
              : "kannada";
          const normalized = rawData.map((it, i) => ({
            id: it._id ?? it.id ?? `api-${i}`,
            title: (it[langKey]?.title.slice(0, 50)??'') + "..." ,
            excerpt: (it[langKey]?.description.slice(0, 150)??'') + "..." ,
            image: it.newsImage ?? "/placeholder.svg",
          }));
          setArticles(normalized);
        }
      }, [language, rawData]);
    
      // Choose API data when available, otherwise use fallback prop ? articles :
      // const itemsToShow = articles.length ? articles : items
      const len = articles.length;
    
      // keep index in-range if items length changes
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
    
      const current = articles[index] || articles[0] || {};
    
      // Shimmer loading component
      if (loading || articles.length === 0) {
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
            <RightDivider />
          </SkeletonHeroWrap>
        );
      }
  return (
    <HeroWrap aria-roledescription="carousel" aria-label="Top stories">
        <HeroMedia
        onClick={() => navigate(`/newsdetails/${current.id}`)}
        >
          {/* Background image */}
          <img
            src={current.image || "/placeholder.svg"}
            alt=""
            aria-hidden="true"
          />
          {/* Overlay card */}
        </HeroMedia>
        <OverlayCard>
          <Title>{current.title}</Title>
          <Excerpt>{current.excerpt}</Excerpt>
  
          <BottomBar>
            <Dots role="tablist" aria-label="Slide progress">
              {articles.slice(0, 3).map((_, i) => (
                <Dot
                  key={i}
                  onClick={() => setIndex(i)}
                  $active={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIndex(i);
                    }
                  }}
                />
              ))}
            </Dots>
            <Arrows>
              <ArrowBtn
                aria-label="Previous"
                onClick={() => go(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go(false);
                  }
                }}
              >
                <IoChevronBack size={25} aria-hidden="true" />
              </ArrowBtn>
              <ArrowBtn
                aria-label="Next"
                onClick={() => go(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go(true);
                  }
                }}
              >
                <IoChevronForward size={25} aria-hidden="true" />
              </ArrowBtn>
            </Arrows>
          </BottomBar>
        </OverlayCard>
        <RightDivider />
      </HeroWrap>
  )
}

export default Banner
