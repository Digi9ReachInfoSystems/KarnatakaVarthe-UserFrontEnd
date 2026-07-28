import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../../theme/Theme";

export const MediaDropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  right: auto;
  background-color: ${theme.colors.white};
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.06);
  z-index: 1003;
  min-width: 160px;
  width: max-content;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isOpen
      ? "translateX(-50%) translateY(0)"
      : "translateX(-50%) translateY(-10px)"};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  border: 1px solid ${theme.colors.gray[200]};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
`;

export const MediaDropdownContent = styled.div`
  padding: ${theme.spacing(1.5)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`;

export const MediaLink = styled(Link)`
  display: block;
  padding: ${theme.spacing(1.25)} ${theme.spacing(2.5)};
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.gray[100]};
  transition: background-color ${theme.transitions.fast}, color ${theme.transitions.fast},
    box-shadow ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.primary};
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.kannada-text {
    font-weight: 600;
  }
`;
