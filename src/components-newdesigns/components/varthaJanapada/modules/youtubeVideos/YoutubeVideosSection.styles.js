import styled, { keyframes } from "styled-components";
import theme from "../../../../../theme/Theme";

export const Section = styled.section`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
  scroll-margin-top: 120px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: nowrap;
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(4)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing1(1)};
    padding-bottom: ${theme.spacing1(3)};
    gap: 8px;
  }
`;

export const Heading = styled.h2`
  margin: 0;
  position: relative;
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 20px);
  font-weight: 700;
  flex: 1;
  min-width: 0;

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
      width: 120px;
    }
  }
`;

export const MoreLink = styled.a`
  display: inline-block;
  flex-shrink: 0;
  margin: 0;
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`;

export const MainCard = styled.button`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 300px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #0f0f0f;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  @media (min-width: ${theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    height: 500px;
  }
`;

export const SmallGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

export const SmallCard = styled.button`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 150px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #0f0f0f;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: ${theme.breakpoints.tablet}) {
    height: 190px;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    height: 244px;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;

  ${MainCard}:hover &,
  ${SmallCard}:hover & {
    transform: scale(1.04);
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

export const PlayButton = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => (props.$small ? "46px" : "64px")};
  height: ${(props) => (props.$small ? "46px" : "64px")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #ff0033;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(255, 0, 51, 0.4);
  pointer-events: none;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: ${(props) => (props.$small ? "13px" : "18px")} solid #fff;
    border-top: ${(props) => (props.$small ? "8px" : "11px")} solid transparent;
    border-bottom: ${(props) => (props.$small ? "8px" : "11px")} solid
      transparent;
    margin-left: 4px;
  }
`;

const shimmer = keyframes`
  from { background-position: -500px 0; }
  to { background-position: 500px 0; }
`;

export const Skeleton = styled.div`
  height: ${(props) => (props.$main ? "500px" : "244px")};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    #eeeeee 0%,
    #f7f7f7 50%,
    #eeeeee 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

export const Empty = styled.p`
  color: #737791;
`;
