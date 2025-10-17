
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { LanguageContext } from '../../../../../context/LanguageContext.jsx'

import {
    HeroLayout,
    HeroRoot,
    HeroBackground,
    HeroOverlay,
    HeroContent,
    HeroTitle,
    HeroSubtitle,
    HeroCta,

} from "./MarchOfKarnatakaHero.styles.js"
import LatestNotification from '../../../varthaJanapada/modules/LatestNotification.jsx'
import { m } from 'framer-motion'

function MarchOfKarnatakaHero( {notifications = []} ) {
    const { language } = useContext(LanguageContext);
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
        image: "MarchOfkarnataka/MOK.png",
        magazineType: "magazine2",
        subtitle: "",
        link: "/marchofkarnatakmagzine"
      }
    ];

  return (
   <HeroLayout aria label="March of Karnataka Hero Section">
    <HeroRoot aria-label="Featured Magazines">
        <HeroBackground src={`/${carouselData[0].image}`} />
        <HeroOverlay aria-hidden="true" />

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
