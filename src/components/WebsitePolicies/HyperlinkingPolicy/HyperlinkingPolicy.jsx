import React, { useContext } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalText,
  CloseButton
} from "./HyperlinkingPolicy.styles";
import { LanguageContext } from "../../../context/LanguageContext";

const HyperlinkingPolicy = ({ onClose }) => {
  const { language } = useContext(LanguageContext);
  let hyperlinkingText = "";
  let modalTitle = "";
  let closeButtonText = "";

  if (language === "English") {
    hyperlinkingText = `
     We do not object to you linking directly to the information that is hosted on our site and no prior permission is required for the same. However, we would like you to inform us about any links provided to our site so that you can be informed of any changes or updations therein. Also, we do not permit our pages to be loaded into frames on your site. Our Department's pages must load into a newly opened browser window of the user.
    `;
    modalTitle = "Hyperlinking Policy";
    closeButtonText = "Close";
  } else if (language === "Hindi") {
    hyperlinkingText = `
    हम आपको हमारी साइट पर दी गई जानकारी से सीधे जोड़ने पर आपत्ति नहीं करते हैं और इसके लिए किसी पूर्व अनुमति की आवश्यकता नहीं है। हालाँकि, हम चाहेंगे कि आप हमें हमारी साइट पर प्रदान किए गए किसी भी लिंक के बारे में सूचित करें ताकि आपको उसमें किसी भी बदलाव या अद्यतन के बारे में सूचित किया जा सके। इसके अलावा, हम अपने पृष्ठों को आपकी साइट पर फ्रेम में लोड करने की अनुमति नहीं देते हैं। हमारे विभाग के पृष्ठों को उपयोगकर्ता की एक नई खोली गई ब्राउज़र विंडो में लोड होना चाहिए।
    `;
    modalTitle = "हाइपरलिंकिंग नीति";
    closeButtonText = "बंद करें";
  } else if (language === "Kannada") {
    hyperlinkingText = `
    ನಮ್ಮ ಸೈಟ್ನಲ್ಲಿ ಹೋಸ್ಟ್ ಮಾಡಲಾದ ಮಾಹಿತಿಗೆ ನೀವು ನೇರವಾಗಿ ಲಿಂಕ್ ಮಾಡುವುದನ್ನು ನಾವು ಆಕ್ಷೇಪಿಸುವುದಿಲ್ಲ ಮತ್ತು ಅದಕ್ಕೆ ಯಾವುದೇ ಪೂರ್ವಾನುಮತಿ ಅಗತ್ಯವಿಲ್ಲ. ಆದಾಗ್ಯೂ, ನಮ್ಮ ಸೈಟ್ಗೆ ಒದಗಿಸಲಾದ ಯಾವುದೇ ಲಿಂಕ್ಗಳ ಬಗ್ಗೆ ನೀವು ನಮಗೆ ತಿಳಿಸಬೇಕೆಂದು ನಾವು ಬಯಸುತ್ತೇವೆ, ಇದರಿಂದಾಗಿ ಅದರಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆಗಳು ಅಥವಾ ನವೀಕರಣಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ತಿಳಿಸಬಹುದು. ಅಲ್ಲದೆ, ನಮ್ಮ ಪುಟಗಳನ್ನು ನಿಮ್ಮ ಸೈಟ್ನ ಚೌಕಟ್ಟುಗಳಲ್ಲಿ ಲೋಡ್ ಮಾಡಲು ನಾವು ಅನುಮತಿಸುವುದಿಲ್ಲ. ನಮ್ಮ ಇಲಾಖೆಯ ಪುಟಗಳು ಬಳಕೆದಾರರ ಹೊಸದಾಗಿ ತೆರೆಯಲಾದ ಬ್ರೌಸರ್ ವಿಂಡೋಗೆ ಲೋಡ್ ಆಗಬೇಕು.
    `;
    modalTitle = "ಹೈಪರ್‌ಲಿಂಕಿಂಗ್ ನೀತಿ";
    closeButtonText = "ಮುಚ್ಚಿ";
  }
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalText>
            <p>
              {hyperlinkingText}
            </p>
          </ModalText>
          <CloseButton onClick={onClose}>{closeButtonText}</CloseButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};
export default HyperlinkingPolicy;
