import React, { useContext } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalText,
  CloseButton
} from "./SecurityPolicy.styles";
import { LanguageContext } from "../../../context/LanguageContext";

const SecurityPolicy = ({ onClose }) => {
  const { language } = useContext(LanguageContext);

  let securityText1 = "";
  let securityText2 = "";
  let securityText3 = "";
  let modalTitle = "";
  let closeButtonText = "";
  
  if (language === "English") {
    securityText1 = "For site security purposes and to ensure that this service remains available to all users, this Government computer system employs commercial software programs to monitor network traffic to identify unauthorized attempts to upload or change information, or otherwise cause damage.";
    securityText2 = "Except for authorized law enforcement investigations, no other attempts are made to identify individual users or their usage habits. Raw data logs are used for no other purposes and are scheduled for regular deletion.";
    securityText3 = "Unauthorized attempts to upload information or change information on this service are strictly prohibited and may be punishable under the Indian IT Act (2000).";
    modalTitle = "Security Policy";
    closeButtonText = "Close";
  } else if (language === "Hindi") {
    securityText1 = "साइट सुरक्षा उद्देश्यों के लिए और यह सुनिश्चित करने के लिए कि यह सेवा सभी उपयोगकर्ताओं के लिए उपलब्ध रहे, इस सरकारी कंप्यूटर सिस्टम में नेटवर्क ट्रैफिक की निगरानी करने के लिए व्यावसायिक सॉफ्टवेयर प्रोग्राम का उपयोग किया जाता है।";
    securityText2 = "अधिकृत कानून प्रवर्तन जांचों को छोड़कर, व्यक्तिगत उपयोगकर्ताओं या उनकी उपयोग आदतों की पहचान करने के लिए कोई अन्य प्रयास नहीं किए जाते हैं।";
    securityText3 = "इस सेवा पर जानकारी अपलोड करने या बदलने के अनधिकृत प्रयासों पर सख्त प्रतिबंध है और ये भारतीय आईटी अधिनियम (2000) के तहत दंडनीय हो सकते हैं।";
    modalTitle = "सुरक्षा नीति";
    closeButtonText = "बंद करें";
  } else if (language === "Kannada") {
    securityText1 = "ಸೈಟ್ ಭದ್ರತಾ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮತ್ತು ಈ ಸೇವೆಯು ಎಲ್ಲಾ ಬಳಕೆದಾರರಿಗೆ ಲಭ್ಯವಿರುವಂತೆ ಖಚಿತಪಡಿಸಲು, ಈ ಸರ್ಕಾರಿ ಕಂಪ್ಯೂಟರ್ ಸಿಸ್ಟಮ್ ಅನಧಿಕೃತ ಪ್ರಯತ್ನಗಳನ್ನು ಗುರುತಿಸಲು ನೆಟ್‌ವರ್ಕ್ ಟ್ರಾಫಿಕ್ ಅನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ವಾಣಿಜ್ಯಿಕ ಸಾಫ್ಟ್‌ವೇರ್ ಪ್ರೋಗ್ರಾಮ್‌ಗಳನ್ನು ನಿಯೋಗಿಸುತ್ತದೆ.";
    securityText2 = "ಅಧಿಕೃತ ಕಾನೂನು ಎನ್‌ಫೋರ್ಸ್‌ಮೆಂಟ್ ತನಿಖೆಗಳನ್ನು ಹೊರತುಪಡಿಸಿ, ವೈಯಕ್ತಿಕ ಬಳಕೆದಾರರನ್ನು ಅಥವಾ ಅವರ ಬಳಕೆಯ ಅಭ್ಯಾಸಗಳನ್ನು ಗುರುತಿಸಲು ಯಾವುದೇ ಇತರ ಪ್ರಯತ್ನಗಳು ಮಾಡಲಾಗುವುದಿಲ್ಲ.";
    securityText3 = "ಈ ಸೇವೆಯಲ್ಲಿ ಮಾಹಿತಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಅಥವಾ ಬದಲಾಯಿಸಲು ಅನಧಿಕೃತ ಪ್ರಯತ್ನಗಳು ಸ್ಖಾಲವಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ ಮತ್ತು ಇದು ಭಾರತದ ಐಟಿ ಕಾನೂನ್ (2000) ಅಡಿಯಲ್ಲಿ ದಂಡನೀಯವಾಗಬಹುದು.";
    modalTitle = "ಭದ್ರತಾ ನೀತಿ";
    closeButtonText = "ಮುಚ್ಚಿ";
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalText>
            <p>
              {securityText1}
            </p>
            <p>
              {securityText2}
            </p>
            <p>
              {securityText3}
            </p>
          </ModalText>
          <CloseButton onClick={onClose}>{closeButtonText}</CloseButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SecurityPolicy;
