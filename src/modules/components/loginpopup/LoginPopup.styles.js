import styled from "styled-components"
import theme from "../../../theme/Theme"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const PopupContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 380px;
  width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  font-family: ${theme.fonts.body};
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(3)};
    border-radius: 12px;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${theme.colors.black};
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};s
    outline-offset: 2px;
  }
`

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.black}; 
  margin-bottom: ${theme.spacing(1.5)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing(1)};
  }
`

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #444444;
  margin-bottom: ${theme.spacing(3)};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: ${theme.spacing(2)};
  }
`

export const SignInButton = styled.button`
  background: ${theme.colors.black}; /* Changed to black */
  color: ${theme.colors.white}; /* Changed to white */
  border: none;
  border-radius: 28px;
  padding: ${theme.spacing(1.5)} ${theme.spacing(4)};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  width: 100%;
  max-width: 250px;

  &:hover {
    background-color: #333; /* Darker black on hover */
    transform: translateY(-2px);
  }

  &:active {
    background-color: #111;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.25)} ${theme.spacing(3)};
    font-size: 1rem;
  }
`