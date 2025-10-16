import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const HeroWrap = styled.section`
  position: relative;
  width: 100%;
  background: ${theme.colors.background};
  padding: 0 ${theme.spacing(2.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(2.5)};
    padding: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
    border-bottom: 1px solid ${theme.colors.gray[400]};
  }
`

export const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${theme.colors.gray[200]};
  overflow: hidden;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 10;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    z-index: 1;
  }
`

export const OverlayCard = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  width: min(80%, 800px);
  background: ${theme.colors.background};
  padding: ${theme.spacing(7.5)} ${theme.spacing(3)} ${theme.spacing(6.25)} ${theme.spacing(3)};
  min-height: 300px;
  margin: 0 ${theme.spacing(1.25)};
  z-index: 10;

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: min(80%, 600px);
    padding: ${theme.spacing(6.25)} ${theme.spacing(2.5)} ${theme.spacing(5)} ${theme.spacing(2.5)};
    min-height: 280px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    transform: none;
    left: auto;
    bottom: auto;
    width: 100%;
    margin: 0;
    padding: ${theme.spacing(2.5)} ${theme.spacing(2)};
    min-height: auto;
    background: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.gray[400]};
  }
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${theme.colors.gray[800]};
  letter-spacing: 0.3px;
  margin: 0 0 ${theme.spacing(1.5)} 0;
  text-align: center;
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 18px;
    text-align: left;
    margin-bottom: ${theme.spacing(1)};
  }
`

export const Excerpt = styled.p`
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.gray[500]};
  margin: 0;
  text-align: center;
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.tablet}) {
    text-align: left;
    font-size: 13px;
    margin-bottom: ${theme.spacing(2)};
  }
`

export const BottomBar = styled.div`
  position: absolute;
  left: ${theme.spacing(3)};
  right: ${theme.spacing(3)};
  bottom: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    margin-top: ${theme.spacing(2)};
    padding: 0;
  }
`

export const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.25)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1)};
  }
`

export const Dot = styled.button`
  width: 36px;
  height: 2px;
  border: none;
  background: ${(p) => (p.$active ? theme.colors.gray[800] : theme.colors.gray[300])};
  border-radius: 1px;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 28px;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1)};
  }
`

export const ArrowBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: ${theme.borderRadius.circle};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  color: ${theme.colors.gray[800]};
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: ${theme.fontSizes.large};

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 44px;
    height: 44px;
    font-size: ${theme.fontSizes.medium};
  }
`

export const RightDivider = styled.div`
  position: absolute;
  right: -25px;
  top: 10px;
  bottom: 20px;
  width: 0.5px;
  background: ${theme.colors.gray[400]};
  z-index: 5;

  @media (max-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`

// ========================================
// SHIMMER/SKELETON LOADING STYLES
// ========================================
const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`

export const SkeletonHeroWrap = styled.div`
  position: relative;
  width: 100%;
  background: ${theme.colors.background};
  padding: 0 ${theme.spacing(2.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(2.5)};
    padding: ${theme.spacing(2)};
  }
`

export const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    aspect-ratio: 16 / 10;
  }
`

export const SkeletonOverlay = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  width: min(80%, 800px);
  background: ${theme.colors.background};
  padding: ${theme.spacing(7.5)} ${theme.spacing(3)} ${theme.spacing(6.25)} ${theme.spacing(3)};
  min-height: 300px;
  margin: 0 ${theme.spacing(1.25)};
  z-index: 10;

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: min(80%, 600px);
    padding: ${theme.spacing(6.25)} ${theme.spacing(2.5)} ${theme.spacing(5)} ${theme.spacing(2.5)};
    min-height: 280px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    transform: none;
    left: auto;
    bottom: auto;
    width: 100%;
    margin: 0;
    padding: ${theme.spacing(2.5)} ${theme.spacing(2)};
    min-height: auto;
    background: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.gray[400]};
  }
`

export const SkeletonTitle = styled.div`
  width: 80%;
  height: 24px;
  margin: 0 auto ${theme.spacing(1.5)};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 90%;
    height: 20px;
    margin-left: 0;
  }
`

export const SkeletonExcerpt = styled.div`
  width: 90%;
  height: 16px;
  margin: 0 auto ${theme.spacing(1)};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`

export const SkeletonButtons = styled.div`
  position: absolute;
  left: ${theme.spacing(3)};
  right: ${theme.spacing(3)};
  bottom: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    margin-top: ${theme.spacing(2)};
  }
`

export const SkeletonDots = styled.div`
  display: flex;
  gap: ${theme.spacing(1.25)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1)};
  }
`

export const SkeletonDot = styled.div`
  width: 36px;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 28px;
  }
`

export const SkeletonArrows = styled.div`
  display: flex;
  gap: ${theme.spacing(1.5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(1)};
  }
`

export const SkeletonArrow = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${theme.borderRadius.circle};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 44px;
    height: 44px;
  }
`