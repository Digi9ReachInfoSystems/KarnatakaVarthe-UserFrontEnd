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
  HeroSubtitle,
  HeroCta,
  ArrowButton,
  ArrowControls,
} from "./Varthahero.styles.js";
import LatestNotification from "./LatestNotification.jsx";

export default function Varthahero({
  title = "Latest Vartha Janapada Magazines",
  subtitle = "",
  ctaLabel = "View",
  href = "#",
  imgSrc = "/home/home.png",
  notifications = [],
}) {
  const { language } = useContext(LanguageContext);

  const translations = {
    magazine: {
      Kannada: "ಇತ್ತೀಚಿನ ವಾರ್ತಾ ಜನಪದ ಮ್ಯಾಗಜೀನ್ಗಳು",
      English: "Latest Vartha Janapada Magazines",
      Hindi: "नवीनतम वार्ता जनपद पत्रिकाएं",
    },
    magazine2: {
      Kannada: "ಮಾರ್ಚ್ ಆಫ್ ಕರ್ನಾಟಕ ಮ್ಯಾಗಜೀನ್ಗಳು",
      English: "March of Karnataka Magazines",
      Hindi: "मार्च ऑफ कर्नाटक पत्रिकाएं",
    },
    viewButton: {
      Kannada: "ವೀಕ್ಷಿಸಿ",
      English: "View",
      Hindi: "देखें",
    },
  };

  const getTranslatedTitle = (magazineType) => {
    return (
      translations[magazineType][language] || translations[magazineType].English
    );
  };

  const carouselData = [
    {
      image: "/home/varthajanapada.png",
      magazineType: "magazine",
      subtitle: "",
      link: "/magazinesvartha",
    }
    // {
    //   image: "/state/state.jpg",
    //   magazineType: "magazine2",
    //   subtitle: "",
    //   link: "/marchofkarnatakmagzine",
    // },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselData.length - 1 : prev - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prev) =>
      prev === carouselData.length - 1 ? 0 : prev + 1
    );
  };

  // Swipe handling
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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextClick();
    }
    if (isRightSwipe) {
      handlePrevClick();
    }
  };

  return (
    <HeroLayout aria-label="Home hero">
      {/* Left: Image hero */}
      <HeroRoot
        aria-label="Featured content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <HeroBackground
          aria-hidden="true"
          src={carouselData[currentImageIndex].image}
        />
        <HeroOverlay aria-hidden="true" />
        {/* <ArrowControls>
          <ArrowButton onClick={handlePrevClick} aria-label="Previous magazine">
            <span aria-hidden="true">&#10094;</span>
          </ArrowButton>
          <ArrowButton onClick={handleNextClick} aria-label="Next magazine">
            <span aria-hidden="true">&#10095;</span>
          </ArrowButton>
        </ArrowControls> */}
        <HeroContent>
          <HeroTitle className="text-balance">
            {getTranslatedTitle(carouselData[currentImageIndex].magazineType)}
          </HeroTitle>
          {carouselData[currentImageIndex].subtitle ? (
            <HeroSubtitle className="text-pretty">
              {carouselData[currentImageIndex].subtitle}
            </HeroSubtitle>
          ) : null}
          <HeroCta
            as={Link}
            to={carouselData[currentImageIndex].link}
            aria-label={`${
              translations.viewButton[language]
            } - ${getTranslatedTitle(
              carouselData[currentImageIndex].magazineType
            )}`}
          >
            {translations.viewButton[language]}
          </HeroCta>
        </HeroContent>
      </HeroRoot>

      {/* Right: Latest notifications */}
      <LatestNotification notifications={notifications} />
    </HeroLayout>
  );
}
