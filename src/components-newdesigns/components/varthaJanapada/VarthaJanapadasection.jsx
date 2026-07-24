import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageLayout, FlexContainer } from "./VarthaJanapadasection.styles";
import Varthahero from "./modules/Varthahero";
import StateNews from "./modules/StateNews";
import ArticlesNews from "./modules/articlescrool/ArticlesNews";
import LongVideos from "./modules/youtubeVideos/YoutubeVideosSection";
import GallerySection from "./modules/gallery/GallerySection";
import ShortsCarousel from "./modules/youtubeShorts/YoutubeShortsSection";
import InstagramReelsSection from "./modules/instagramReels/InstagramReelsSection";
import NewsArticlesNews from "./modules/newsarticles/NewsArtilces";

const HASH_SECTION_IDS = new Set(["videos", "shorts", "reels"]);

export default function VarthaJanapadasection() {
  const location = useLocation();

  useEffect(() => {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!HASH_SECTION_IDS.has(hash)) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 20;

    const scrollToSection = () => {
      if (cancelled) return;
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(scrollToSection, 100);
      }
    };

    // Delay so ScrollToTop (pathname change) can finish first when navigating from another route.
    const startTimer = window.setTimeout(scrollToSection, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
    };
  }, [location.hash, location.pathname]);

  return (
    <main aria-label="Vartha Janapada main content">
      <PageLayout>
        <Varthahero />
        <FlexContainer>
          <StateNews />
          <InstagramReelsSection />
        </FlexContainer>
        <ArticlesNews />
        <NewsArticlesNews />
        <LongVideos />
        <ShortsCarousel />
        <GallerySection />
      </PageLayout>
    </main>
  );
}
