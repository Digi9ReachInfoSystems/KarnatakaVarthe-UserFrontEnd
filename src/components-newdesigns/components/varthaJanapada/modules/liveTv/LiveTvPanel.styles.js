import styled, { keyframes } from "styled-components";
import theme from "../../../../../theme/Theme";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/** Wraps Live TV + Latest News so HeroLayout still sees 3 children. */
export const NewsColumnStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing1(2)};
  width: 100%;
  min-width: 0;
  height: 500px;
  margin-top: ${theme.spacing1(1)};
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: 0;
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: auto;
    gap: ${theme.spacing1(1.5)};
  }
`;

export const LiveCard = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 170px;
  border-radius: ${theme.borderRadius.medium || "8px"};
  overflow: hidden;
  background: #0f0f0f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  cursor: ${(props) => (props.$offline ? "default" : "pointer")};

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 160px;
  }

  /* Taller player on mobile so the stream is readable */
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: auto;
    aspect-ratio: 16 / 9;
    min-height: 200px;
  }
`;

export const ComingSoon = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  text-align: center;
  background: linear-gradient(145deg, #1a1f36 0%, #0f1324 55%, #1b2338 100%);
  color: #fff;
`;

export const ComingSoonLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fbbf24;
  font-family: ${theme.fonts.heading};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const ComingSoonTitle = styled.p`
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(16px, 2.4vw, 20px);
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
`;

export const ComingSoonHint = styled.p`
  margin: 0;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  max-width: 260px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;

  ${LiveCard}:hover & {
    transform: scale(1.03);
  }
`;

export const LiveBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: #e11d48;
  font-family: ${theme.fonts.heading};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #e11d48;
    animation: ${pulse} 1.4s ease-in-out infinite;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 8px;
    left: 8px;
    padding: 3px 8px;
    font-size: 10px;
  }
`;

export const PlayButton = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 52px;
  height: 52px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #ff0033;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(255, 0, 51, 0.4);
  pointer-events: none;
  transition: transform 0.2s ease;

  ${LiveCard}:hover & {
    transform: translate(-50%, -50%) scale(1.08);
  }

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 16px solid #fff;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    margin-left: 4px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 44px;
    height: 44px;

    &::after {
      border-left-width: 13px;
      border-top-width: 8px;
      border-bottom-width: 8px;
    }
  }
`;

export const PlayerFrame = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #000;
`;

export const ShimmerCard = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 170px;
  border-radius: ${theme.borderRadius.medium || "8px"};
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 160px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: auto;
    aspect-ratio: 16 / 9;
    min-height: 200px;
  }
`;
