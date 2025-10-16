import React, { useContext } from "react";
import {
  Wrapper,
  Title,
  CardsContainer,
  GuidelineCard,
  GuidelineTitle,
  GuidelineImage,
  GuidelineActions,
  Button
} from "./Guidelines.styles";
import { LanguageContext } from "../../../context/LanguageContext";

const Guidelines = () => {
  const { language } = useContext(LanguageContext);

  // Translation variables
  let pageTitle = "";
  let downloadText = "";
  let viewText = "";
  let cardTitles = [];

  if (language === "English") {
    pageTitle = "Guidelines";
    downloadText = "Download";
    viewText = "View";
    cardTitles = [
      "G.I.G.W Guidelines",
      "Kannada Development Authority Recommendations",
      "Accessibility Guidelines"
    ];
  } else if (language === "Hindi") {
    pageTitle = "दिशानिर्देश";
    downloadText = "डाउनलोड";
    viewText = "देखें";
    cardTitles = [
      "जीआईजीडब्ल्यू दिशानिर्देश",
      "कन्नड़ विकास प्राधिकरण की सिफारिशें",
      "सुलभता दिशानिर्देश"
    ];
  } else if (language === "Kannada") {
    pageTitle = "ಮಾರ್ಗದರ್ಶಿಗಳು";
    downloadText = "ಡೌನ್‌ಲೋಡ್";
    viewText = "ವೀಕ್ಷಿಸಿ";
    cardTitles = [
      "ಜಿಐಜಿಡಬ್ಲ್ಯೂ ಮಾರ್ಗದರ್ಶಿಗಳು",
      "ಕನ್ನಡ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರದ ಶಿಫಾರಸುಗಳು",
      "ನಿಲುಕಣೆ ಮಾರ್ಗದರ್ಶಿಗಳು"
    ];
  }

  const cards = [
    {
      title: cardTitles[0] || "G.I.G.W Guidelines",
      img: "/guidelines/GIGW.jpg",
      download: "/guidelines/guidelinepdf/https___karnataka.gov.in_frontend_opt1_pdfs_gigw-guidelines-pages.pdf",
      view: "/guidelines/guidelinepdf/https___karnataka.gov.in_frontend_opt1_pdfs_gigw-guidelines-pages.pdf",
      downloadFileName: "GIGW-Guidelines.pdf"
    },
    {
      title: cardTitles[1] || "Kannada Development Authority Recommendations",
      img: "/guidelines/kannada_abhivrudhi_pradikar.jpg",
      download: "/guidelines/guidelinepdf/https___karnataka.gov.in_frontend_opt1_pdfs_ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಜಾಲತಾಣದಲ್ಲಿ ಕನ್ನಡ ಬಳಕೆ.pdf",
      view: "/guidelines/guidelinepdf/https___karnataka.gov.in_frontend_opt1_pdfs_ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಜಾಲತಾಣದಲ್ಲಿ ಕನ್ನಡ ಬಳಕೆ.pdf",
      downloadFileName: "Kannada-Development-Authority-Recommendations.pdf"
    },
    {
      title: cardTitles[2] || "Accessibility Guidelines",
      img: "/guidelines/accesibility1.jpg",
      download: "/guidelines/guidelinepdf/https___karnataka.gov.in_frontend_opt1_pdfs_accesibility_guidelines-converted.pdf",
      view: "/guidelines/guidelinepdf/https___karnataka.gov.in_frontend_opt1_pdfs_accesibility_guidelines-converted.pdf",
      downloadFileName: "Accessibility-Guidelines.pdf"
    },
  ];
  return (
    <Wrapper>
      <Title>{pageTitle}</Title>
      <CardsContainer>
        {cards.map((card, idx) => (
          <GuidelineCard key={idx}>
            <GuidelineTitle>{card.title}</GuidelineTitle>
            <GuidelineImage src={card.img} alt={card.title} />
            <GuidelineActions>
              <Button
                href={card.download}
                download={card.downloadFileName}
                target="_blank"
              >
                {downloadText}
              </Button>
              <Button
                href={card.view}
                target="_blank"
              >
                {viewText}
              </Button>
            </GuidelineActions>
          </GuidelineCard>
        ))}
      </CardsContainer>
    </Wrapper>
  );
};
export default Guidelines;