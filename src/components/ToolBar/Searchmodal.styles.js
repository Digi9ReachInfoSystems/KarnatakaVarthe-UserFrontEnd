import styled, { keyframes } from "styled-components"
import theme from "../../theme/Theme"

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

// Skeleton shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

// Modal overlay
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${theme.spacing(2)};
`

// Modal container
export const ModalContainer = styled.div`
  background-color: white;
  border-radius: ${theme.spacing(1)};
  width: 90%;
  height: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 ${theme.spacing(1)} ${theme.spacing(3)} rgba(0, 0, 0, 0.3);
`

// Modal header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(1.5)};
  border-bottom: 1px solid #eee;
`

// Modal title
export const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${theme.spacing(2.25)};
  color: ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.75)};
  }
`

// Modal content
export const ModalContent = styled.div`
  flex: 1;
  overflow: hidden;
`

// PDF iframe
export const PDFFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

// Button styles
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(0.75)};
  border-radius: 50%;
  color: ${theme.colors.black};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  background-color: ${theme.colors.button};
  color: ${theme.colors.white};
  text-decoration: none;
  border-radius: ${theme.spacing(0.5)};
  font-size: ${theme.spacing(1.5)};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.25)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  align-items: center;
`

// Loading indicator
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
`

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${theme.colors.primary};
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`

// Skeleton loader styles
export const SkeletonLoader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  height: 100%;
`

export const SkeletonHeader = styled.div`
  height: 32px;
  width: 60%;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`

export const SkeletonContent = styled.div`
  flex: 1;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`

