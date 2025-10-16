import React, { useContext } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalText,
  CloseButton,
} from "./CopyrightPolicy.styles.js";
import { LanguageContext } from "../../../context/LanguageContext";

const CopyrightPolicy = ({ onClose }) => {
  const { language } = useContext(LanguageContext);
  let copyrightText = "";
  let modalTitle = "";
  let closeButtonText = "";

  if (language === "English") {
    copyrightText = `
      Material featured on this site may be reproduced free of charge in any format or media
      without requiring specific permission, provided it is accurate and not misleading.
      The source must be acknowledged. Third-party material requires separate permission.
    `;
    modalTitle = "Copyright Policy";
    closeButtonText = "Close";
  } else if (language === "Hindi") {
    copyrightText = `
    इस साइट पर प्रदर्शित सामग्री को विशिष्ट अनुमति की आवश्यकता के बिना किसी भी प्रारूप या मीडिया में निः शुल्क पुनः प्रस्तुत किया जा सकता है, बशर्ते कि यह सटीक हो और भ्रामक न हो। स्रोत को स्वीकार किया जाना चाहिए। तीसरे पक्ष की सामग्री के लिए अलग से अनुमति की आवश्यकता होती है।
    `;
    modalTitle = "कॉपीराइट नीति";
    closeButtonText = "बंद करें";
  } else if (language === "Kannada") {
    copyrightText = `
     ಈ ಸೈಟ್ನಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡಿರುವ ವಿಷಯವನ್ನು ಯಾವುದೇ ರೂಪದಲ್ಲಿ ಅಥವಾ ಮಾಧ್ಯಮದಲ್ಲಿ ನಿರ್ದಿಷ್ಟ ಅನುಮತಿಯ ಅಗತ್ಯವಿಲ್ಲದೇ ಉಚಿತವಾಗಿ ಪುನರುತ್ಪಾದಿಸಬಹುದು, ಅದು ನಿಖರವಾಗಿದೆ ಮತ್ತು ದಾರಿತಪ್ಪಿಸುವುದಿಲ್ಲ. ಮೂಲವನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಬೇಕು. ಮೂರನೇ ವ್ಯಕ್ತಿಯ ವಸ್ತುಗಳಿಗೆ ಪ್ರತ್ಯೇಕ ಅನುಮತಿಯ ಅಗತ್ಯವಿದೆ.
    `;
    modalTitle = "ಕಾಪಿರೈಟ್ ನೀತಿ";
    closeButtonText = "ಮುಚ್ಚಿ";
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalText>
            <p>{copyrightText}</p>
          </ModalText>
          <CloseButton onClick={onClose}>{closeButtonText}</CloseButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CopyrightPolicy;
