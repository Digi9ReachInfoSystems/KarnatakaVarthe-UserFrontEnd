import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import {
  getMagazines,
  MarchMagazines,
} from "../../../../services/magazineApi/magazineService.js";
import { getLatestMagazineThumbnail } from "../../../../services/magazineApi/latestMagazineCover.js";

const MAGAZINE_CARDS = [
  {
    id: "vartha",
    link: "/magazinesvartha",
    labels: {
      English: "Vartha Janapada Magazines",
      Kannada: "ವಾರ್ತಾ ಜನಪದ ಮ್ಯಾಗಜೀನ್‌ಗಳು",
      Hindi: "वार्ता जनपद पत्रिकाएँ",
    },
  },
  {
    id: "march",
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
  const [coverImages, setCoverImages] = useState({
    vartha: "",
    march: "",
  });

  useEffect(() => {
    let cancelled = false;

    const loadCovers = async () => {
      try {
        const [varthaRes, marchRes] = await Promise.all([
          getMagazines(),
          MarchMagazines(),
        ]);

        if (cancelled) return;

        setCoverImages({
          vartha: getLatestMagazineThumbnail(varthaRes?.data) || "",
          march: getLatestMagazineThumbnail(marchRes?.data) || "",
        });
      } catch (error) {
        console.error("Error loading latest magazine covers:", error);
      }
    };

    loadCovers();
    return () => {
      cancelled = true;
    };
  }, []);

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
                $src={coverImages[card.id]}
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
