import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../../theme/Theme";

const GAP = "10px";

export const DistrictDropdownContainer = styled.div`
  position: absolute;
  z-index: 1005;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.primary} #eef3f8;
  transition: opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #eef3f8;
    border-radius: 999px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.Footerbg};
  }

  ${(props) => {
    if (props.$variant === "flyout") {
      const side = props.$side === "left" ? "left" : "right";
      const width =
        props.$panelWidth != null
          ? `${props.$panelWidth}px`
          : "min(900px, 70vw)";
      const maxHeight = props.$panelMaxHeight || "70vh";
      const openTransform = "translateX(0) translateY(0)";
      const closedTransform =
        side === "left"
          ? "translateX(6px) translateY(0)"
          : "translateX(-6px) translateY(0)";

      return `
        top: 0;
        ${
          side === "left"
            ? `right: calc(100% + ${GAP}); left: auto;`
            : `left: calc(100% + ${GAP}); right: auto;`
        }
        width: ${width};
        max-width: min(900px, calc(100vw - 32px));
        max-height: ${maxHeight};
        transform: ${props.isOpen ? openTransform : closedTransform};
      `;
    }

    return `
      top: calc(100% + 8px);
      left: 50%;
      width: min(900px, calc(100vw - 48px));
      max-width: calc(100vw - 48px);
      max-height: 70vh;
      transform: ${
        props.isOpen
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-8px)"
      };
    `;
  }}
`;

export const DistrictDropdownContent = styled.div`
  padding: 28px 32px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;

  @media (max-width: 1199px) {
    padding: 24px 28px;
  }

  @media (max-width: 1023px) {
    padding: 22px 24px;
  }

  @media (max-width: 767px) {
    padding: 20px 16px;
  }
`;

export const DistrictGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 40px;
  row-gap: 20px;
  width: 100%;
  max-width: 100%;
  align-items: start;
  box-sizing: border-box;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 28px;
    row-gap: 16px;
  }

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 24px;
    row-gap: 14px;
  }

  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
    column-gap: 0;
    row-gap: 10px;
  }
`;

export const DistrictItem = styled.div`
  position: relative;
  min-width: 0;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &:not(:nth-child(4n))::after {
    content: "";
    position: absolute;
    top: 6px;
    bottom: 6px;
    right: -20px;
    width: 1px;
    background: #f1f3f5;
    pointer-events: none;
  }

  @media (max-width: 1199px) {
    &:not(:nth-child(4n))::after {
      display: none;
    }

    &:not(:nth-child(3n))::after {
      content: "";
      display: block;
      position: absolute;
      top: 6px;
      bottom: 6px;
      right: -14px;
      width: 1px;
      background: #f1f3f5;
      pointer-events: none;
    }
  }

  @media (max-width: 1023px) {
    &:not(:nth-child(3n))::after {
      display: none;
    }

    &:not(:nth-child(2n))::after {
      content: "";
      display: block;
      position: absolute;
      top: 6px;
      bottom: 6px;
      right: -12px;
      width: 1px;
      background: #f1f3f5;
      pointer-events: none;
    }
  }

  @media (max-width: 767px) {
    &::after {
      display: none !important;
    }
  }
`;

export const DistrictLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 44px;
  padding: 10px 12px;
  color: ${theme.colors.text};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
  transition: all 0.2s ease;

  @media (max-width: 1023px) {
    font-size: 15px;
    min-height: 42px;
    padding: 8px 10px;
  }

  @media (max-width: 767px) {
    font-size: 15px;
    min-height: 44px;
    justify-content: center;
    text-align: center;
  }

  &:hover {
    background-color: #f5f8fc;
    color: ${theme.colors.primary};
    border-radius: 8px;
  }

  &.active {
    background-color: rgba(30, 136, 229, 0.08);
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.kannada-text {
    font-weight: 600;
    line-height: 1.5;
  }
`;
