import styled, { keyframes } from "styled-components"
import theme from "../../../../../theme/Theme"

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const popIn = keyframes`
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

/* Matches FlexContainer column stack + horizontal reel carousel */
const STACK_BREAKPOINT = "1026px"
const TABLET_BREAKPOINT = theme.breakpoints.tablet /* 850px */
const MOBILE_BREAKPOINT = theme.breakpoints.mobile /* 480px */

export const ReelsAside = styled.aside`
  background: transparent;
  overflow: visible;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  @media (max-width: ${STACK_BREAKPOINT}) {
    align-items: center;
  }
`

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 0;
  background: transparent;
  box-shadow: none;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${STACK_BREAKPOINT}) {
    margin-bottom: 20px;
    max-width: 100%;
    width: 100%;
    align-self: stretch;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 16px;
    max-width: 100%;
    width: 100%;
    gap: 8px;
    padding: 0 4px;
  }
`

export const ReelsHeader = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 20px);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
  flex: 1;
  min-width: 0;
  text-align: left;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 120px;
    height: 1px;
    background: ${theme.colors.gray[700]};
  }

  @media (max-width: ${STACK_BREAKPOINT}) {
    &::after {
      width: min(160px, 40%);
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;

    &::after {
      width: min(140px, 45%);
    }
  }
`

export const ViewMoreLink = styled.a`
  flex-shrink: 0;
  font-family: ${theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.primary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  padding: 0;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }
`

export const ReelStage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 12px;
  overflow: visible;

  @media (max-width: ${STACK_BREAKPOINT}) {
    padding: 8px 12px 56px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 4px 8px 52px;
  }
`

export const ReelCardShell = styled.div`
  position: relative;
  width: 100%;
  max-width: min(298px, 100%, calc(72vh * 9 / 16));
  margin: 0 auto;
  overflow: visible;

  @media (max-width: ${STACK_BREAKPOINT}) {
    max-width: min(300px, 72vw, calc(68vh * 9 / 16));
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    max-width: min(280px, 78vw, calc(65vh * 9 / 16));
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-width: min(260px, calc(100vw - 48px), calc(62vh * 9 / 16));
  }
`

export const ShortsPanel = styled.div`
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 9 / 16;
  height: auto;
  max-height: none;
  flex: 0 0 auto;
  padding: 0;
  box-sizing: border-box;
  border-radius: 0;
  position: relative;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.14);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 0;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  }
`

export const NavArrowGroup = styled.div`
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (max-width: ${STACK_BREAKPOINT}) {
    flex-direction: row;
    left: 50%;
    top: auto;
    bottom: -48px;
    transform: translateX(-50%);
    gap: 12px;
  }
`

export const NavArrow = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000000;
  background: #fff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
  transition: background 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
  opacity: 1;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover:not(:disabled) {
    background: #f8fafc;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.16);
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
    color: #000000;
    stroke: #000000;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 34px;
    height: 34px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const ShortsScrollList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1 1 auto;
  min-height: 0;
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
  overscroll-behavior: contain;
  border-radius: inherit;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  @media (max-width: ${STACK_BREAKPOINT}) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
`

export const ShortCardWrap = styled.li`
  flex: 0 0 100%;
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  width: 100%;
  display: block;
  box-sizing: border-box;

  @media (max-width: ${STACK_BREAKPOINT}) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 100%;
    scroll-snap-align: center;
    padding: 0;
  }
`

export const ShortCard = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
  cursor: pointer;
  position: relative;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
  }
`

export const VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    display: block;
  }
`

export const ThumbnailWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #000;
`

export const ReelsBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: rgba(15, 15, 15, 0.82);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 3px 8px;
  border-radius: 6px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    top: 10px;
    left: 10px;
    font-size: 10px;
    padding: 2px 7px;
  }
`

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
`

export const PlayIcon = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
  animation: ${popIn} 0.3s ease;
  transition: transform 0.2s ease;

  ${ShortCard}:hover & {
    transform: scale(1.08);
  }

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    margin-left: 3px;
    border-style: solid;
    border-width: 8px 0 8px 13px;
    border-color: transparent transparent transparent ${theme.colors.primary};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 40px;
    height: 40px;

    &::after {
      border-width: 7px 0 7px 12px;
      margin-left: 2px;
    }
  }
`

export const ShimmerScrollList = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  width: 100%;
  display: flex;
  background: #f0f0f0;
  border-radius: inherit;
`

export const ShimmerCard = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(90deg, #ececec 25%, #f7f7f7 50%, #ececec 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`

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
  padding: 16px;
  min-height: 200px;
`
