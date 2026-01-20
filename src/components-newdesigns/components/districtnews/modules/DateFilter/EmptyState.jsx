import React, { useContext } from 'react'
import styled from 'styled-components'
import theme from '../../../../../theme/Theme'
import { LanguageContext } from '../../../../../context/LanguageContext'

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing1(8)} ${theme.spacing1(4)};
  text-align: center;
  background: ${theme.colors.gray[50]};
  border-radius: 12px;
  min-height: 300px;
  width: 100%;
  grid-column: 1 / -1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing1(6)} ${theme.spacing1(3)};
    min-height: 250px;
  }
`

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: ${theme.spacing1(3)};
  opacity: 0.5;

  svg {
    width: 100%;
    height: 100%;
    stroke: ${theme.colors.gray[400]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
  }
`

const EmptyTitle = styled.h3`
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 600;
  color: ${theme.colors.text || theme.colors.gray[800]};
  margin-bottom: ${theme.spacing1(1.5)};
  font-family: ${theme.fonts.body};
`

const EmptyMessage = styled.p`
  font-size: clamp(14px, 1.5vw, 16px);
  color: ${theme.colors.gray[600]};
  max-width: 400px;
  line-height: 1.6;
  font-family: ${theme.fonts.body};
`

const texts = {
  English: {
    title: "No News Available",
    message: "No news articles were found for the selected date. Please try a different date."
  },
  Kannada: {
    title: "ಯಾವುದೇ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ",
    message: "ಆಯ್ಕೆಮಾಡಿದ ದಿನಾಂಕಕ್ಕೆ ಯಾವುದೇ ಸುದ್ದಿ ಲೇಖನಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ದಿನಾಂಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ."
  },
  Hindi: {
    title: "कोई समाचार उपलब्ध नहीं",
    message: "चयनित तारीख के लिए कोई समाचार लेख नहीं मिला। कृपया एक अलग तारीख का प्रयास करें।"
  }
}

export default function EmptyState() {
  const { language } = useContext(LanguageContext)
  const localizedTexts = texts[language] || texts.English

  return (
    <EmptyStateContainer role="status" aria-live="polite">
      <EmptyIcon aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
      </EmptyIcon>
      <EmptyTitle>{localizedTexts.title}</EmptyTitle>
      <EmptyMessage>{localizedTexts.message}</EmptyMessage>
    </EmptyStateContainer>
  )
}
