import styled, { css } from "styled-components"
import theme from "../../theme/Theme"

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  will-change: opacity, visibility;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
    opacity: 1;
    visibility: visible;
  `}
`

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $isScrolled }) => $isScrolled ? theme.colors.primary : 'transparent'};
  padding: ${theme.spacing(0.5)} ${theme.spacing(4)};
  position: sticky;
  top: 0;
  z-index: 998;
  width: ${({ $isScrolled }) => $isScrolled ? '100%' : '95%'};
  margin: ${({ $isScrolled }) => $isScrolled ? '0' : '0 auto'};
  box-sizing: border-box;
  transition: all 0.3s ease;
  box-shadow: ${({ $isScrolled }) => $isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none'};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)} ${theme.spacing(2)};
    justify-content: space-between;
  }
`

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-left: auto;
`

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: ${theme.spacing(2)};
  margin-bottom: 0;
  position: sticky;
  top: 0;
  background-color: ${theme.colors.primary};
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

export const CloseButton = styled.button`
  background: ${theme.colors.background};
  border: none;
  color: ${theme.colors.primary};
  cursor: pointer;
  padding: ${theme.spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  border-radius: 50%;

  &:hover {
    transform: rotate(90deg);
    background-color: ${theme.colors.background};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.background};
  }

  &:active {
    transform: scale(0.9) rotate(90deg);
  }
`

export const HamburgerMenu = styled.button`
  cursor: pointer;
  color: ${({ $isScrolled }) => $isScrolled ? theme.colors.background : '#333333'};
  padding: ${theme.spacing(1)};
  z-index: 101;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }

  &:active {
    transform: scale(0.95);
  }
`

export const TabsWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  flex-wrap: nowrap;
  padding: ${theme.spacing(0.8)} 0;
  scroll-behavior: smooth;
  max-width: 100%;
  transition: transform 0.3s ease;
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(0.5)};
  }
  ${({ $isMobile }) =>
    $isMobile &&
    css`
    flex-direction: column;
    background-color: ${theme.colors.primary};
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 85%;
    max-width: 360px;
    padding: 0;
    z-index: 1000;
    gap: 0;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    will-change: transform;
    overscroll-behavior: contain;
    touch-action: pan-y;
    ${({ $isOpen }) =>
      $isOpen &&
      css`
      transform: translateX(0);
    `}
  `}
`

export const MobileMenuContent = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  overflow-y: auto;
  padding: ${theme.spacing(2)};
  padding-top: ${theme.spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background-color: ${theme.colors.primary};

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const TabIndicator = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: ${({ $isScrolled }) => $isScrolled ? theme.colors.background : '#007BFF'};
  border-radius: 3px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
    width: 5px;
    height: 100%;
    right: -10px;
    left: auto;
    bottom: 0;
  `}
`

export const TabItem = styled.div`
  padding: ${theme.spacing(1.2)} ${theme.spacing(2)};
  cursor: pointer;
  font-family: ${theme.fonts.heading};
  font-size: inherit;
  font-weight: bold;
  white-space: nowrap;
  color: ${({ $active, $isScrolled }) => {
    if ($active) {
      return $isScrolled ? theme.colors.primary : '#ffffff';
    }
    return $isScrolled ? theme.colors.background : '#666666';
  }};
  background-color: ${({ $active, $isScrolled }) => {
    if ($active) {
      return $isScrolled ? theme.colors.background : '#007BFF';
    }
    return 'transparent';
  }};
  border-radius: ${theme.spacing(1.3)};
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  position: relative;
  overflow: hidden;

  ${({ $isScrolled }) =>
    $isScrolled &&
    css`
      padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    `}
  &:hover {
    background-color: ${({ $active, $isScrolled }) => {
      if ($active) {
        return $isScrolled ? theme.colors.background : '#007BFF';
      }
      return $isScrolled ? theme.colors.background : '#f0f0f0';
    }};
    color: ${({ $isScrolled }) => $isScrolled ? theme.colors.primary : '#333333'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
  ${({ $isMobile }) =>
    $isMobile &&
    css`
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    border-radius: ${theme.spacing(0.8)};
    margin-bottom: ${theme.spacing(0.5)};
    padding: ${theme.spacing(1.5)} ${theme.spacing(2)};
    background-color: ${({ $active }) => ($active ? theme.colors.background : "transparent")};
    color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.background)};

    &:hover {
      transform: translateX(5px);
      background-color: ${theme.colors.background};
      box-shadow: none;
      color: ${theme.colors.primary};
    }

    &:active {
      transform: translateX(2px);
    }
  `}
`
export const LoginButton = styled.button`
  background-color: ${({ $isScrolled }) => $isScrolled ? '#E0F7FA' : 'transparent'};
  border: 1px solid #007BFF;
  color: #007BFF;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 10px;
  font-family: ${theme.fonts.heading};
  font-size: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #E0F7FA;
  }

  &:active {
    transform: translateY(0);
  }
`

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const UserButton = styled.button`
  background-color: ${({ $isScrolled }) => $isScrolled ? '#E0F7FA' : 'transparent'};
  border: 1px solid #007BFF;
  color: #007BFF;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 10px;
  font-family: ${theme.fonts.heading};
  font-size: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(0.5)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #E0F7FA;
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

export const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${theme.colors.background};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  z-index: 1000;
  margin-top: ${theme.spacing(0.5)};
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease-in-out;

  ${UserMenu}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

export const UserMenuItem = styled.button`
  width: 100%;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  color: #333;
  font-family: ${theme.fonts.heading};
  font-size: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:focus {
    outline: none;
    background-color: #f0f0f0;
  }
`

export const LogoutButton = styled.button`
  background-color: #dc3545;
  border: 1px solid #dc3545;
  color: white;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  border-radius: 10px;
  font-family: ${theme.fonts.heading};
  font-size: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing(0.5)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
    background-color: #c82333;
    border-color: #c82333;
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
  }
`

