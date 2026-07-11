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
} from "./Heronews.styles";
import { fetchStateNewsListPage } from "../../../../../services/newapis/newapis-services";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function NewsHero({ dateFilter = null }) {
  const [index, setIndex] = React.useState(0);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate()

  const [stateNews, setStateNews] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchStateNews = async () => {
      console.log('🔍 HeroNews - Fetching with dateFilter:', dateFilter, 'Type:', typeof dateFilter)
      try {
        setLoading(true);
        // Ensure dateFilter is string or null, never an object
        const cleanDateFilter = (dateFilter && typeof dateFilter === 'string') ? dateFilter : null
        console.log('🔍 HeroNews - Clean dateFilter:', cleanDateFilter)
        const response = await fetchStateNewsListPage(1, { date: cleanDateFilter });
        console.log('✅ HeroNews - API response:', response)
        if (response?.success && Array.isArray(response.data)) {
          console.log('📰 HeroNews - News count:', response.data.length)
          if (mounted) {
            setRawData(response.data);
            setIndex(0);
          }
        } else {
          console.warn('⚠️ HeroNews - No data or invalid format')
          if (mounted) setRawData([]);
        }
      } catch (err) {
        console.error("❌ HeroNews - Error fetching state news:", err);
        if (mounted) setRawData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchStateNews();
    return () => {
      mounted = false;
    };
  }, [language, dateFilter]);

  useEffect(() => {
    if (rawData.length > 0) {
      console.log('🔄 HeroNews - Processing rawData, count:', rawData.length)
      const langKey =
        language === "English"
          ? "English"
          : language === "Hindi"
          ? "hindi"
          : "kannada";
      const normalized = rawData.map((it, i) => {
        // Extract proper ID from MongoDB format
        const newsId = it._id?.$oid || it._id
        
        return {
        id: newsId ?? `api-${i}`,
        title: (it[langKey]?.title.slice(0, 50)??'') + "..." ,
        excerpt: (it[langKey]?.description.slice(0, 150)??'') + "..." ,
        image: it.newsImage ?? "/placeholder.svg",
      }});
      console.log('✅ HeroNews - Normalized news, count:', normalized.length)
      setStateNews(normalized);
    }
  }, [language, rawData]);

  // Choose API data when available, otherwise use fallback prop ? stateNews :
  // const itemsToShow = stateNews.length ? stateNews : items
  const len = stateNews.length;

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

  const current = stateNews[index] || stateNews[0] || {};

  // Shimmer loading component
  if (loading || stateNews.length === 0) {
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
            {stateNews.slice(0, 3).map((_, i) => (
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
  );
}
