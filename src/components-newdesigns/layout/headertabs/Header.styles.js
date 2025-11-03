import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../../theme/Theme";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  overflow: visible;
  background-color: ${theme.colors.background};
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid ${theme.colors.gray[300]};
  border-top: 1px solid ${theme.colors.gray[300]};
`;

export const Container = styled.div`
  max-width: 95%;
  margin: 0 auto;
  padding: 0 ${theme.spacing(2)};

  @media (max-width: 1024px) {
    max-width: 98%;
    padding: 0 ${theme.spacing(1.5)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    padding: 0 ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing(0.5)};
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  gap: ${theme.spacing(1)};

  @media (min-width: 1040px) and (max-width: 1391px) {
    height: 52px;
    gap: ${theme.spacing(0.75)};
  }

  @media (max-width: 1039px) {
    height: 48px;
    gap: ${theme.spacing(0.5)};
  }
`;

export const MobileMenuButton = styled.button`
  display: block;
  padding: ${theme.spacing(1)};
  background: none;
  border: none;
  cursor: pointer;
  border-radius: ${theme.borderRadius.small};
  transition: background-color ${theme.transitions.fast};
  color: ${theme.colors.text};

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (min-width: 1025px) {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.5)};
  }
`;

export const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${theme.spacing(1)};
  flex: 1;
  min-width: 0;

  @media (min-width: 1026px) {
    display: flex;
  }

  @media (min-width: 1040px) and (max-width: 1391px) {
    gap: ${theme.spacing(0.5)};
    flex-shrink: 1;
  }
`;

export const NavItem = styled.div`
  position: relative;
  flex-shrink: 1;
  min-width: 0;
`;

export const NavLinkStyled = styled(NavLink)`
  position: relative;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  color: ${theme.colors.text};
  text-decoration: none;
  border-radius: ${theme.borderRadius.small};
  transition: all 0.2s ease;
  display: block;
  white-space: nowrap;

  @media (min-width: 1040px) and (max-width: 1391px) {
    padding: ${theme.spacing(0.625)} ${theme.spacing(1.25)};
    font-size: clamp(10px, 0.85vw, 13px);
  }

  @media (max-width: 1039px) {
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
    font-size: 11px;
  }

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.active {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-radius: 0;
  }

  &.kannada-text {
    font-weight: 700;
    
    @media (min-width: 1040px) and (max-width: 1391px) {
      font-size: clamp(10px, 0.85vw, 13px);
    }

    @media (max-width: 1039px) {
      font-size: 11px;
    }
  }
`;

export const ActiveIndicator = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -6px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${theme.colors.primary};
`;

export const LoginButton = styled(NavLink)`
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  background-color: #E9F1FF;
  font-size: ${theme.fontSizes.small};
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  font-family: ${theme.fonts.body};
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;
  
  @media (min-width: 1040px) and (max-width: 1391px) {
    font-size: clamp(9px, 0.8vw, 11px);
    padding: ${theme.spacing(0.625)} ${theme.spacing(1.25)};
  }

  @media (max-width: 1039px) {
    font-size: 10px;
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  }

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.kannada-text {
    font-weight: 700;
  }
`;

// Overlay for mobile sidebar
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (min-width: 1025px) {
    display: none;
  }
`;

// Mobile sidebar navigation
export const MobileNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background-color: ${theme.colors.white};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 260px;
    max-width: 90vw;
  }
`;

// Sidebar header with close button
export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${theme.spacing(1)} ${theme.spacing(1)};
  background-color: ${theme.colors.white};
`;

// Close button for sidebar
export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text || '#000000'};
  cursor: pointer;
  padding: ${theme.spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.small};
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.gray[100]};
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${theme.colors.gray[200]};
  }
`;

export const MobileNavContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(3)} 0;
  gap: ${theme.spacing(1)};
  flex: 1;
`;

export const MobileNavItem = styled.div`
  width: 100%;
  position: relative;
`;

export const MobileNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing(2)} ${theme.spacing(3)};
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  color: ${theme.colors.text};
  text-decoration: none;
  transition: all ${theme.transitions.fast};
  border-radius: ${theme.borderRadius.small};
  margin: 0 ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
    font-size: ${theme.fontSizes.small};
    margin: 0 ${theme.spacing(1)};
  }

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &.active {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-weight: 600;
    border-radius: 0;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid ${theme.colors.primary};
    }

    &:hover {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
    }
  }

  &:active {
    background-color: ${theme.colors.gray[200]};
  }

  &.active:active {
    background-color: ${theme.colors.primary};
  }

  &.kannada-text {
    font-weight: 700;
    font-size: ${theme.fontSizes.medium};

    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.fontSizes.small};
    }
  }

  &.active.kannada-text {
    font-weight: 700;
  }
`;

// Additional utility styles
export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  color: ${theme.colors.primary};

  @media (max-width: 1024px) {
    font-size: ${theme.fontSizes.medium};
    gap: ${theme.spacing(0.5)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};

  @media (max-width: 1024px) {
    gap: ${theme.spacing(1)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(0.5)};
  }
`;

// Animation keyframes
export const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const slideIn = `
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

// Mobile menu animation
export const AnimatedMobileNav = styled(MobileNav)`
  animation: ${slideIn} 0.3s ease-out;
`;

// Responsive breakpoints
export const mediaQueries = {
  mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  tablet: `@media (min-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop})`,
  large: `@media (min-width: ${theme.breakpoints.large})`,
};

// Profile dropdown styles
export const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1001;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  font-size: 18px;
  flex-shrink: 0;
  
  @media (min-width: 1040px) and (max-width: 1391px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  @media (max-width: 1039px) {
    width: 34px;
    height: 34px;
    font-size: 15px;
  }

  &:hover {
    background-color: #1565C0;
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  svg {
    width: 24px;
    height: 24px;

    @media (min-width: 1040px) and (max-width: 1391px) {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 1039px) {
      width: 18px;
      height: 18px;
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 200px;
  z-index: 1002;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.gray[200]};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: 180px;
    right: -8px;
  }
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    font-size: ${theme.fontSizes.small};
    gap: ${theme.spacing(1)};
  }

  &:first-child {
    border-radius: ${theme.borderRadius.medium} ${theme.borderRadius.medium} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${theme.borderRadius.medium} ${theme.borderRadius.medium};
  }

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }

  svg {
    width: 18px;
    height: 18px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 16px;
      height: 16px;
    }
  }

  &.kannada-text {
    font-weight: 600;
  }
`;

export const DropdownLink = styled(NavLink)`
  width: 100%;
  padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  text-decoration: none;
  font-family: ${theme.fonts.body};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    font-size: ${theme.fontSizes.small};
    gap: ${theme.spacing(1)};
  }

  &:first-child {
    border-radius: ${theme.borderRadius.medium} ${theme.borderRadius.medium} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${theme.borderRadius.medium} ${theme.borderRadius.medium};
  }

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }

  svg {
    width: 18px;
    height: 18px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      width: 16px;
      height: 16px;
    }
  }

  &.kannada-text {
    font-weight: 600;
  }
`;

export const UserInfo = styled.div`
  padding: ${theme.spacing(2)};
  border-bottom: 1px solid ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
  }
`;

export const UserName = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.medium};
  margin-bottom: ${theme.spacing(0.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.small};
  }
`;

export const UserEmail = styled.div`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.gray[600]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 11px;
  }
`;
