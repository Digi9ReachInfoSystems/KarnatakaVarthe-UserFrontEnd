import styled from "styled-components"
import theme from "../../../theme/Theme"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${theme.spacing(2)};
  position: absolute;
  z-index: 1001;
  max-height: 80vh;
  overflow-y: auto;
  transform-origin: top center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 90%;
    left: 5% !important;
    right: 5% !important;
    top: 10vh !important;
    transform: none !important;
    max-width: none;
  }
`

export const ModalTitle = styled.h3`
  font-size: ${theme.spacing(2.25)};
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing(1)};
  text-align: center;
`

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.lightgray};
  margin-bottom: ${theme.spacing(2)};
  flex-wrap: wrap; /* Allow tabs to wrap on smaller screens */
  gap: ${theme.spacing(1)}; /* Space between tabs */
`

export const TabButton = styled.button`
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${theme.colors.textgray};
  font-size: ${theme.spacing(1.75)};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap; /* Prevent tab text from wrapping */

  &:hover {
    color: ${theme.colors.primary};
  }

  &[aria-selected="true"] {
    color: ${theme.colors.primary};
    border-bottom-color: ${theme.colors.primary};
    font-weight: bold;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.spacing(1.5)};
    padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  }
`

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.25)};
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`

export const SearchIcon = styled.div`
  color: #666666;
  font-size: 18px;
  margin-right: ${theme.spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: #333333;

  &::placeholder {
    color: #666666;
  }
  &:focus-visible {
    outline: none;
  }
`

export const SuggestionsContainer = styled.div`
  position: relative; /* Changed from absolute to relative */
  width: 100%;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.info};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Ensure it's above other content within the modal */
  max-height: 250px; /* Limit height for scrollable results */
  overflow-y: auto;
  margin-top: ${theme.spacing(1)}; /* Space below search input */
`

export const ResultCount = styled.div`
  padding: ${theme.spacing(0.75)} ${theme.spacing(1)};
  font-size: 12px;
  color: ${theme.colors.textgray};
  border-bottom: 1px solid ${theme.colors.light};
  background: ${theme.colors.bggrey};
`

export const LoadingIndicator = styled.div`
  padding: ${theme.spacing(1.5)};
  font-size: 14px;
  color: ${theme.colors.textgray};
  text-align: center;
`

export const NoResults = styled.div`
  padding: ${theme.spacing(1.5)};
  font-size: 14px;
  color: ${theme.colors.textgray};
  text-align: center;
`

export const SuggestionItem = styled.div`
  padding: ${theme.spacing(1.5)};
  font-size: 14px;
  color: ${theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.light};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: ${theme.colors.light};
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
    background: ${theme.colors.light};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: ${theme.spacing(1)};
  }
`

export const SuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`

export const SuggestionTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`

export const SuggestionDate = styled.div`
  font-size: 12px;
  color: ${theme.colors.textgray};
`
