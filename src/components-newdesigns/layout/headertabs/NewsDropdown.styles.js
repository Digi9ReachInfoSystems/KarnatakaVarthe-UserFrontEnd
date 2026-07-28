import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../../theme/Theme";
import {
  MediaDropdownContainer,
  MediaDropdownContent,
  MediaLink,
} from "./MediaDropdown.styles";

export const NewsDropdownContainer = styled(MediaDropdownContainer)`
  overflow: visible;
  z-index: 1003;
`;

export const NewsDropdownContent = styled(MediaDropdownContent)``;

export const NewsLink = styled(MediaLink)``;

export const DistrictNewsRow = styled.div`
  position: relative;
  width: 100%;
`;

/* Invisible bridge so the cursor can cross the gap without closing the submenu */
export const DistrictHoverBridge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 14px;
  z-index: 1004;
  background: transparent;
  pointer-events: auto;
  ${(props) =>
    props.$side === "left"
      ? "right: 100%; left: auto;"
      : "left: 100%; right: auto;"}
`;

export const DistrictNewsTrigger = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing(1.5)};
  padding: ${theme.spacing(1.25)} ${theme.spacing(2.5)};
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text};
  text-decoration: none;
  white-space: nowrap;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.gray[100]};
  transition: background-color ${theme.transitions.fast}, color ${theme.transitions.fast},
    box-shadow ${theme.transitions.fast};
  width: 100%;
  box-sizing: border-box;

  &:hover,
  &.open {
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

  svg {
    flex-shrink: 0;
  }
`;
