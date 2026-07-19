import styled, { keyframes } from "styled-components"
import theme from "../../../theme/Theme"

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`

export const VideoContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing1(9)} ${theme.spacing1(15)};
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(6)} ${theme.spacing1(8)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(4)} ${theme.spacing1(4)};
  }
`

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(6)};
`

export const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 180px;
    height: 1px;
    background: ${theme.colors.gray[700]};
  }
`

export const VideoGridCard = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
`

export const VideoCard = styled.button`
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: #0f0f0f;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  }
`

export const VideoThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  background: #ff0033;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 6px 16px rgba(255, 0, 51, 0.35);
  pointer-events: none;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 14px solid #fff;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    margin-left: 3px;
  }

  ${VideoCard}:hover & {
    transform: translate(-50%, -50%) scale(1.08);
  }
`

export const VideoTitle = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 28px 10px 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  z-index: 2;
`

export const ShimmerContainer = styled.div`
  aspect-ratio: 9 / 16;
  border-radius: 14px;
  overflow: hidden;
  background: #f0f0f0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 468px 100%;
    animation: ${shimmer} 1.5s infinite linear;
  }
`

export const ShimmerThumbnail = styled.div`
  width: 100%;
  height: 100%;
`

export const EmptyState = styled.p`
  grid-column: 1 / -1;
  color: #737791;
  font-size: 15px;
`
