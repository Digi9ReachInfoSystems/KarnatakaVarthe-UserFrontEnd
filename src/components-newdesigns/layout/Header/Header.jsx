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
  CMSection,
  CMImagesWrapper,
  CMImage,
  VisuallyHidden,
} from './Header.styles';
import { FontSizeContext } from '../../../context/FontSizeProvider';

const Header = () => {
  const { fontSize } = useContext(FontSizeContext);
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
        <CMImagesWrapper>
          <CMImage 
            src="/header/newcm.png" 
            alt="Chief Minister D K Shivakumar portrait" 
            loading="eager"
          />
          <CMImage 
            src="/header/newdcm.png" 
            alt="Deputy Chief Minister Dr. G Parameshwara portrait" 
            loading="eager"
          />
        </CMImagesWrapper>
      </CMSection>
    </HeaderContainer>
  );
};

export default Header;
