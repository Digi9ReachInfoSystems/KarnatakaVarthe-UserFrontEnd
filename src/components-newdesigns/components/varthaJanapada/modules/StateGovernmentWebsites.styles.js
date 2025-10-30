import styled from "styled-components"
import theme from "../../../../theme/Theme"

// ========================================
// GOVERNMENT WEBSITES SIDEBAR
// ========================================
export const SidebarCard = styled.aside`
  background: ${theme.colors.white};
  overflow: hidden;
  overflow-x: hidden;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
    @media (max-width: 1026px) {
    min-height: 500px;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: auto;
  }
`

export const SidebarHeader = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: clamp(17px, 2vw, 19px);
  font-weight: 700;
  color: ${theme.colors.gray[800]};
  margin: 0;
  text-align: center;
  padding: ${theme.spacing1(5)} ${theme.spacing1(4)};
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(4)} ${theme.spacing1(3)};
    font-size: clamp(16px, 1.8vw, 18px);
  }
`

export const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${theme.spacing1(2)};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 600px;
  flex: 1;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing1(2)};
    padding: ${theme.spacing1(3)};
    max-height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing1(2)};
    max-height: 300px;
  }
`

export const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(3)};
  padding: ${theme.spacing1(4)} ${theme.spacing1(3)};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  text-decoration: none;
  color: inherit;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${theme.colors.gray[100]};
    transform: translateX(4px);
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary || '#007bff'};
    outline-offset: -2px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(3)};
    
    &:hover {
      transform: none;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(2.5)};
    padding: ${theme.spacing1(3)} ${theme.spacing1(2.5)};
  }
`

export const Avatar = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.circle};
  background-image: url(${props => props.$src || '/state/sidebar.jpg'});
  background-size: cover;
  background-position: center;
  border: 2px solid ${theme.colors.gray[300]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;
  }
`

export const ItemLabel = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`

// ========================================
// SHIMMER/SKELETON LOADING STYLES
// ========================================
const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`

export const SkeletonItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing1(3)};
  padding: ${theme.spacing1(4)} ${theme.spacing1(3)};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  ${shimmer}

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing1(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(2.5)};
    padding: ${theme.spacing1(3)} ${theme.spacing1(2.5)};
  }
`

export const SkeletonAvatar = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.circle};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 42px;
    height: 42px;
  }
`

export const SkeletonLabel = styled.div`
  flex: 1;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
`

