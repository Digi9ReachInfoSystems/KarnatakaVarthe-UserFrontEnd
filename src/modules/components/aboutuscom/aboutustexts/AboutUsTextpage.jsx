import { useContext } from "react";
import { Container, Title, Paragraph } from "../aboutustexts/AboutUstextpage.styles";
import { FontSizeContext } from "../../../../context/FontSizeProvider";
import { LanguageContext } from "../../../../context/LanguageContext";

// Translation object for English, Hindi, and Kannada
const translations = {
  English: {
    title: "Department of Information and Public Relations (DIPR), Karnataka",
    paragraph1:
      "The Department of Information and Public Relations (DIPR), Karnataka, is a vital arm of the state government responsible for disseminating information about government policies, programs, and initiatives to the public. It acts as a bridge between the government and the citizens, ensuring transparency and effective communication.",
    paragraph2:
      "The DIPR Karnataka plays a crucial role in promoting government schemes, organizing press conferences, and managing media relations. It also produces and distributes informational materials such as brochures, pamphlets, and videos to educate the public about various government initiatives.",
    paragraph3:
      "The department utilizes modern communication tools, including social media platforms, to reach a wider audience. It also organizes public awareness campaigns, cultural events, and exhibitions to engage with citizens and keep them informed about the government's work.",
  },
  Hindi: {
    title: "सूचना एवं जनसंपर्क विभाग (डीआईपीआर), कर्नाटक",
    paragraph1:
      "सूचना एवं जनसंपर्क विभाग (डीआईपीआर), कर्नाटक, राज्य सरकार का एक महत्वपूर्ण हिस्सा है जो सरकारी नीतियों, कार्यक्रमों और पहलों के बारे में जनता को जानकारी प्रदान करने के लिए जिम्मेदार है। यह सरकार और नागरिकों के बीच एक सेतु का काम करता है, जो पारदर्शिता और प्रभावी संचार सुनिश्चित करता है।",
    paragraph2:
      "डीआईपीआर कर्नाटक सरकारी योजनाओं को प्रचारित करने, प्रेस कॉन्फ्रेंस आयोजित करने और मीडिया संबंधों को प्रबंधित करने में महत्वपूर्ण भूमिका निभाता है। यह जनता को विभिन्न सरकारी पहलों के बारे में शिक्षित करने के लिए ब्रोशर, पैम्फलेट और वीडियो जैसी सूचनात्मक सामग्री भी तैयार करता है और वितरित करता है।",
    paragraph3:
      "विभाग सोशल मीडिया प्लेटफॉर्म सहित आधुनिक संचार उपकरणों का उपयोग करता है ताकि व्यापक दर्शकों तक पहुंचा जा सके। यह जन जागरूकता अभियान, सांस्कृतिक कार्यक्रम और प्रदर्शनियों का आयोजन भी करता है ताकि नागरिकों के साथ जुड़ा जा सके और उन्हें सरकार के काम के बारे में सूचित रखा जा सके।",
  },
  Kannada: {
    title: "ಮಾಹಿತಿ ಮತ್ತು ಜನಸಂಪರ್ಕ ಇಲಾಖೆ (ಡಿಐಪಿಆರ್), ಕರ್ನಾಟಕ",
    paragraph1:
      "ಮಾಹಿತಿ ಮತ್ತು ಜನಸಂಪರ್ಕ ಇಲಾಖೆ (ಡಿಐಪಿಆರ್), ಕರ್ನಾಟಕ, ರಾಜ್ಯ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಅಂಗವಾಗಿದ್ದು, ಸರ್ಕಾರಿ ನೀತಿಗಳು, ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಜನರಿಗೆ ಮಾಹಿತಿ ನೀಡುವ ಜವಾಬ್ದಾರಿಯನ್ನು ಹೊಂದಿದೆ. ಇದು ಸರ್ಕಾರ ಮತ್ತು ನಾಗರಿಕರ ನಡುವೆ ಸೇತುವೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಸಂವಹನವನ್ನು ಖಾತ್ರಿಪಡಿಸುತ್ತದೆ.",
    paragraph2:
      "ಡಿಐಪಿಆರ್ ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಪ್ರಚಾರ ಮಾಡುವುದು, ಪತ್ರಿಕಾ ಸಮ್ಮೇಳನಗಳನ್ನು ಆಯೋಜಿಸುವುದು ಮತ್ತು ಮಾಧ್ಯಮ ಸಂಬಂಧಗಳನ್ನು ನಿರ್ವಹಿಸುವುದರಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸುತ್ತದೆ. ಇದು ಬ್ರೋಶರ್, ಪ್ಯಾಮ್ಫ್ಲೆಟ್ ಮತ್ತು ವೀಡಿಯೊಗಳಂತಹ ಮಾಹಿತಿ ಸಾಮಗ್ರಿಗಳನ್ನು ತಯಾರಿಸುತ್ತದೆ ಮತ್ತು ವಿತರಿಸುತ್ತದೆ, ಇದರಿಂದ ಜನರು ವಿವಿಧ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳುತ್ತಾರೆ.",
    paragraph3:
      "ಇಲಾಖೆಯು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ವೇದಿಕೆಗಳನ್ನು ಒಳಗೊಂಡ ಆಧುನಿಕ ಸಂವಹನ ಸಾಧನಗಳನ್ನು ಬಳಸುತ್ತದೆ, ಇದರಿಂದ ಹೆಚ್ಚಿನ ಪ್ರೇಕ್ಷಕರನ್ನು ತಲುಪಬಹುದು. ಇದು ಜನರ ಜಾಗೃತಿ ಅಭಿಯಾನಗಳು, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಪ್ರದರ್ಶನಗಳನ್ನು ಆಯೋಜಿಸುತ್ತದೆ, ಇದರಿಂದ ನಾಗರಿಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಮತ್ತು ಸರ್ಕಾರದ ಕೆಲಸದ ಬಗ್ಗೆ ಅವರನ್ನು ತಿಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
  },
};

const AboutUsText = () => {
  const { fontSize = 100 } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);

  // Get translations for the current language
  const t = translations[language] || translations.English;

  return (
    <Container 
      role="region" 
      aria-label={language === 'Hindi' ? 'हमारे बारे में जानकारी' : 
                  language === 'Kannada' ? 'ನಮ್ಮ ಬಗ್ಗೆ ಮಾಹಿತಿ' : 
                  'About us information'}
    >
      <Title 
        style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
        tabIndex="0" // Make title focusable for screen readers
      >
        {t.title}
      </Title>
      <Paragraph 
        style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
        tabIndex="0"
      >
        {t.paragraph1}
      </Paragraph>
      <Paragraph 
        style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
        tabIndex="0"
      >
        {t.paragraph2}
      </Paragraph>
      <Paragraph 
        style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
        tabIndex="0"
      >
        {t.paragraph3}
      </Paragraph>
    </Container>
  );
};

export default AboutUsText;