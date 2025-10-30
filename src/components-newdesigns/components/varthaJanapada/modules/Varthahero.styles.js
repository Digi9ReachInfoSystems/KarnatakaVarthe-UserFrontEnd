import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const PageLayout = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing1(7.5)};
  max-width: 100%;
  padding-left: ${theme.spacing1(10)};
  padding-right: ${theme.spacing1(10)};
  padding-top: ${theme.spacing1(2.5)};
  padding-bottom: ${theme.spacing1(2.5)};
  background: ${theme.colors.background};
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing1(5)};
    max-width: 95%;
    padding: ${theme.spacing1(2)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing1(2.5)};
    max-width: 100%;
    padding: ${theme.spacing1(1.5)};
  }
`

export const HeroLayout = styled.section`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: ${theme.spacing1(6)};
  align-items: stretch;
  margin-bottom: ${theme.spacing1(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing1(4)};
    margin-bottom: ${theme.spacing1(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(3)};
    margin-bottom: ${theme.spacing1(2)};
  }
`

export const HeroRoot = styled.section`
  position: relative;
  height: 500px;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    height: 500px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 280px;
  }
`

export const ArrowControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 2;
  display: flex;
  gap: 8px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    bottom: 10px;
    right: 10px;
  }
`

export const ArrowButton = styled.button`
  background-color: rgba(133, 133, 133, 0.5);
  color: white;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s, background-color 0.2s;
  font-size: 16px;
  
  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    background-color: rgba(133, 133, 133, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`

export const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.src});
  background-size: 100% 100%;
  background-position: center;
  filter: brightness(0.7);
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%);
`

export const HeroContent = styled.div`
 position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.medium} ${theme.borderRadius.medium} 0 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${theme.spacing1(8)};
  padding-bottom: ${theme.spacing1(4)};

  @media (max-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing1(6)};
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(4)};
    gap: ${theme.spacing1(2)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(3)};
    width: 100%;
    max-width: none;
  }
`

export const HeroTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 3.2vw, 36px);
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0,0,0,0.25);
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(18px, 2.8vw, 24px);
  }
`

export const HeroSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: clamp(14px, 1.6vw, 18px);
  color: rgba(255,255,255,0.85);
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(12px, 1.4vw, 16px);
  }
`

export const HeroCta = styled.a`
  display: inline-block;
  width: fit-content;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius:8px;
  padding: ${theme.spacing1(3)} ${theme.spacing1(5)};
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(${theme.colors.primaryRgb || '0,0,0'}, 0.2);
  transition: ${theme.transitions.fast};

  &:hover {
    filter: brightness(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2)} ${theme.spacing1(4)};
    font-size: 11px;
  }
`
