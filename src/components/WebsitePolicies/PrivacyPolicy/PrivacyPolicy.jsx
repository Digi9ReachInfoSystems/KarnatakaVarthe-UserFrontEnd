import React, { useContext } from "react";
import { Title, Content, Wrapper } from "./PrivacyPolicy.styles";
import { LanguageContext } from "../../../context/LanguageContext";

const PrivacyPolicy = () => {
  const { language } = useContext(LanguageContext);

  // Translation variables
  let title = "";
  let mainContent = [];
  let cookiesTitle = "";
  let cookiesContent = [];
  let personalInfoTitle = "";
  let personalInfoContent = [];

  if (language === "English") {
    title = "Privacy Policy";
    mainContent = [
      "1) Thanks for visiting the website of the Government of Karnataka and reviewing our privacy policy.",
      "2) We collect no personal information, like names or addresses, when you visit our website. If you choose to provide that information to us, it is only used to fulfil your request for information.",
      "3) We do collect some technical information when you visit to make your visit seamless. The section below explains how we handle and collect technical information when you visit our website.",
      "4) Information collected and stored automatically.",
      "5) When you browse, read pages, or download information on this website, we automatically gather and store certain technical information about your visit.",
      "6) This information never identifies who you are. The information we collect and store about your visit is listed below:",
      "7) The Internet domain of your service provider (e.g. mtnl.net.in) and IP address (an IP address is a number that is automatically assigned to your computer whenever you are surfing the web) from which you access our website.",
      "8) The type of browser (such as Firefox, Netscape, or Internet Explorer) and operating system (Windows, Linux) used to access our site.",
      "9) The date and time you access our site.",
      "10) The pages/URLs you have visited, and if you reached this website from another website, the address of that referring website.",
      "11) This information is only used to help us make the site more useful for you. With this data, we learn about the number of visitors to our site and the types of technology our visitors use. We never track or record information about individuals and their visits."
    ];
    cookiesTitle = "Cookies";
    cookiesContent = [
      "When you visit some websites, they may download small pieces of software on your computer or browsing device known as cookies. Some cookies collect personal information to recognise your computer in the future. We only use non-persistent cookies or \"per-session cookies\". Per-session cookies serve technical purposes, like providing seamless navigation through this website. These cookies do not collect personal information on users and they are deleted as soon as you leave our website. The cookies do not permanently record data and they are not stored on your computer's hard drive. The cookies are stored in memory and are only available during an active browser session. Again, once you close your browser, the cookie disappears."
    ];
    personalInfoTitle = "If You Send Us Personal Information";
    personalInfoContent = [
      "We do not collect personal information for any purpose other than to respond to you (for example, to respond to your questions or provide subscriptions you have chosen). If you choose to provide us with personal information — like filling out a \"Contact Us\" form with an email address or postal address — and submitting it to us through the website, we use that information to respond to your message and to help you get the information you have requested.",
      "We only share the information you give us with another Government agency if your question relates to that agency, or as otherwise required by law. Our website never collects information or creates individual profiles for commercial marketing.",
      "While you must provide an email address for a localized response to any incoming questions or comments to us, we recommend that you do NOT include any other personal information."
    ];
  } else if (language === "Hindi") {
    title = "गोपनीयता नीति";
    mainContent = [
      "1) कर्नाटक सरकार की वेबसाइट पर आने और हमारी गोपनीयता नीति की समीक्षा करने के लिए धन्यवाद।",
      "2) जब आप हमारी वेबसाइट पर जाते हैं तो हम कोई व्यक्तिगत जानकारी जैसे नाम या पते एकत्र नहीं करते। यदि आप हमे वह जानकारी प्रदान करना चुनते हैं, तो यह केवल आपकी जानकारी के अनुरोध को पूरा करने के लिए उपयोग की जाती है।",
      "3) हम आपकी यात्रा को सहज बनाने के लिए कुछ तकनीकी जानकारी एकत्र करते हैं। नीचे दिया गया अनुभाग बताता है कि हम आपकी वेबसाइट पर यात्रा के दौरान तकनीकी जानकारी को कैसे संभालते और एकत्र करते हैं।",
      "4) स्वचालित रूप से एकत्रित और संग्रहीत जानकारी।",
      "5) जब आप इस वेबसाइट पर ब्राउज़ करते हैं, पृष्ठ पढ़ते हैं, या जानकारी डाउनलोड करते हैं, तो हम स्वचालित रूप से आपकी यात्रा के बारे में कुछ तकनीकी जानकारी एकत्र और संग्रहीत करते हैं।",
      "6) यह जानकारी कभी भी यह नहीं पहचानती कि आप कौन हैं। हम आपकी यात्रा के बारे में जो जानकारी एकत्र और संग्रहीत करते हैं वह नीचे सूचीबद्ध है:",
      "7) आपके सेवा प्रदाता का इंटरनेट डोमेन (उदाहरण के लिए mtnl.net.in) और IP पता (एक IP पता एक संख्या है जो आपके कंप्यूटर को स्वचालित रूप से सौंपी जाती है जब भी आप वेब पर सर्फिंग कर रहे होते हैं) जिससे आप हमारी वेबसाइट तक पहुंचते हैं।",
      "8) उस ब्राउज़र का प्रकार (जैसे Firefox, Netscape, या Internet Explorer) और ऑपरेटिंग सिस्टम (Windows, Linux) जिसका उपयोग आप हमारी साइट तक पहुंचने के लिए करते हैं।",
      "9) वह दिनांक और समय जब आप हमारी साइट तक पहुंचते हैं।",
      "10) वे पृष्ठ/URLs जिन्हें आपने देखा है, और यदि आप इस वेबसाइट पर किसी अन्य वेबसाइट से पहुंचे हैं, तो उस संदर्भित वेबसाइट का पता।",
      "11) यह जानकारी केवल आपके लिए साइट को अधिक उपयोगी बनाने में हमारी मदद करने के लिए उपयोग की जाती है। इस डेटा के साथ, हम अपनी साइट पर आने वाले आगंतुकों की संख्या और हमारे आगंतुकों द्वारा उपयोग की जाने वाली प्रौद्योगिकी के प्रकारों के बारे में सीखते हैं। हम कभी भी व्यक्तियों और उनकी यात्राओं के बारे में जानकारी ट्रैक या रिकॉर्ड नहीं करते।"
    ];
    cookiesTitle = "कुकीज़";
    cookiesContent = [
      "जब आप कुछ वेबसाइटों पर जाते हैं, तो वे आपके कंप्यूटर या ब्राउज़िंग डिवाइस पर कुकीज़ के रूप में जाने जाने वाले सॉफ़्टवेयर के छोटे टुकड़े डाउनलोड कर सकते हैं। कुछ कुकीज़ भविष्य में आपके कंप्यूटर को पहचानने के लिए व्यक्तिगत जानकारी एकत्र करती हैं। हम केवल गैर-स्थायी कुकीज़ या \"प्रति-सत्र कुकीज़\" का उपयोग करते हैं। प्रति-सत्र कुकीज़ तकनीकी उद्देश्यों की सेवा करते हैं, जैसे इस वेबसाइट के माध्यम से निर्बाध नेविगेशन प्रदान करना। ये कुकीज़ उपयोगकर्ताओं पर व्यक्तिगत जानकारी एकत्र नहीं करती हैं और जैसे ही आप हमारी वेबसाइट छोड़ देते हैं, उन्हें हटा दिया जाता है। कुकीज़ स्थायी रूप से डेटा रिकॉर्ड नहीं करती हैं और वे आपके कंप्यूटर की हार्ड ड्राइव पर संग्रहीत नहीं होती हैं। कुकीज़ मेमोरी में संग्रहीत की जाती हैं और केवल सक्रिय ब्राउज़र सत्र के दौरान उपलब्ध होती हैं। फिर से, एक बार जब आप अपना ब्राउज़र बंद कर देते हैं, तो कुकी गायब हो जाती है।"
    ];
    personalInfoTitle = "यदि आप हमें व्यक्तिगत जानकारी भेजते हैं";
    personalInfoContent = [
      "हम आपको उत्तर देने के अलावा किसी अन्य उद्देश्य के लिए व्यक्तिगत जानकारी एकत्र नहीं करते हैं (उदाहरण के लिए, आपके प्रश्नों का उत्तर देना या आपकी चुनी हुई सदस्यताएँ प्रदान करना)। यदि आप हमें व्यक्तिगत जानकारी प्रदान करना चुनते हैं — जैसे ईमेल पता या डाक पता के साथ \"हमसे संपर्क करें\" फॉर्म भरना — और इसे वेबसाइट के माध्यम से हमें सबमिट करना, तो हम उस जानकारी का उपयोग आपके संदेश का उत्तर देने और आपकी अनुरोधित जानकारी प्राप्त करने में आपकी मदद करने के लिए करते हैं।",
      "हम आपके दिए गए जानकारी को केवल तभी किसी अन्य सरकारी एजेंसी के साथ साझा करते हैं जब आपका प्रश्न उस एजेंसी से संबंधित हो, या कानून द्वारा अन्यथा आवश्यक हो। हमारी वेबसाइट कभी भी व्यावसायिक विपणन के लिए जानकारी एकत्र नहीं करती है या व्यक्तिगत प्रोफ़ाइल नहीं बनाती है।",
      "हालाँकि आपको हमें आने वाले किसी भी प्रश्न या टिप्पणी के लिए स्थानीय प्रतिक्रिया के लिए ईमेल पता प्रदान करना होगा, हम अनुशंसा करते हैं कि आप कोई अन्य व्यक्तिगत जानकारी शामिल न करें।"
    ];
  } else if (language === "Kannada") {
    title = "ಗೌಪ್ಯತೆ ನೀತಿ";
    mainContent = [
      "1) ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿದ್ದಕ್ಕೆ ಮತ್ತು ನಮ್ಮ ಗೌಪ್ಯತೆ ನೀತಿಯನ್ನು ಪರಿಶೀಲಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
      "2) ನೀವು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿದಾಗ ನಾವು ಹೆಸರುಗಳು ಅಥವಾ ವಿಳಾಸಗಳಂತಹ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ನೀವು ನಮಗೆ ಆ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಲು ಆಯ್ಕೆ ಮಾಡಿದರೆ, ಅದನ್ನು ಕೇವಲ ನಿಮ್ಮ ಮಾಹಿತಿ ವಿನಂತಿಯನ್ನು ಪೂರೈಸಲು ಬಳಸಲಾಗುತ್ತದೆ.",
      "3) ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಸುಗಮಗೊಳಿಸಲು ನಾವು ನಿಮ್ಮ ಭೇಟಿಯ ಸಮಯದಲ್ಲಿ ಕೆಲವು ತಾಂತ್ರಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ. ನೀವು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿದಾಗ ನಾವು ತಾಂತ್ರಿಕ ಮಾಹಿತಿಯನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತೇವೆ ಮತ್ತು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ ಎಂಬುದನ್ನು ಕೆಳಗಿನ ವಿಭಾಗವು ವಿವರಿಸುತ್ತದೆ.",
      "4) ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾದ ಮತ್ತು ಸಂಗ್ರಹಿಸಲಾದ ಮಾಹಿತಿ.",
      "5) ನೀವು ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಬ್ರೌಸ್ ಮಾಡಿದಾಗ, ಪುಟಗಳನ್ನು ಓದಿದಾಗ ಅಥವಾ ಮಾಹಿತಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿದಾಗ, ನಾವು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಮ್ಮ ಭೇಟಿಯ ಕುರಿತು ಕೆಲವು ತಾಂತ್ರಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ ಮತ್ತು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ.",
      "6) ಈ ಮಾಹಿತಿಯು ಎಂದಿಗೂ ನೀವು ಯಾರು ಎಂಬುದನ್ನು ಗುರುತಿಸುವುದಿಲ್ಲ. ನಿಮ್ಮ ಭೇಟಿಯ ಕುರಿತು ನಾವು ಸಂಗ್ರಹಿಸುವ ಮತ್ತು ಸಂಗ್ರಹಿಸುವ ಮಾಹಿತಿಯನ್ನು ಕೆಳಗೆ ಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ:",
      "7) ನಿಮ್ಮ ಸೇವೆ ಒದಗಿಸುವವರ ಇಂಟರ್ನೆಟ್ ಡೊಮೇನ್ (ಉದಾ. mtnl.net.in) ಮತ್ತು IP ವಿಳಾಸ (ಒಂದು IP ವಿಳಾಸವು ಒಂದು ಸಂಖ್ಯೆಯಾಗಿದ್ದು ನೀವು ವೆಬ್‌ನಲ್ಲಿ ಸರ್ಫಿಂಗ್ ಮಾಡುತ್ತಿದ್ದಾಗ ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಯೋಗಿಸಲಾಗುತ್ತದೆ) ಇದರಿಂದ ನೀವು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಪ್ರವೇಶಿಸುತ್ತೀರಿ.",
      "8) ನೀವು ನಮ್ಮ ಸೈಟ್‌ಗೆ ಪ್ರವೇಶಿಸಲು ಬಳಸುವ ಬ್ರೌಸರ್‌ನ ಪ್ರಕಾರ (ಫೈರ್‌ಫಾಕ್ಸ್, ನೆಟ್‌ಸ್ಕೇಪ್ ಅಥವಾ ಇಂಟರ್ನೆಟ್ ಎಕ್ಸ್‌ಪ್ಲೋರರ್‌ನಂತಹ) ಮತ್ತು ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್ (ವಿಂಡೋಸ್, ಲಿನಕ್ಸ್).",
      "9) ನೀವು ನಮ್ಮ ಸೈಟ್‌ಗೆ ಪ್ರವೇಶಿಸುವ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ.",
      "10) ನೀವು ಭೇಟಿ ನೀಡಿದ ಪುಟಗಳು/URLs, ಮತ್ತು ನೀವು ಈ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಮತ್ತೊಂದು ವೆಬ್‌ಸೈಟ್‌ನಿಂದ ತಲುಪಿದ್ದರೆ, ಆ ಉಲ್ಲೇಖಿತ ವೆಬ್‌ಸೈಟ್‌ನ ವಿಳಾಸ.",
      "11) ಈ ಮಾಹಿತಿಯನ್ನು ಕೇವಲ ನಿಮಗಾಗಿ ಸೈಟ್ ಅನ್ನು ಹೆಚ್ಚು ಉಪಯುಕ್ತವಾಗಿಸಲು ನಮಗೆ ಸಹಾಯ ಮಾಡಲು ಬಳಸಲಾಗುತ್ತದೆ. ಈ ಡೇಟಾದೊಂದಿಗೆ, ನಾವು ನಮ್ಮ ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡುವ ಭೇಟಿದಾರರ ಸಂಖ್ಯೆ ಮತ್ತು ನಮ್ಮ ಭೇಟಿದಾರರು ಬಳಸುವ ತಂತ್ರಜ್ಞಾನದ ಪ್ರಕಾರಗಳ ಕುರಿತು ಕಲಿಯುತ್ತೇವೆ. ನಾವು ಎಂದಿಗೂ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಅವರ ಭೇಟಿಗಳ ಕುರಿತು ಮಾಹಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಅಥವಾ ರೆಕಾರ್ಡ್ ಮಾಡುವುದಿಲ್ಲ."
    ];
    cookiesTitle = "ಕುಕೀಗಳು";
    cookiesContent = [
      "ನೀವು ಕೆಲವು ವೆಬ್‌ಸೈಟ್‌ಗಳಿಗೆ ಭೇಟಿ ನೀಡಿದಾಗ, ಅವು ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಬ್ರೌಸಿಂಗ್ ಸಾಧನದಲ್ಲಿ ಕುಕೀಗಳೆಂದು ಕರೆಯಲ್ಪಡುವ ಸಾಫ್ಟ್‌ವೇರ್‌ನ ಸಣ್ಣ ತುಂಡುಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು. ಕೆಲವು ಕುಕೀಗಳು ಮುಂಬರುವಲ್ಲಿ ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್ ಅನ್ನು ಗುರುತಿಸಲು ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುತ್ತವೆ. ನಾವು ಕೇವಲ ಅಸ್ಥಿರ ಕುಕೀಗಳು ಅಥವಾ \"ಪ್ರತಿ-ಸೆಷನ್ ಕುಕೀಗಳನ್ನು\" ಬಳಸುತ್ತೇವೆ. ಪ್ರತಿ-ಸೆಷನ್ ಕುಕೀಗಳು ತಾಂತ್ರಿಕ ಉದ್ದೇಶಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತವೆ, ಈ ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ನಿರ್ಬಂಧಿತ ನ್ಯಾವಿಗೇಶನ್ ಅನ್ನು ಒದಗಿಸುವಂತಹ. ಈ ಕುಕೀಗಳು ಬಳಕೆದಾರರಲ್ಲಿ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ ಮತ್ತು ನೀವು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ತೊರೆಯುತ್ತಿದ್ದಂತೆ ಅವುಗಳನ್ನು ಅಳಿಸಲಾಗುತ್ತದೆ. ಕುಕೀಗಳು ಶಾಶ್ವತವಾಗಿ ಡೇಟಾವನ್ನು ದಾಖಲಿಸುವುದಿಲ್ಲ ಮತ್ತು ಅವು ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನ ಹಾರ್ಡ್ ಡ್ರೈವ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ. ಕುಕೀಗಳನ್ನು ಮೆಮೊರಿಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಸಕ್ರಿಯ ಬ್ರೌಸರ್ ಸೆಷನ್‌ನ ಸಮಯದಲ್ಲಿ ಮಾತ್ರ ಲಭ್ಯವಿರುತ್ತದೆ. ಮತ್ತೆ, ನೀವು ನಿಮ್ಮ ಬ್ರೌಸರ್ ಅನ್ನು ಮುಚ್ಚಿದ ನಂತರ, ಕುಕೀ ಮಾಯವಾಗುತ್ತದೆ."
    ];
    personalInfoTitle = "ನೀವು ನಮಗೆ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಕಳುಹಿಸಿದರೆ";
    personalInfoContent = [
      "ನಾವು ನಿಮಗೆ ಉತ್ತರಿಸುವುದರ ಹೊರತಾಗಿ ಬೇರೆ ಯಾವುದೇ ಉದ್ದೇಶಕ್ಕಾಗಿ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ (ಉದಾಹರಣೆಗೆ, ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ಅಥವಾ ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಚಂದಾದಾರಿಕೆಗಳನ್ನು ಒದಗಿಸಲು). ನೀವು ನಮಗೆ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಲು ಆಯ್ಕೆ ಮಾಡಿದರೆ — ಇಮೇಲ್ ವಿಳಾಸ ಅಥವಾ ಪೋಸ್ಟಲ್ ವಿಳಾಸದೊಂದಿಗೆ \"ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ\" ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡುವಂತಹ — ಮತ್ತು ಅದನ್ನು ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ನಮಗೆ ಸಲ್ಲಿಸುವುದು, ನಾವು ನಿಮ್ಮ ಸಂದೇಶಕ್ಕೆ ಉತ್ತರಿಸಲು ಮತ್ತು ನೀವು ವಿನಂತಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಆ ಮಾಹಿತಿಯನ್ನು ಬಳಸುತ್ತೇವೆ.",
      "ನೀವು ನಮಗೆ ನೀಡಿದ ಮಾಹಿತಿಯನ್ನು ನಾವು ಕೇವಲ ತದನಂತರ ಮತ್ತೊಂದು ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಯೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳುತ್ತೇವೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯು ಆ ಸಂಸ್ಥೆಯೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದ್ದರೆ, ಅಥವಾ ಕಾನೂನಿನಿಂದ ಬೇರೆ ರೀತಿಯಲ್ಲಿ ಅಗತ್ಯವಿದ್ದಾಗ. ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಎಂದಿಗೂ ವಾಣಿಜ್ಯಿಕ ಮಾರ್ಕೆಟಿಂಗ್‌ಗಾಗಿ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ ಅಥವಾ ವೈಯಕ್ತಿಕ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ರಚಿಸುವುದಿಲ್ಲ.",
      "ನೀವು ನಮಗೆ ಬಂದಿರುವ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಅಥವಾ ಕಾಮೆಂಟ್‌ಗಳಿಗೆ ಸ್ಥಳೀಯ ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ಒದಗಿಸಬೇಕಾದರೂ, ನೀವು ಬೇರೆ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಒಳಗೊಳ್ಳಬೇಡ ಎಂದು ನಾವು ಸಲಹೆ ಮಾಡುತ್ತೇವೆ."
    ];
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        {mainContent.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h3>{cookiesTitle}</h3>

        {cookiesContent.map((paragraph, index) => (
          <p key={`cookies-${index}`}>{paragraph}</p>
        ))}

        <h3>{personalInfoTitle}</h3>

        {personalInfoContent.map((paragraph, index) => (
          <p key={`personal-${index}`}>{paragraph}</p>
        ))}
      </Content>
    </Wrapper>
  );
};

export default PrivacyPolicy;
