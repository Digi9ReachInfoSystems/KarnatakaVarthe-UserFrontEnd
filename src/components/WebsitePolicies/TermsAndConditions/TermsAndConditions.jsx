import React, { useContext } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalText,
  CloseButton
} from "./TermsAndConditions.styles";
import { LanguageContext } from "../../../context/LanguageContext";

const TermsAndConditions = ({ onClose }) => {
  const { language } = useContext(LanguageContext);

  // Translation variables
  let modalTitle = "";
  let closeButtonText = "";
  let termsContent = [];

  if (language === "English") {
    modalTitle = "Terms & Conditions";
    closeButtonText = "Close";
    termsContent = [
      "1) This website is designed, developed and maintained by Government Of Karnataka, Government of India.",
      "2) Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department(s) and/or other source(s), and to obtain appropriate professional advice.",
      "3) Under no circumstances will this Department be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this website.",
      "4) These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the jurisdiction of the courts of India.",
      "5) The information posted on this website could include hypertext links or pointers to information created and maintained by non-Government/private organisations. Government Of Karnataka is providing these links and pointers solely for your information and convenience. When you select a link to an outside website, you are leaving the Government of Karnataka website and are subject to the privacy and security policies of the owners/sponsors of the outside website.",
      "6) (Name of Department) does not guarantee the availability of such linked pages at all times.",
      "7) (Name of Department) cannot authorise the use of copyrighted materials contained in linked websites. Users are advised to request such authorisation from the owner of the linked website.",
      "8) (Name of Department) does not guarantee that linked websites comply with Indian Government Web Guidelines."
    ];
  } else if (language === "Hindi") {
    modalTitle = "नियम एवं शर्तें";
    closeButtonText = "बंद करें";
    termsContent = [
      "1) इस वेबसाइट का डिजाइन, विकास और रखरखाव भारत सरकार, कर्नाटक सरकार द्वारा किया गया है।",
      "2) हालांकि इस वेबसाइट पर सामग्री की सटीकता और अद्ययता सुनिश्चित करने के लिए सभी प्रयास किए गए हैं, इसे कानून के किसी बयान के रूप में नहीं लिया जाना चाहिए या किसी कानूनी उद्देश्य के लिए उपयोग नहीं किया जाना चाहिए। किसी भी अस्पष्टता या संदेह की स्थिति में, उपयोगकर्ताओं को विभागों और/या अन्य स्रोतों से सत्यापित/जांच करने और उचित पेशेवर सलाह प्राप्त करने की सलाह दी जाती है।",
      "3) किसी भी परिस्थिति में यह विभाग किसी भी खर्च, हानि या क्षति के लिए उत्तरदायी नहीं होगा, जिसमें सीमा के बिना अप्रत्यक्ष या परिणामी हानि या क्षति शामिल है, या इस वेबसाइट के उपयोग से, या डेटा के उपयोग या हानि से उत्पन्न होने वाली कोई भी खर्च, हानि या क्षति।",
      "4) इन नियमों और शर्तों को भारतीय कानूनों द्वारा शासित और समझा जाएगा। इन नियमों और शर्तों के तहत उत्पन्न होने वाले किसी भी विवाद को भारत की अदालतों के अधिकार क्षेत्र में लाया जाएगा।",
      "5) इस वेबसाइट पर पोस्ट की गई जानकारी में गैर-सरकारी/निजी संगठनों द्वारा बनाई और बनाए रखी गई जानकारी के लिए हाइपरटेक्स्ट लिंक या पॉइंटर शामिल हो सकते हैं। कर्नाटक सरकार इन लिंक और पॉइंटर को केवल आपकी जानकारी और सुविधा के लिए प्रदान कर रही है। जब आप किसी बाहरी वेबसाइट का लिंक चुनते हैं, तो आप कर्नाटक सरकार की वेबसाइट छोड़ रहे हैं और बाहरी वेबसाइट के मालिकों/प्रायोजकों की गोपनीयता और सुरक्षा नीतियों के अधीन हैं।",
      "6) (विभाग का नाम) ऐसी लिंक की गई पृष्ठों की किसी भी समय उपलब्धता की गारंटी नहीं देता।",
      "7) (विभाग का नाम) लिंक की गई वेबसाइटों में निहित कॉपीराइट सामग्री के उपयोग को अधिकृत नहीं कर सकता। उपयोगकर्ताओं को लिंक की गई वेबसाइट के मालिक से ऐसी अधिकृतता का अनुरोध करने की सलाह दी जाती है।",
      "8) (विभाग का नाम) गारंटी नहीं देता कि लिंक की गई वेबसाइटें भारतीय सरकार वेब दिशानिर्देशों का पालन करती हैं।"
    ];
  } else if (language === "Kannada") {
    modalTitle = "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು";
    closeButtonText = "ಮುಚ್ಚಿ";
    termsContent = [
      "1) ಈ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಕರ್ನಾಟಕ ಸರ್ಕಾರ, ಭಾರತ ಸರ್ಕಾರದಿಂದ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ, ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ ಮತ್ತು ನಿರ್ವಹಿಸಲಾಗುತ್ತಿದೆ.",
      "2) ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿರುವ ವಿಷಯದ ನಿಖರತೆ ಮತ್ತು ಪ್ರಸ್ತುತತೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ಎಲ್ಲಾ ಪ್ರಯತ್ನಗಳನ್ನು ಮಾಡಲಾಗಿದ್ದರೂ, ಅದನ್ನು ಕಾನೂನಿನ ಹೇಳಿಕೆಯಾಗಿ ಅಥವಾ ಯಾವುದೇ ಕಾನೂನಿಕ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಬಳಸುವಂತೆ ಅರ್ಥೈಸಬಾರದು. ಯಾವುದೇ ಅಸ್ಪಷ್ಟತೆ ಅಥವಾ ಸಂದೇಹಗಳ ಸಂದರ್ಭದಲ್ಲಿ, ಬಳಕೆದಾರರಿಗೆ ಇಲಾಖೆಗಳೊಂದಿಗೆ ಮತ್ತು/ಅಥವಾ ಇತರ ಮೂಲಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಸೂಕ್ತ ವೃತ್ತಿಪರ ಸಲಹೆ ಪಡೆಯಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.",
      "3) ಯಾವುದೇ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಈ ಇಲಾಖೆ ಯಾವುದೇ ಖರ್ಚು, ನಷ್ಟ ಅಥವಾ ಹಾನಿಗೆ ಉತ್ತರದಾಯಿಯಾಗಿರುವುದಿಲ್ಲ, ಅದರಲ್ಲಿ ಮಿತಿಯಿಲ್ಲದೆ ಪರೋಕ್ಷ ಅಥವಾ ಪರಿಣಾಮಕಾರಿ ನಷ್ಟ ಅಥವಾ ಹಾನಿ ಅಥವಾ ಈ ವೆಬ್‌ಸೈಟ್‌ನ ಬಳಕೆಯಿಂದ, ಅಥವಾ ಡೇಟಾದ ಬಳಕೆ ಅಥವಾ ನಷ್ಟದಿಂದ ಉತ್ಪನ್ನವಾಗುವ ಯಾವುದೇ ಖರ್ಚು, ನಷ್ಟ ಅಥವಾ ಹಾನಿ.",
      "4) ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಭಾರತೀಯ ಕಾನೂನುಗಳಿಂದ ಆಳ್ವಿಕೆ ಮತ್ತು ಅರ್ಥೈಸಲಾಗುತ್ತದೆ. ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳ ಅಡಿಯಲ್ಲಿ ಉತ್ಪನ್ನವಾಗುವ ಯಾವುದೇ ವಿವಾದವನ್ನು ಭಾರತದ ನ್ಯಾಯಾಲಯಗಳ ಅಧಿಕಾರ ವಲಯಕ್ಕೆ ಒಳಪಡಿಸಲಾಗುತ್ತದೆ.",
      "5) ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪೋಸ್ಟ್ ಮಾಡಲಾದ ಮಾಹಿತಿಯು ಸರ್ಕಾರೇತರ/ಖಾಸಗಿ ಸಂಸ್ಥೆಗಳಿಂದ ರಚಿಸಲಾದ ಮತ್ತು ನಿರ್ವಹಿಸಲಾದ ಮಾಹಿತಿಗೆ ಹೈಪರ್‌ಟೆಕ್ಸ್ಟ್ ಲಿಂಕ್‌ಗಳು ಅಥವಾ ಪಾಯಿಂಟರ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿರಬಹುದು. ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಈ ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಪಾಯಿಂಟರ್‌ಗಳನ್ನು ಕೇವಲ ನಿಮ್ಮ ಮಾಹಿತಿಗಾಗಿ ಮತ್ತು ಅನುಕೂಲಕ್ಕಾಗಿ ಒದಗಿಸುತ್ತಿದೆ. ನೀವು ಬಾಹ್ಯ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಲಿಂಕ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿದಾಗ, ನೀವು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ತೊರೆಯುತ್ತೀರಿ ಮತ್ತು ಬಾಹ್ಯ ವೆಬ್‌ಸೈಟ್‌ನ ಮಾಲಿಕರು/ಪ್ರಾಯೋಜಕರ ಗೌಪ್ಯತೆ ಮತ್ತು ಭದ್ರತಾ ನೀತಿಗಳಿಗೆ ಒಳಪಡಿಸಲಾಗುತ್ತೀರಿ.",
      "6) (ಇಲಾಖೆಯ ಹೆಸರು) ಅಂತಹ ಲಿಂಕ್ ಮಾಡಲಾದ ಪುಟಗಳ ಯಾವುದೇ ಸಮಯದ ಲಭ್ಯತೆಯನ್ನು ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ.",
      "7) (ಇಲಾಖೆಯ ಹೆಸರು) ಲಿಂಕ್ ಮಾಡಲಾದ ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ಅಡಕವಾದ ಕಾಪಿರೈಟ್ ವಸ್ತುಗಳ ಬಳಕೆಯನ್ನು ಅಧಿಕೃತಗೊಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಬಳಕೆದಾರರಿಗೆ ಲಿಂಕ್ ಮಾಡಲಾದ ವೆಬ್‌ಸೈಟ್‌ನ ಮಾಲಿಕರಿಂದ ಅಂತಹ ಅಧಿಕೃತತೆಯನ್ನು ಕೋರಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.",
      "8) (ಇಲಾಖೆಯ ಹೆಸರು) ಲಿಂಕ್ ಮಾಡಲಾದ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಭಾರತೀಯ ಸರ್ಕಾರದ ವೆಬ್ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಪಾಲಿಸುತ್ತವೆ ಎಂದು ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ."
    ];
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalText>
            {termsContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </ModalText>
          <CloseButton onClick={onClose}>{closeButtonText}</CloseButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};
export default TermsAndConditions;
