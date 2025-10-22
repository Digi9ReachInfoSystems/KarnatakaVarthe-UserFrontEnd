import styled from "styled-components"
import theme from "../../../../theme/Theme"

export const NotificationPanel = styled.aside`
  background-color: ${theme.colors.white};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing1(1)};
  height: 500px;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: 0;
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 350px;
  }
`

export const PanelHeader = styled.div`
  text-align: center;
  font-family: ${theme.fonts.heading};
  font-weight: 600;
  font-size: 16px;
  padding: ${theme.spacing1(3)} ${theme.spacing1(4)};
  margin-bottom: ${theme.spacing1(2)};
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray[800]};
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2)} ${theme.spacing1(3)};
    font-size: 15px;
  }
`

export const NotificationList = styled.ol`
  list-style: none;
  margin: 0;
  padding: ${theme.spacing1(3)};
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing1(2)};
  background-color: ${theme.colors.white};
  overflow-y: auto;
  overflow-x: hidden;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray[50] || '#f9fafb'};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2)};
    padding-top: 70px;
    gap: ${theme.spacing1(1.5)};
  }
`

export const ListItem = styled.li`
  display: flex;
  gap: ${theme.spacing1(2)};
  align-items: flex-start;
  padding-bottom: ${theme.spacing1(4)};
  border-bottom: 1px solid ${theme.colors.gray[300]};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  transform: translateY(0);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(1.5)};
    padding-bottom: ${theme.spacing1(3)};
  }
`

export const ListIndex = styled.span`
  min-width: 20px;
  font-family: ${theme.fonts.monospace};
  color: ${theme.colors.gray[500]};
`

export const ListBody = styled.div`
  color: #000000;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.4;
  }
`

export const ListLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  margin-left: auto;
  white-space: nowrap;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`

export const LoadingText = styled.div`
  padding: ${theme.spacing1(4)};
  text-align: center;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-style: italic;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(3)};
    font-size: 13px;
  }
`

export const ShimmerContainer = styled.div`
  padding: ${theme.spacing1(3)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing1(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(2)};
    gap: ${theme.spacing1(1.5)};
  }
`

export const ShimmerItem = styled.div`
  display: flex;
  gap: ${theme.spacing1(2)};
  align-items: flex-start;
  padding-bottom: ${theme.spacing1(4)};
  border-bottom: 1px solid ${theme.colors.gray[300]};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing1(1.5)};
    padding-bottom: ${theme.spacing1(3)};
  }
`

export const ShimmerIndex = styled.div`
  min-width: 20px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
`

export const ShimmerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing1(1)};
`

export const ShimmerText = styled.div`
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  margin-bottom: ${props => props.marginBottom || '0'};
`

export const ShimmerLink = styled.div`
  height: 14px;
  width: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-left: auto;
  margin-top: ${theme.spacing1(1)};
`

export const ShimmerAnimation = styled.div`
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

export const ErrorText = styled.div`
  padding: ${theme.spacing1(4)};
  text-align: center;
  color: ${theme.colors.error || '#dc3545'};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: ${theme.borderRadius.small};
  margin: ${theme.spacing1(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(3)};
    font-size: 13px;
    margin: ${theme.spacing1(1.5)};
  }
`
