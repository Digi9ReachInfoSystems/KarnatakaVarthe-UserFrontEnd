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
  grid-template-columns:
    minmax(260px, 1fr)
    minmax(320px, 2fr)
    minmax(260px, 1fr);
  gap: ${theme.spacing1(4)};
  align-items: stretch;
  margin-bottom: ${theme.spacing1(4)};

  /* At <=850px: make the middle child full-width on top,
     and place child 1 and child 3 side-by-side beneath it. */
  @media (min-width: 450px) and (max-width: 850px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: ${theme.spacing1(3)};
    grid-template-areas:
      "hero hero"
      "services notifications";

    /* Map DOM children to areas: keep selectors minimal and robust */
    & > :nth-child(2) { grid-area: hero; }         /* middle -> full width top */
    & > :nth-child(1) { grid-area: services; }     /* left  -> bottom-left */
    & > :nth-child(3) { grid-area: notifications; }/* right -> bottom-right */
  }
    

@media (max-width: 450px) {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: ${theme.spacing1(2.5)};
  grid-template-areas:
    "hero"
    "services"
    "notifications";

  & > :nth-child(2) { grid-area: hero; }
  & > :nth-child(1) { grid-area: services; }
  & > :nth-child(3) { grid-area: notifications; }
}




  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(2.5)};
    margin-bottom: ${theme.spacing1(2)};
  }
`;

export const HeroRoot = styled.section`
  position: relative;
  height: 500px;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  color: ${theme.colors.white};
  background-color: ${theme.colors.gray[800]};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    height: 450px;
  }
    @media(min-width: 850px) and (max-width: 1026px) {
    height: 500px;
    }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 300px;
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
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing1(3)};
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border-radius: ${theme.borderRadius.medium} ${theme.borderRadius.medium} 0 0;
  width: 100%;
  padding: ${theme.spacing1(4)} ${theme.spacing1(5)};

  /* keep content readable on very large images */
  min-height: 86px;

  @media (max-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing1(3.5)} ${theme.spacing1(4)};
    gap: ${theme.spacing1(2.5)};
  }

  /* collapse into vertical stack on small screens */
  // @media (max-width: ${theme.breakpoints.tablet}) {
  //   flex-direction: column;
  //   align-items: flex-start;
  //   gap: ${theme.spacing1(2)};
  //   padding: ${theme.spacing1(3)} ${theme.spacing1(3.5)};
  // }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2.5)} ${theme.spacing1(3)};
    gap: ${theme.spacing1(1.5)};
    min-height: 72px;
  }
`;

/* container for title + supporting text so CTA can float right on desktop */
export const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing1(1)};
  max-width: 78%;
  word-break: break-word; /* avoid overflow from long words */

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

export const HeroTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: ${theme.colors.white};
  text-shadow: 0 2px 4px rgba(0,0,0,0.35);
  hyphens: auto; /* better wrapping on narrow screens */

  /* keep title from pushing CTA off-screen on medium widths */
  @media (min-width: ${theme.breakpoints.desktop}) {
    max-width: 76%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(16px, 3.2vw, 22px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(15px, 3.6vw, 20px);
  }
`;

/* CTA: inline-block, becomes full-width on small screens and gets higher visual priority */
export const HeroCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing1(2.5)} ${theme.spacing1(4)};
  font-weight: 600;
  font-size: clamp(12px, 1.2vw, 14px);
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: transform .14s ease, box-shadow .14s ease;
  cursor: pointer;
  white-space: nowrap;
  margin-left: auto; /* keeps CTA to the right in horizontal layout */

  &:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.22); }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid ${theme.colors.white}; outline-offset: 2px; }

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: auto;
    margin-right: 0;
    padding: ${theme.spacing1(2)} ${theme.spacing1(3)};
    white-space: normal;
    text-align: right;
    width: auto;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: ${theme.spacing1(1.75)} ${theme.spacing1(2.5)};
  }
`;