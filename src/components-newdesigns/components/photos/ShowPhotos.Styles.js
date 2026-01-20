import theme from "../../../theme/Theme";
import styled, { keyframes } from "styled-components";
export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing1(9)} ${theme.spacing1(15)};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing1(2)};
  padding-bottom: ${theme.spacing1(6)};
  position: relative;
  flex-wrap: nowrap;
  gap: ${theme.spacing1(3)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    gap: ${theme.spacing1(2)};
    padding-bottom: ${theme.spacing1(4)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${theme.spacing1(1)};
    gap: ${theme.spacing1(2)};
    padding-bottom: ${theme.spacing1(3)};
  }
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 20px);
  font-weight: 700;
  color: ${theme.colors.primary};
  margin: 0;
  position: relative;
  flex-shrink: 0;
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
`;

export const Photos = styled.div`
  width: 100%;
  padding: ${theme.spacing1(9)} ${theme.spacing1(15)};
  box-sizing: border-box;
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(6)} ${theme.spacing1(8)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(4)} ${theme.spacing1(4)};
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }
`;

export const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 1/1.4;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  &:active {
    transform: translateY(-2px);
  }
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

export const PhotoLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const ShimmerContainer = styled.div`
  width: 100%;
`;

export const ShimmerThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 1/1.4;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #e8e8e8 40px,
    #f0f0f0 80px
  );
  background-size: 600px 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CategoryTabsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${theme.spacing1(4)};
  width: 100%;
  padding: 0 ${theme.spacing1(15)};
  box-sizing: border-box;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing1(8)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing1(4)};
    margin-bottom: ${theme.spacing1(3)};
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing1(1.5)};
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  flex: 1;
  justify-content: flex-start;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(1)};
  }
`;

export const CategoryTab = styled.button`
  position: relative;
  background: ${(props) => (props.active ? theme.colors.primary : "transparent")};
  border: 1px solid ${(props) => (props.active ? theme.colors.primary : theme.colors.gray[300])};
  color: ${(props) => (props.active ? theme.colors.white : theme.colors.textDark)};
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: ${(props) => (props.active ? "600" : "500")};
  padding: ${theme.spacing1(1.5)} ${theme.spacing1(3)};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.body};
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => (props.active ? theme.colors.primary : theme.colors.gray[100])};
    border-color: ${(props) => (props.active ? theme.colors.primary : theme.colors.gray[400])};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(12px, 1.3vw, 14px);
    padding: ${theme.spacing1(1)} ${theme.spacing1(2)};
  }
`;

export const ScrollButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: ${theme.colors.textDark};
  flex-shrink: 0;
  transition: all 0.2s ease;
  z-index: 2;

  ${(props) =>
    props.direction === "left" &&
    `
    margin-right: ${theme.spacing1(1)};
  `}

  ${(props) =>
    props.direction === "right" &&
    `
    margin-left: ${theme.spacing1(1)};
  `}

  &:hover {
    background: ${theme.colors.primary};
    color: white;
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${theme.colors.gray[100]};
      color: ${theme.colors.textDark};
      border-color: ${theme.colors.gray[300]};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }
`;

export const CategoryDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  gap: ${theme.spacing1(1)};
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-left: auto;
    margin-top: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 0;
    width: 100%;
    margin-left: 0;
    background: ${theme.colors.gray[50]};
    padding: ${theme.spacing1(2)};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const FilterLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(0.5)};
  font-size: clamp(13px, 1.4vw, 15px);
  font-weight: 600;
  color: ${theme.colors.textDark};
  font-family: ${theme.fonts.body};
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    font-size: 14px;
    margin-bottom: ${theme.spacing1(1)};
    color: ${theme.colors.textDark};
    width: 100%;
  }
`;

export const CategorySelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 200px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    min-width: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: 100%;
    width: 100%;
  }
`;

export const CategorySelect = styled.select`
  width: 100%;
  padding: ${theme.spacing1(2)} ${theme.spacing1(4)} ${theme.spacing1(2)} ${theme.spacing1(3)};
  padding-right: ${theme.spacing1(6)};
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 12px;
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 500;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.textDark};
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing1(2.5)} center;
  background-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.gray[50]};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: ${theme.colors.white};
  }

  &:active {
    transform: translateY(0);
  }

  option {
    padding: ${theme.spacing1(2.5)};
    font-size: clamp(14px, 1.5vw, 16px);
    font-weight: 500;
    background-color: ${theme.colors.white};
    color: ${theme.colors.textDark};
    min-height: 44px; /* Better touch target for mobile */
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    padding: ${theme.spacing1(1.75)} ${theme.spacing1(5)} ${theme.spacing1(1.75)} ${theme.spacing1(2.5)};
    font-size: clamp(14px, 1.4vw, 15px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2.5)} ${theme.spacing1(5)} ${theme.spacing1(2.5)} ${theme.spacing1(3)};
    font-size: 16px; /* Prevent zoom on iOS */
    border-radius: 12px;
    border-width: 2px;
    min-height: 48px; /* Better touch target */
    background-color: ${theme.colors.white};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    -webkit-tap-highlight-color: transparent;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.12);
      border-color: ${theme.colors.primary};
    }

    &:active {
      transform: scale(0.98);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
`;