import styled, { keyframes } from "styled-components"
import theme from "../../../../theme/Theme"

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const MagazineViewContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing(3)} ${theme.spacing(15)};
  background: ${theme.colors.background}; /* Very light grey/white background */
  font-family: ${theme.fonts.body};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)} ${theme.spacing(6)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing(3)};
  padding-bottom: ${theme.spacing(2)};
  border-bottom: 1px solid #e0e0e0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
  }
`

export const Title = styled.h1`
  font-size: ${theme.spacing(3)};
  color: ${theme.colors.black};
  font-weight: 600;
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2.5)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.2)};
  }
`

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.5)};
  background-color: ${theme.colors.primary};
  color: white;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  font-size: ${theme.spacing(1.6)};
  font-weight: 500;
  border-radius: ${theme.spacing(0.5)};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
    font-size: ${theme.spacing(1.4)};
    padding: ${theme.spacing(0.8)} ${theme.spacing(1.5)};
  }
`

export const ContentWrapper = styled.div`
  display: flex; /* Changed from grid to flex for single item */
  justify-content: center; /* Center the PDF viewer */
  background: #333333; /* Dark grey background for the main content area */
  border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(2)};
  min-height: 600px; /* Ensure a minimum height for the viewer area */
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 500px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
    min-height: 400px;
  }
`

// Removed Sidebar and Thumbnail styled components as they are no longer used.

export const MainPdfViewer = styled.div`
  flex: 1; /* Allow it to take available space */
  background: #333333; /* Dark grey background for the viewer frame */
  border-radius: ${theme.spacing(0.5)};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  iframe {
    /* The iframe itself will render the PDF content with its own background */
  }
`

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  z-index: 1;
`

export const RecommendedSection = styled.div`
  margin-top: ${theme.spacing(4)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(3)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(2.5)};
  }
`

export const RecommendedTitle = styled.h2`
  font-size: ${theme.spacing(3)};
  color: ${theme.colors.black};
  font-weight: 600;
  margin-bottom: ${theme.spacing(2)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.spacing(2.5)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(2.2)};
  }
`