
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { LanguageContext } from '../../../../../context/LanguageContext.jsx'

import {
    HeroLayout,
    HeroRoot,
    HeroBackground,
    HeroContent,
    HeroTitle,

    HeroCta,

} from "./MarchOfKarnatakaHero.styles.js"
import LatestNotification from '../../../varthaJanapada/modules/LatestNotification.jsx'
import { m } from 'framer-motion'
import Services from '../../../varthaJanapada/modules/servicess/Services.jsx'

function MarchOfKarnatakaHero( {notifications = []} ) {
    const { language } = useContext(LanguageContext);
    const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
    const translations = {
        magazine: {
          Kannada: "ಮಾರ್ಚ್ ಆಫ್ ಕರ್ನಾಟಕ ಮ್ಯಾಗಜೀನ್ಗಳು",
          English: "March of Karnataka Magazines",
          Hindi: "मार्च ऑफ कर्नाटक पत्रिकाएं"
        },

        viewButton: {
          Kannada: "ವೀಕ್ಷಿಸಿ",
          English: "View",
          Hindi: "देखें"
        }
    }

    const getTranslatedTitle = (magazineType) => {
        return translations[magazineType][language] || translations[magazineType].English;
    };
    const carouselData = [

      {
        image: "MarchOfkarnataka/newimage2.png",
        magazineType: "magazine2",
        subtitle: "",
        link: "/marchofkarnatakmagzine"
      }
    ];
 

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
   <HeroLayout aria label="March of Karnataka Hero Section">
          {/* Left: Hero Content */}
    <Services />
    <HeroRoot aria-label="Featured magazines"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <HeroBackground src={`/${carouselData[0].image}`} />

                        <HeroContent>
                          <HeroTitle className="text-balance">
                            {getTranslatedTitle("magazine")}
                          </HeroTitle>
                          <HeroCta as={Link} to="/marchofkarnatakmagzine" aria-label={`${translations.viewButton[language]} - ${getTranslatedTitle("magazine")}`}>
                            {translations.viewButton[language]}
                          </HeroCta>
                        </HeroContent>
    </HeroRoot>
          {/* Right: Latest notifications */}
          <LatestNotification notifications={notifications} />
    </HeroLayout>
  )
}

export default MarchOfKarnatakaHero
