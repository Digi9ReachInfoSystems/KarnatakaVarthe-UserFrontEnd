import styled from "styled-components";
import theme from "../../../theme/Theme";

export const ServiceDropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  right: auto;
  background-color: ${theme.colors.white};
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.06);
  z-index: 1003;
  width: min(620px, calc(100vw - 32px));
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transform: ${props =>
    props.isOpen
      ? `translateX(calc(-50% + ${props.$offsetX || 0}px)) translateY(0)`
      : `translateX(calc(-50% + ${props.$offsetX || 0}px)) translateY(-10px)`};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  border: 1px solid ${theme.colors.gray[200]};
  pointer-events: ${props => (props.isOpen ? "auto" : "none")};
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: calc(100vw - 32px);
    left: 50%;
  }
`;

export const ServiceDropdownContent = styled.div`
  padding: ${theme.spacing(0.5)} 0;
`;

export const ServiceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 1025px) {
    max-height: ${props => (props.$hasMore ? "360px" : "none")};
    overflow-y: ${props => (props.$hasMore ? "auto" : "visible")};
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.gray[400]} ${theme.colors.gray[100]};

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.gray[100]};
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.gray[400]};
      border-radius: 4px;
    }
  }
`;

export const ServiceRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
  border-bottom: 1px solid ${theme.colors.gray[100]};
  min-height: 56px;
  box-sizing: border-box;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.75)} ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
    min-height: 52px;
  }
`;

export const ServiceTitle = styled.span`
  flex: 1;
  min-width: 0;
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  color: ${theme.colors.text};
  line-height: 1.45;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &.kannada-text {
    font-weight: 600;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
  }
`;

export const ServiceLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 600;
  font-size: ${theme.fontSizes.small};
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(0.5)};
  min-width: 88px;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.kannada-text {
    font-weight: 700;
  }
`;

export const ShowMoreButton = styled.button`
  width: 100%;
  padding: ${theme.spacing(1.75)} ${theme.spacing(2)};
  border: none;
  border-top: 1px solid ${theme.colors.gray[200]};
  background: ${theme.colors.gray[50]};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  font-family: ${theme.fonts.body};
  cursor: pointer;
  text-align: center;
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }

  &.kannada-text {
    font-weight: 700;
  }
`;

export const ServiceLoading = styled.div`
  padding: ${theme.spacing(3)};
  text-align: center;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.small};
`;
