import React from "react";
import { PageLayout, FlexContainer } from "./VarthaJanapadasection.styles";
import Varthahero from "./modules/Varthahero";
import StateNews from "./modules/StateNews";
import StateGovernmentWebsites from "./modules/StateGovernmentWebsites";
import ArticlesNews from "./modules/articlescrool/ArticlesNews";
import LongVideos from "./modules/longvideos/LongVideos";
import GallerySection from "./modules/gallery/GallerySection";
import ShortsCarousel from "./modules/shortvideos/ShortVideosSection";
import NewsArticlesNews from "./modules/newsarticles/NewsArtilces";

export default function VarthaJanapadasection() {
  return (
    <main aria-label="Vartha Janapada main content">
      <PageLayout>
        <Varthahero />
        <FlexContainer>
          <StateNews />
          <StateGovernmentWebsites />
        </FlexContainer>
        <NewsArticlesNews />
        <ArticlesNews />
        <LongVideos />
        <ShortsCarousel />
        <GallerySection />
      </PageLayout>
    </main>
  );
}
