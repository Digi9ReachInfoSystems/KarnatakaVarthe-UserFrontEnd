import { useContext, useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  FooterContainer,
  FooterContent,
  LogoSection,
  Logo,
  DisclaimerText,
  PoliciesSection,
  SectionTitle,
  PolicyLink,
  VisitorsSection,
  VisitorInfo,
  FooterStripContainer,
  FooterStrip,
  StripText,
} from "./Footer2.styles"
import { FontSizeContext } from "../../context/FontSizeProvider"
import { LanguageContext } from "../../context/LanguageContext"
import { GetTotalVisitorApi, RegisterVisitorApi } from "../../services/viewsapi/ViewsApi"
import logo2 from "../../assets/logo2.png"


const translations = {
  English: {
    disclaimerText:
      "Please note that this page also provides links to the websites / web pages of Govt. Ministries/Departments/ Organizations. The content of these websites are owned by the respective organizations and they may be contacted for any further information or suggestion.",
    websitePoliciesTitle: "Website Policies",
    copyrightPolicy: "Copyright Policy",
    hyperlinkingPolicy: "Hyperlinking Policy",
    securityPolicy: "Security Policy",
    guidelines: "Guidelines",
    termsAndConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    help: "Help",
    visitorsTitle: "Visitors",
    visitorsCounter: "Visitors Counter:",
    version: "Version:",
    footerStripText:
      "Designed, Developed and Hosted by Digi9 - Web Portal, Government of Karnataka © 2025, All Rights Reserved.",
  },
  Hindi: {
    disclaimerText:
      "कृपया ध्यान दें कि यह पृष्ठ सरकारी मंत्रालयों/विभागों/संगठनों की वेबसाइटों/वेब पृष्ठों के लिंक भी प्रदान करता है। इन वेबसाइटों की सामग्री संबंधित संगठनों के स्वामित्व में है और किसी भी अतिरिक्त जानकारी या सुझाव के लिए उनसे संपर्क किया जा सकता है।",
    websitePoliciesTitle: "वेबसाइट नीतियां",
    copyrightPolicy: "कॉपीराइट नीति",
    hyperlinkingPolicy: "हाइपरलिंकिंग नीति",
    securityPolicy: "सुरक्षा नीति",
    guidelines: "दिशानिर्देश",
    termsAndConditions: "नियम और शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    help: "सहायता",
    visitorsTitle: "आगंतुक",
    visitorsCounter: "आगंतुक गणक:",
    version: "संस्करण:",
    footerStripText: "डिज़ाइन, विकसित और होस्ट किया गया: डिजी9 - वेब पोर्टल, कर्नाटक सरकार © 2025, सर्वाधिकार सुरक्षित।",
  },
  Kannada: {
    disclaimerText:
      "ದಯವಿಟ್ಟು ಗಮನಿಸಿ ಈ ಪುಟವು ಸರ್ಕಾರಿ ಸಚಿವಾಲಯಗಳು/ವಿಭಾಗಗಳು/ಸಂಸ್ಥೆಗಳ ವೆಬ್‌ಸೈಟ್‌ಗಳು/ವೆಬ್ ಪುಟಗಳಿಗೆ ಲಿಂಕ್‌ಗಳನ್ನು ಸಹ ಒದಗಿಸುತ್ತದೆ. ಈ ವೆಬ್‌ಸೈಟ್‌ಗಳ ವಿಷಯವು ಸಂಬಂಧಿತ ಸಂಸ್ಥೆಗಳ ಒಡೆತನದಲ್ಲಿದೆ ಮತ್ತು ಯಾವುದೇ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ಸಲಹೆಗಾಗಿ ಅವರನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು.",
    websitePoliciesTitle: "ವೆಬ್‌ಸೈಟ್ ನೀತಿಗಳು",
    copyrightPolicy: "ಕೃತಿಸ್ವಾಮ್ಯ ನೀತಿ",
    hyperlinkingPolicy: "ಹೈಪರ್‌ಲಿಂಕಿಂಗ್ ನೀತಿ",
    securityPolicy: "ಸುರಕ್ಷತಾ ನೀತಿ",
    guidelines: "ಮಾರ್ಗದರ್ಶನಗಳು",
    termsAndConditions: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    help: "ಸಹಾಯ",
    visitorsTitle: "ಭೇಟಿಕಾರರು",
    visitorsCounter: "ಭೇಟಿಕಾರರ ಗಣಕ:",
    version: "ಆವೃತ್ತಿ:",
    footerStripText:
      "ವಿನ್ಯಾಸಗೊಳಿಸಿದ, ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ಮತ್ತು ಹೋಸ್ಟ್ ಮಾಡಿದವರು: ಡಿಜಿ9 - ವೆಬ್ ಪೋರ್ಟಲ್, ಕರ್ನಾಟಕ ಸರ್ಕಾರ © 2025, ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  },
}

const Footer2 = () => {
  const { fontSize } = useContext(FontSizeContext)
  const { language } = useContext(LanguageContext)
  const [visitorData, setVisitorData] = useState({
    lastUpdated: "",
    totalVisitors: 559,
  })
  const [currentTime, setCurrentTime] = useState(new Date())

  const t = translations[language] || translations.English

  const fetchVisitorData = useCallback(async () => {
    try {
      const isVisited = sessionStorage.getItem("isVisited")
      if (!isVisited) {
        await RegisterVisitorApi()
        sessionStorage.setItem("isVisited", "true")
      }
      const totalVisitorsResponse = await GetTotalVisitorApi()
      setVisitorData({
        lastUpdated: new Date().toLocaleString(),
        totalVisitors: totalVisitorsResponse.totalVisits || 559,
      })
    } catch (error) {
      console.error("Error fetching visitor data:", error)
    }
  }, [])

  useEffect(() => {
    fetchVisitorData()
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [fetchVisitorData])

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
    return date.toLocaleString("en-US", options).replace(",", ",")
  }

  const fontSizeStyle = { fontSize: `${fontSize}%` }

  const policyLinks = [
    { path: "/copyright-policy", text: t.copyrightPolicy },
    { path: "/hyperlinking-policy", text: t.hyperlinkingPolicy },
    { path: "/security-policy", text: t.securityPolicy },
    { path: "/guidelines", text: t.guidelines },
    { path: "/terms-and-conditions", text: t.termsAndConditions },
    { path: "/privacy-policy", text: t.privacyPolicy },
    { path: "/help", text: t.help },
  ]

  return (
    <FooterContainer style={fontSizeStyle} role="contentinfo" aria-label="Site footer">
      <FooterContent style={fontSizeStyle}>
        {/* Logo and Disclaimer Section */}
        <LogoSection>
          <Logo src={logo2} alt="Government of Karnataka Emblem" />
          <DisclaimerText style={fontSizeStyle}>{t.disclaimerText}</DisclaimerText>
        </LogoSection>

        {/* Website Policies Section */}
        <PoliciesSection>
          <SectionTitle style={fontSizeStyle}>{t.websitePoliciesTitle}</SectionTitle>
          <nav aria-label="Website policies">
            {policyLinks.map((link, index) => (
              <PolicyLink key={index} style={fontSizeStyle}>
                <Link to={link.path} aria-label={link.text}>
                  {link.text}
                </Link>
              </PolicyLink>
            ))}
          </nav>
        </PoliciesSection>

        {/* Visitors Section */}
        <VisitorsSection>
          <SectionTitle style={fontSizeStyle}>{t.visitorsTitle}</SectionTitle>
          <VisitorInfo style={fontSizeStyle}>
            <span aria-live="polite">{formatDateTime(currentTime)}</span>
          </VisitorInfo>
          <VisitorInfo style={fontSizeStyle}>
            {t.visitorsCounter} <span aria-live="polite">{visitorData.totalVisitors}</span>
          </VisitorInfo>
          <VisitorInfo style={fontSizeStyle}>{t.version} C64/KBN</VisitorInfo>
        </VisitorsSection>
      </FooterContent>

      {/* Footer Strip */}
      <FooterStripContainer style={fontSizeStyle}>
        <FooterStrip>
          <StripText style={fontSizeStyle}>{t.footerStripText}</StripText>
        </FooterStrip>
      </FooterStripContainer>
    </FooterContainer>
  )
}

export default Footer2
