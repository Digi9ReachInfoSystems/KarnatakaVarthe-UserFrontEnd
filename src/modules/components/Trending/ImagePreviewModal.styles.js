import styled from "styled-components";
import theme from "../../../theme/Theme";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.open {
    opacity: 1;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: ${theme.spacing(1)};
  z-index: 1001;
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: -35px;
    font-size: 1.5rem;
  }
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${theme.spacing(1)};
`;

export const ImageInfo = styled.div`
  color: white;
  padding: ${theme.spacing(2)};
  text-align: center;
  font-size: ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
  }
`;

export const NavigationArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === "left" ? "left: 15px;" : "right: 15px;")}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  z-index: 10;
  transition: background 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 35px;
    height: 35px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }
`;
