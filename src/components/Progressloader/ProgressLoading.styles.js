import styled, { keyframes } from "styled-components"

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    backdrop-filter: blur(0);
  }
  to {
    opacity: 0;
    backdrop-filter: blur(10px);
  }
`

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(249, 250, 251, 0.9);
  width: 100%;
  height: 100vh;
  padding: 1rem;
  animation: ${props => props.$isFading ? fadeOut : 'none'} 2s ease-out forwards;
  backdrop-filter: blur(0);
  transition: backdrop-filter 0.3s ease;

  @media (max-width: 768px) {
    background-color: rgba(249, 250, 251, 0.95);
  }
`

export const LogoContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`

export const LogoBox = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`

export const Logo = styled.img`
  max-width: 3rem;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 2.5rem;
  }

  @media (max-width: 480px) {
    max-width: 2rem;
  }
`

export const LogoText = styled.span`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`

export const ProgressBar = styled.div`
  width: min(16rem, 80%);
  height: 0.25rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: min(14rem, 90%);
  }

  @media (max-width: 480px) {
    width: min(12rem, 95%);
  }
`

export const ProgressFill = styled.div`
  height: 100%;
  background-color: #2563eb;
  border-radius: 9999px;
  width: ${(props) => props.progress}%;
  transition: width 0.1s ease-out;
`

export const LoadingText = styled.p`
  margin: 1rem 0 0 0;
  color: #4b5563;
  font-size: 0.875rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 1rem;
  }
`

export const DotsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 1rem;
`

export const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #2563eb;
  border-radius: 50%;
  animation: ${pulseAnimation} 1s infinite;
  animation-delay: ${(props) => props.delay}s;
`

export const MainContentContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  width: 100%;
`