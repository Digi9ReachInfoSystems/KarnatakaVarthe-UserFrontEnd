import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import {
  HeroLayout,
  HeroRoot,
  HeroBackground,
  HeroOverlay,
  HeroContent,
  HeroTitle,
  HeroCta,
} from "./Varthahero.styles.js";
import HeroShortVideos from "./heroshorts/HeroShortVideos.jsx";
import Services from "./servicess/Services.jsx";
import LiveTvPanel from "./liveTv/LiveTvPanel.jsx";
import { NewsColumnStack } from "./liveTv/LiveTvPanel.styles.js";

export default function Varthahero() {
  const { language } = useContext(LanguageContext);

  const translations = {
    magazine: {
      Kannada: "ಇತ್ತೀಚಿನ ವಾರ್ತಾ ಜನಪದ ಮ್ಯಾಗಜೀನ್ಗಳು",
      English: "Latest Vartha Janapada Magazines",
      Hindi: "नवीनतम वार्ता जनपद पत्रिकाएं",
    },
    viewButton: {
      Kannada: "ವೀಕ್ಷಿಸಿ",
      English: "View",
      Hindi: "देखें",
    },
  };

  const heroData = {
    image: "/newupdate/varthajanapada.jpg",
    magazineType: "magazine",
    link: "/magazinesvartha",
  };

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > minSwipeDistance;
    if (isSwipe) {
      // Handle swipe if needed for future carousel implementation
    }
  };

  return (
    <HeroLayout aria-label="Home hero">
      {/* Left: Live TV + Latest News */}
      <NewsColumnStack>
        <LiveTvPanel />
        <Services magazineType="magazine" />
      </NewsColumnStack>

      {/* Middle: Magazine hero */}
      <HeroRoot
        aria-label="Featured content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <HeroBackground aria-hidden="true" src={heroData.image} />
        <HeroOverlay aria-hidden="true" />
        <HeroContent>
          <HeroTitle className="text-balance" $isKannada={language === "Kannada"}>
            {translations.magazine[language] || translations.magazine.English}
          </HeroTitle>
          <HeroCta
            as={Link}
            to={heroData.link}
            aria-label={`${translations.viewButton[language]} - ${
              translations.magazine[language] || translations.magazine.English
            }`}
          >
            {translations.viewButton[language] ||
              translations.viewButton.English}
          </HeroCta>
        </HeroContent>
      </HeroRoot>

      {/* Right: Hero Shorts */}
      <HeroShortVideos />
    </HeroLayout>
  );
}

