import styled from "styled-components"
import theme from "../../theme/Theme"

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.white};
  padding: ${theme.spacing(2)} ${theme.spacing(2)};
  border-radius: 8px;
  gap: ${theme.spacing(2)};
  max-width: 92%;
  margin: 0 auto;
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(1)};
    padding: ${theme.spacing(1)};
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(1.5)};
    padding: ${theme.spacing(2)};
  }
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.25)};
  border-radius: 8px;
  flex: 1;
  max-width: 800px;
  border: 1px solid #e0e0e0;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
  }
`

export const SearchIcon = styled.div`
  color: #666666;
  font-size: 18px;
  margin-right: ${theme.spacing(1)};
  cursor: pointer;
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
    margin-right: ${theme.spacing(0.5)};
  }
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
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
  }
`

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.info};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: ${theme.spacing(0.5)};
  max-height: 350px;
  overflow-y: auto;
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
  /* Focus style for keyboard navigation */
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px; /* Inset outline */
    background: ${theme.colors.light}; /* Keep hover background on focus */
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

export const FontControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(0.75)};
  background: #E0F7FA;
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.25)};
  border-radius: 8px;
  min-width: 260px;
  
  span {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
    margin-right: ${theme.spacing(0.75)};
  }
  
  button {
    padding: ${theme.spacing(0.4)} ${theme.spacing(0.6)};
    border: 1px solid #cccccc;
    background: ${theme.colors.white};
    cursor: pointer;
    border-radius: 4px;
    font-family: ${theme.fonts.body};
    color: #333333;
    font-size: 12px;
    min-width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: #f0f0f0;
    }
    
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
    
    &:last-child {
      background: #007BFF;
      color: white;
      border-color: #007BFF;
      padding: ${theme.spacing(0.4)} ${theme.spacing(0.8)};
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      
      &:hover {
        background: #0056b3;
      }
    }
  }
  
  b {
    font-size: 14px;
    color: #333333;
    margin: 0 ${theme.spacing(0.4)};
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
    min-width: auto;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    span {
      font-size: 12px;
    }
    
    button {
      padding: ${theme.spacing(0.25)} ${theme.spacing(0.4)};
      font-size: 11px;
      min-width: 20px;
      height: 20px;
      
      &:last-child {
        font-size: 11px;
        padding: ${theme.spacing(0.25)} ${theme.spacing(0.6)};
      }
    }
    
    b {
      font-size: 12px;
    }
  }
`


export const Select = styled.select`
  padding: ${theme.spacing(0.75)} ${theme.spacing(1.5)};
  border-radius: 5px;
  border: 1px solid ${theme.colors.info};
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  max-width: 380px;
  font-family: ${theme.fonts.body};
  background: ${theme.colors.light};
  color: ${theme.colors.text};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  /* Focus style for keyboard navigation */
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: ${theme.spacing(0.5)};
  }
`
