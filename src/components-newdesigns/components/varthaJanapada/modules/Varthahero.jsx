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
import LatestNotification from "./LatestNotification.jsx";
import Services from "./servicess/Services.jsx";

export default function Varthahero({ notifications = [] }) {
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
    image: "/home/varthajanapada.png",
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
      {/* Left: Hero Content */}
      <Services />

      {/* Middle: Services */}
      <HeroRoot
        aria-label="Featured content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <HeroBackground aria-hidden="true" src={heroData.image} />
        <HeroOverlay aria-hidden="true" />
        <HeroContent>
          <HeroTitle className="text-balance">
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

      {/* Right: Latest Notifications */}
      <LatestNotification notifications={notifications} />
    </HeroLayout>
  );
}

