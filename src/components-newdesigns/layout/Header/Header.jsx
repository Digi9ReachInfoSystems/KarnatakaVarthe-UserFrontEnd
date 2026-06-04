import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderContainer,
  LogoSection,
  Logo,
  LogoLink,
  TitleSection,
  MainTitle,
  Subtitle,
  SiteTitle,
  CMSection,
  CMImage,
  MobileCMPdfLink,
  VisuallyHidden,
} from './Header.styles';
import { FontSizeContext } from '../../../context/FontSizeProvider';
import { LanguageContext } from '../../../context/LanguageContext';

const Header = () => {
  const { fontSize } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);

  const pdfByLang = {
    Kannada: { href: 'https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/magazinePdfs%2FNavakarnataka%203%20years%20book%20cover%20print%201.pdf?alt=media&token=007ae8d1-9951-4ec1-8aba-704c1119a11b', label: 'ನವ ಕರ್ನಾಟಕ' },
    English: { href: 'https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/magazinePdfs%2FNavaKarnataka_ENG_Final_Print.pdf?alt=media&token=f722faaf-9391-4c50-b925-b21fca598c2b', label: 'Nava Karnataka' },
    Hindi: { href: 'https://firebasestorage.googleapis.com/v0/b/varthajanapadanewsapp.firebasestorage.app/o/magazinePdfs%2FNavaKarnataka_ENG_Final_Print.pdf?alt=media&token=f722faaf-9391-4c50-b925-b21fca598c2b', label: 'Nava Karnataka' },
  };
  const pdf = pdfByLang[language] || pdfByLang.English;
  return (
    <HeaderContainer role="banner">
      <VisuallyHidden as="h1">
        Karnataka Varthe - Department of Information and Public Relations, Government of Karnataka
      </VisuallyHidden>
      <LogoSection style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
        <LogoLink to="/" aria-label="Karnataka Varthe Homepage">
          <Logo 
            src="/header/karntaka.png" 
            alt="Karnataka State Emblem" 
            loading="eager"
          />
        </LogoLink>
        <TitleSection style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}>
          <SiteTitle 
            as="p" 
            aria-label="Site name"
            style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
          >
            Karnataka Varthe
          </SiteTitle>
          <MainTitle 
            as="p" 
            aria-label="Department name"
            style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
          >
            Department of Information and Public Relations
          </MainTitle>
          <Subtitle 
            as="p"
            style={fontSize !== 100 ? { fontSize: `${fontSize}%` } : undefined}
          >
            Government of Karnataka
          </Subtitle>
        </TitleSection>     
      </LogoSection>
      <CMSection aria-label="Government Officials">
        <MobileCMPdfLink
          href={pdf.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Nava Karnataka 3 Years report (PDF)"
        >
          {pdf.label}
        </MobileCMPdfLink>
        <CMImage 
          src="/header/newcm.png" 
          alt="Chief Minister D K Shivakumar portrait" 
          loading="eager"
        />
        {/* <CMImage 
          src="/header/dcm.png" 
          alt="Deputy Chief Minister D K Shivakumar portrait" 
          loading="eager"
        /> */}
      </CMSection>
    </HeaderContainer>
  );
};

export default Header;
