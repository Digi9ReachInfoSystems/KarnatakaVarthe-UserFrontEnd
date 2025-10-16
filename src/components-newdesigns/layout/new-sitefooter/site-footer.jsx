import { useState, useEffect, useCallback, useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"
import {
  FooterWrapper,
  FooterContainer,
  Grid,
  Left,
  RightColumn,
  Emblem,
  Note,
  ColTitle,
  LinkList,
  LinkItem,
  LinkA,
  Meta,
  Divider,
  BottomBar,
  SrOnly,
} from "./sitefooter.styles"
import { GetTotalVisitorApi, RegisterVisitorApi } from "../../../services/viewsapi/ViewsApi"
import CopyrightPolicy from "../../../components/WebsitePolicies/CopyrightPolicy/CopyrightPolicy";
import HyperlinkingPolicy from "../../../components/WebsitePolicies/HyperlinkingPolicy/HyperlinkingPolicy";
import SecurityPolicy from "../../../components/WebsitePolicies/SecurityPolicy/SecurityPolicy";
import TermsAndConditions from "../../../components/WebsitePolicies/TermsAndConditions/TermsAndConditions";
import Help from "../../../components/WebsitePolicies/Help/Help";

// Footer translations for different languages
const footerTranslations = {
  English: {
    note: "Please note that this page also provides links to the websites / web pages of Govt. Ministries/Departments/Organizations. The content of these websites are owned by the respective organizations and they may be contacted for any further information or suggestion.",
    websitePolicies: "Website Policies",
    visitors: "Visitors",
    dateTime: "Date/Time:",
    visitorsCounter: "Visitors Counter:",
    version: "Version:",
    footerInfo: "Footer information",
    copyright: "Designed, Developed and Hosted by: Digi9 - Web Portal, Government of Karnataka",
    allRightsReserved: "All Rights Reserved.",
    policies: [
      { id: "copyright", label: "Copyright Policy", href: "#" },
      { id: "hyperlinking", label: "Hyperlinking Policy", href: "#" },
      { id: "security", label: "Security Policy", href: "#" },
      { id: "guidelines", label: "Guidelines", href: "/guidelines" },
      { id: "terms", label: "Terms & Conditions", href: "#" },
      { id: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
      { id: "help", label: "Help", href: "#" },
    ]
  },
  Kannada: {
    note: "ಈ ಪುಟವು ಸರ್ಕಾರದ ಜಾಲತಾಣಗಳು/ವೆಬ್ ಪುಟಗಳಿಗೆ ಕೊಂಡಿಗಳನ್ನು ಸಹ ಒದಗಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಸಚಿವಾಲಯಗಳು/ಇಲಾಖೆಗಳು/ಸಂಸ್ಥೆಗಳು. ಈ ಜಾಲತಾಣಗಳ ವಿಷಯವು ಆಯಾ ಸಂಸ್ಥೆಗಳ ಒಡೆತನದಲ್ಲಿದೆ ಮತ್ತು ಯಾವುದೇ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ಸಲಹೆಗಾಗಿ ಅವರನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು.",
    websitePolicies: "ವೆಬ್‌ಸೈಟ್ ನೀತಿಗಳು",
    visitors: "ಭೇಟಿಗಾರರು",
    dateTime: "ದಿನಾಂಕ/ಸಮಯ:",
    visitorsCounter: "ಭೇಟಿಗಾರರ ಕೌಂಟರ್:",
    version: "ಆವೃತ್ತಿ:",
    footerInfo: "ಅಡಿಟಿಪ್ಪಣಿ ಮಾಹಿತಿ",
    copyright: "ವಿನ್ಯಾಸ, ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಹೋಸ್ಟ್ ಮಾಡಿದವರು: ಡಿಜಿ9 - ವೆಬ್ ಪೋರ್ಟಲ್, ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
    allRightsReserved: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    policies: [
      { id: "copyright", label: "ಕಾಪಿರೈಟ್ ನೀತಿ", href: "#" },
      { id: "hyperlinking", label: "ಹೈಪರ್‌ಲಿಂಕಿಂಗ್ ನೀತಿ", href: "#" },
      { id: "security", label: "ಭದ್ರತಾ ನೀತಿ", href: "#" },
      { id: "guidelines", label: "ಮಾರ್ಗಸೂಚಿಗಳು", href: "/guidelines" },
      { id: "terms", label: "ನಿಯಮಗಳು & ಷರತ್ತುಗಳು", href: "#" },
      { id: "privacy", label: "ಗೌಪ್ಯತೆ ನೀತಿ", href: "/privacy-policy" },
      { id: "help", label: "ಸಹಾಯ", href: "#" },
    ]
  },
  Hindi: {
    note: "कृपया ध्यान दें कि यह पृष्ठ सरकारी मंत्रालयों/विभागों/संगठनों की वेबसाइटों/वेब पेजों के लिंक भी प्रदान करता है। इन वेबसाइटों की सामग्री संबंधित संगठनों के स्वामित्व में है और किसी भी अतिरिक्त जानकारी या सुझाव के लिए उनसे संपर्क किया जा सकता है।",
    websitePolicies: "वेबसाइट नीतियां",
    visitors: "आगंतुक",
    dateTime: "दिनांक/समय:",
    visitorsCounter: "आगंतुक काउंटर:",
    version: "संस्करण:",
    footerInfo: "फुटर जानकारी",
    copyright: "डिजाइन, विकसित और होस्ट: डिजी9 - वेब पोर्टल, कर्नाटक सरकार",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    policies: [
      { id: "copyright", label: "कॉपीराइट नीति", href: "#" },
      { id: "hyperlinking", label: "हाइपरलिंकिंग नीति", href: "#" },
      { id: "security", label: "सुरक्षा नीति", href: "#" },
      { id: "guidelines", label: "दिशानिर्देश", href: "/guidelines" },
      { id: "terms", label: "नियम और शर्तें", href: "#" },
      { id: "privacy", label: "गोपनीयता नीति", href: "/privacy-policy" },
      { id: "help", label: "सहायता", href: "#" },
    ]
  }
};

export default function SiteFooter({
  customPolicies,
  emblemSrc = "/header/karntaka.png",
}) {
  const { language, currentMagazineType } = useContext(LanguageContext)

  const [visitorData, setVisitorData] = useState({
    totalVisitors: 0,
  })
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())
  const [activePolicy, setActivePolicy] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActivePolicy(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  
  const handlePolicyClick = (e, p) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setActivePolicy(p.id);
  };
  const fetchVisitorData = useCallback(async () => {
    try {
      const isVisited = sessionStorage.getItem("isVisited")
      if (!isVisited) {
        await RegisterVisitorApi()
        sessionStorage.setItem("isVisited", "true")
      }
      const totalVisitorsResponse = await GetTotalVisitorApi()
      setVisitorData({
        totalVisitors: totalVisitorsResponse.totalVisits,
      })
    } catch (error) {
      console.error("Error fetching visitor data:", error)
    }
  }, [])

  useEffect(() => {
    fetchVisitorData()
    // Update time every minute for better performance
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 60000)
    return () => clearInterval(intervalId)
  }, [fetchVisitorData])
  // Get translations based on current language
  const translations = footerTranslations[language] || footerTranslations.English
  
  // Use custom policies if provided, otherwise use translated policies
  const policies = customPolicies || translations.policies
  
  return (
    <FooterWrapper role="contentinfo" aria-label="Site footer">
      <FooterContainer>
        <Grid>
          <Left>
            <Emblem src={emblemSrc} alt="Government crest" />
            <Note>{translations.note}</Note>
          </Left>

          <RightColumn>
            <div>
              <ColTitle>{translations.websitePolicies}</ColTitle>
              <nav aria-label="Website policies">
              <LinkList>
  {policies.map((p, idx) => (
    <LinkItem key={idx}>
 <LinkA
  href={p.href || "#"}
  onClick={(e) => {
    if (p.href === "#" || !p.href) {
      e.preventDefault();           // stop normal link behavior
      handlePolicyClick(e, p);      // open modal
    }
    // else do nothing → it will redirect normally
  }}
  role="button"
  aria-haspopup="dialog"
  aria-controls={p.label.replace(/\s+/g, "-").toLowerCase()}
  onKeyDown={(e) => {
    if ((p.href === "#" || !p.href) && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handlePolicyClick(e, p);
    }
  }}
>
  {p.label}
</LinkA>
    </LinkItem>
  ))}
</LinkList>
              </nav>
            </div>

            <div>
              <ColTitle>{translations.visitors}</ColTitle>
              <Meta>
                <div>
                  <strong>{translations.dateTime} </strong>
                  <span aria-live="polite">{currentTime}</span>
                </div>
                <div>
                  <strong>{translations.visitorsCounter} </strong>
                  <span aria-live="polite">{visitorData.totalVisitors}</span>
                </div>
                <div>
                  <strong>{translations.version} </strong>
                  <span>C64/KBN 1.3</span>
                </div>
              </Meta>
            </div>
          </RightColumn>
        </Grid>

        <Divider />

        <BottomBar>
          <SrOnly>{translations.footerInfo}</SrOnly>
          {translations.copyright} © {new Date().getFullYear()},
          {translations.allRightsReserved}
        </BottomBar>
      </FooterContainer>
      {activePolicy === "copyright" && (
  <CopyrightPolicy
    id="copyright-policy"
    onClose={() => setActivePolicy(null)}
  />
)}
{activePolicy === "hyperlinking" && (
  <HyperlinkingPolicy
    id="hyperlinking-policy"
    onClose={() => setActivePolicy(null)}
  />
)}
{activePolicy === "security" && (
  <SecurityPolicy
    id="security-policy"
    onClose={() => setActivePolicy(null)}
  />
)}
{activePolicy === "terms" && (
  <TermsAndConditions
    id="terms-and-conditions"
    onClose={() => setActivePolicy(null)}
  />
)}
{activePolicy === "help" && (
  <Help
    id="help"
    onClose={() => setActivePolicy(null)}
  />
)}
    </FooterWrapper>
  )
}
