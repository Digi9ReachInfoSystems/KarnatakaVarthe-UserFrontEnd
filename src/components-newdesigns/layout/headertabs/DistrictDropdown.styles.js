import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../../theme/Theme";

export const DistrictDropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.colors.white};
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1003;
  min-width: 800px;
  max-width: 90vw;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)'};
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.gray[200]};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  margin-top: ${theme.spacing(0.5)};

  @media (max-width: 1025px) {
    min-width: 600px;
    max-width: 95vw;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: 500px;
    max-width: 98vw;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: 90vw;
    left: 0;
    transform: ${props => props.isOpen ? 'translateX(0) translateY(0)' : 'translateX(0) translateY(-10px)'};
  }
`;

export const DistrictDropdownContent = styled.div`
  padding: ${theme.spacing(3)} ${theme.spacing(4)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2)} ${theme.spacing(2)};
  }
`;

export const DistrictGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing(1)} ${theme.spacing(2)};
  width: 100%;

  @media (max-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing(1)} ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(0.5)};
  }
`;

export const DistrictItem = styled.div`
  position: relative;
  padding: ${theme.spacing(1)} 0;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  transition: all ${theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.75)} 0;
  }
`;

export const DistrictLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  color: ${theme.colors.text};
  text-decoration: none;
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  transition: all ${theme.transitions.fast};
  text-align: center;
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes.small};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
    padding: ${theme.spacing(0.75)} ${theme.spacing(1)};
  }

  &:hover {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.kannada-text {
    font-weight: 600;
  }
`;
