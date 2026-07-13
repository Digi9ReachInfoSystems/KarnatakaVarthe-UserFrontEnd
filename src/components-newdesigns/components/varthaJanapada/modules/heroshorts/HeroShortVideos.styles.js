import styled, { keyframes } from "styled-components";
import theme from "../../../../../theme/Theme";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const popIn = keyframes`
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

export const ShortsPanel = styled.aside`
  background-color: #000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing1(1)};
  height: 500px;
  padding: 0;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: none;
  border: none;
  width: 100%;
  position: relative;

  @media (max-width: 850px) {
    margin-top: 0;
    height: 420px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 420px;
  }
`;

export const NavArrowGroup = styled.div`
  position: absolute;
  right: 10px;
  bottom: 12px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const NavArrow = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  transition: background 0.2s ease, opacity 0.2s ease;
  opacity: 0.9;

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.75);
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ShortsScrollList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: #000;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  /* Mobile / narrow hero: horizontal scroll like bottom Shorts section */
  @media (max-width: 850px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
`;

export const ShortCardWrap = styled.li`
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100%;
  min-height: 100%;
  width: 100%;
  display: block;
  box-sizing: border-box;

  @media (max-width: 850px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 100%;
    scroll-snap-align: center;
    padding: 0;
  }
`;

export const ShortCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
  background-color: #000;
  cursor: pointer;
  position: relative;
  box-shadow: none;
  border: none;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  @media (max-width: 850px) {
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
  }
`;

export const VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  background: #000;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`;

export const ThumbnailWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.02) 45%,
    rgba(0, 0, 0, 0.45) 100%
  );
  transition: background 0.25s ease;

  ${ShortCard}:hover & {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.1) 45%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }
`;

export const PlayIcon = styled.span`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  animation: ${popIn} 0.3s ease;
  transition: transform 0.2s ease;

  ${ShortCard}:hover & {
    transform: scale(1.1);
  }

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    margin-left: 4px;
    border-style: solid;
    border-width: 10px 0 10px 16px;
    border-color: transparent transparent transparent ${theme.colors.primary};
  }
`;

export const ShimmerScrollList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: #000;

  @media (max-width: 850px) {
    overflow-x: auto;
  }
`;

export const ShimmerCard = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  border-radius: 0;
  background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (max-width: 850px) {
    min-width: 100%;
  }
`;

export const LoadingText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-style: italic;
`;

export const ErrorText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.error || "#dc3545"};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  background-color: rgba(220, 53, 69, 0.08);
  border-radius: 0;
`;
