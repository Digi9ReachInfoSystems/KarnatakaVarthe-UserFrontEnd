import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";
import {
  HeroLayout,
  MagazinePair,
  MagazineCard,
  MagazineCover,
  MagazineFooter,
  MagazineCta,
} from "./Varthahero.styles.js";
import HeroShortVideos from "./heroshorts/HeroShortVideos.jsx";
import Services from "./servicess/Services.jsx";
import LiveTvPanel from "./liveTv/LiveTvPanel.jsx";
import { NewsColumnStack } from "./liveTv/LiveTvPanel.styles.js";

const MAGAZINE_CARDS = [
  {
    id: "vartha",
    image: "/new-magzinesimages/vartha-aug.jpeg",
    link: "/magazinesvartha",
    labels: {
      English: "Vartha Janapada Magazines",
      Kannada: "ವಾರ್ತಾ ಜನಪದ ಮ್ಯಾಗಜೀನ್‌ಗಳು",
      Hindi: "वार्ता जनपद पत्रिकाएँ",
    },
  },
  {
    id: "march",
    image: "/new-magzinesimages/mok-aug.jpeg",
    link: "/marchofkarnatakmagzine",
    labels: {
      English: "March of Karnataka Magazines",
      Kannada: "ಮಾರ್ಚ್ ಆಫ್ ಕರ್ನಾಟಕ ಮ್ಯಾಗಜೀನ್‌ಗಳು",
      Hindi: "मार्च ऑफ कर्नाटक पत्रिकाएँ",
    },
  },
];

export default function Varthahero() {
  const { language } = useContext(LanguageContext);
  const textClass =
    language === "Kannada" || language === "Hindi" ? "kannada-text" : "";

  return (
    <HeroLayout aria-label="Home hero">
      <NewsColumnStack>
        <LiveTvPanel />
        <Services magazineType="magazine" />
      </NewsColumnStack>

      <MagazinePair aria-label="Featured magazines">
        {MAGAZINE_CARDS.map((card) => {
          const label = card.labels[language] || card.labels.English;
          return (
            <MagazineCard key={card.id}>
              <MagazineCover
                $src={card.image}
                role="img"
                aria-label={label}
              />
              <MagazineFooter>
                <MagazineCta
                  as={Link}
                  to={card.link}
                  className={textClass}
                  aria-label={label}
                >
                  {label}
                </MagazineCta>
              </MagazineFooter>
            </MagazineCard>
          );
        })}
      </MagazinePair>

      <HeroShortVideos />
    </HeroLayout>
  );
}
