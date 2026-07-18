import styled, { css, keyframes } from "styled-components"
import theme from "../../../../../theme/Theme"

const shimmerAnimation = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`

const shimmerBg = css`
  background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
  background-size: 800px 104px;
  animation: ${shimmerAnimation} 1.5s infinite linear;
`

export const ShimmerContainer = styled.div`
  width: 100%;
`

export const ShimmerThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 14px;
  ${shimmerBg}
  margin-bottom: 10px;
`

export const ShimmerTitle = styled.div`
  height: 14px;
  width: 78%;
  border-radius: 4px;
  ${shimmerBg}
`

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 0 auto;
  padding: 8px 4px 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary || "#0070f3"};
    outline-offset: 2px;
  }
`

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(6)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing1(1)};
  }
`

export const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 20px);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 250px;
    height: 1px;
    background: ${theme.colors.gray[700]};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: clamp(18px, 2.3vw, 20px);

    &::after {
      width: 200px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(16px, 2vw, 18px);

    &::after {
      width: 150px;
    }
  }
`

export const ViewMoreLink = styled.a`
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-top: 1rem;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`

export const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 8px;
`

export const CarouselTrack = styled.div`
  display: grid;
  grid-auto-flow: column;
  /* Show 5 shorts at a time on desktop */
  grid-auto-columns: calc((100% - 48px) / 5);
  gap: 12px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 4px 0 14px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1280px) {
    grid-auto-columns: calc((100% - 36px) / 4);
  }

  @media (max-width: 1024px) {
    grid-auto-columns: calc((100% - 24px) / 3);
  }

  @media (max-width: 768px) {
    grid-auto-columns: calc((100% - 12px) / 2);
  }

  @media (max-width: 640px) {
    grid-auto-columns: min(78%, 220px);
  }
`

export const VideoCard = styled.article`
  width: 100%;
  min-width: 0;
  scroll-snap-align: start;
  cursor: pointer;
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
`

export const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 14px;
  overflow: hidden;
  background: #0f0f0f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  ${VideoCard}:hover & {
    transform: translateY(-3px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
  }
`

export const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.05) 40%,
    rgba(0, 0, 0, 0.45) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

export const PlayButton = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ff0033;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(255, 0, 51, 0.35);

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 14px solid #fff;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    margin-left: 3px;
  }
`

export const ShortsBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  background: rgba(15, 15, 15, 0.82);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 3px 8px;
  border-radius: 6px;
`

export const VideoInfo = styled.div`
  padding: 10px 2px 0;
`

export const VideoTitle = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  color: #0f0f0f;
  font-family: ${theme.fonts.body};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const NavigationButton = styled.button`
  position: absolute;
  top: 42%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}
  z-index: 10;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #0f0f0f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-50%) scale(1.06);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 34px;
    height: 34px;
  }
`
