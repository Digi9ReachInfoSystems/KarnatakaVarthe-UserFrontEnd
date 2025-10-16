import Trending from "../../../modules/components/Trending/Trending";
import {
  HomeContainer,
} from "./Home.styles";
import ShortsCarousel from "../../../modules/components/homevideosection/ShortsCarousel";
import Magzinehome from "../../components/homepage-new/MagzineShow";
import CategoryTabnews from "../../components/homepage-new/CategoryTabnews";
import LatestNewsSection from "../../components/homevideosection/homelatestnews/LatestNews";
import HomeVideos from "../../components/homevideosection/home-longvideos/HomeLongvideos";
import HomeRecommedNews from "../../components/homevideosection/homerecommed/HomeRecommed";

const Home = () => {
  return (
    <HomeContainer role="main" aria-label="Home page">
        <>
          <Trending />
          <Magzinehome/>
          <CategoryTabnews/>
          <LatestNewsSection/>
          <ShortsCarousel/>
          <HomeVideos/>
          <HomeRecommedNews />
        </>
    </HomeContainer>
  );
};

export default Home;