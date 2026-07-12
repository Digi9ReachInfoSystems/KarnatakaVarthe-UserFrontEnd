import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import {
  TopLogoBarContainer,
  TopLogoContent,
  TopLogoImage,
  TopLogoTitle,
} from './TopLogoBar.styles';

const titleTranslations = {
  English: 'Karnataka Varthe',
  Kannada: 'ಕರ್ನಾಟಕ ವಾರ್ತೆ',
  Hindi: 'कर्नाटक वार्ते',
};

const TopLogoBar = () => {
  const { language } = useContext(LanguageContext);
  const title = titleTranslations[language] || titleTranslations.English;

  return (
    <TopLogoBarContainer role="region" aria-label="Site branding">
      <TopLogoContent aria-label={title}>
        <TopLogoImage
          src="/header/newlogo/logonew.png"
          alt=""
          aria-hidden="true"
          loading="eager"
        />
        <TopLogoTitle
          className={language === 'Kannada' || language === 'Hindi' ? 'kannada-text' : ''}
        >
          {title}
        </TopLogoTitle>
      </TopLogoContent>
    </TopLogoBarContainer>
  );
};

export default TopLogoBar;
