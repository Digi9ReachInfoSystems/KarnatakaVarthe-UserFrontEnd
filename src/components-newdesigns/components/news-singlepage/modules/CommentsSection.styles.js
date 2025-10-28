import styled from 'styled-components'
import theme from '../../../../theme/Theme'

export const CommentsContainer = styled.div`
  background: ${theme.colors.gray[900]};
  color: ${theme.colors.white};
  padding: ${theme.spacing(3.75)};
  margin-top: ${theme.spacing(5)};
  border-radius: ${theme.borderRadius.small};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(3)};
    margin-top: ${theme.spacing(4)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(2.5)};
    margin-top: ${theme.spacing(3)};
  }
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing(3)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const CommentsSection = styled.div`
  margin-bottom: ${theme.spacing(4)};
  max-height: ${theme.spacing(60)};
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 300px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 200px;
  }
`

export const FormSection = styled.div`
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(3)};
  }
`

export const CommentsTitle = styled.h3`
  margin-bottom: ${theme.spacing(2.5)};
  font-size: 22px;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.heading};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing(2)};
    font-size: 20px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(1.5)};
    font-size: 18px;
  }
`

export const CommentItem = styled.div`
  margin-bottom: ${theme.spacing(3.75)};
 
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: ${theme.spacing(3)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing(2.5)};
  }
`

export const CommentAuthor = styled.h4`
  font-size: 18px;
  margin-bottom: ${theme.spacing(0.625)};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.heading};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 16px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 15px;
  }
`

export const CommentText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: ${theme.spacing(1.875)};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 14px;
    margin-bottom: ${theme.spacing(1.5)};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: ${theme.spacing(1.25)};
  }
`

export const ViewAllLink = styled.a`
  color: ${theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing(2.5)};

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    text-decoration: underline;
  }
`

export const PlusIcon = styled.span`
  margin-right: ${theme.spacing(0.625)};
  font-size: 18px;
`

export const CommentForm = styled.div`
  margin-top: ${theme.spacing(3.75)};
  
  &:hover {
    border-color: ${theme.colors.white};
  }
`

export const CommentInput = styled.input`
  width: 100%;
  padding: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(2.5)};
  background: transparent;
  border: 1px solid ${theme.colors.white};

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.body};
  font-size: 16px;
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.75)};
    margin-bottom: ${theme.spacing(2)};
    font-size: 15px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(1.5)};
    font-size: 14px;
  }
`

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing(2)};
  height: ${theme.spacing(25)};
  margin-bottom: ${theme.spacing(3)};
  background: transparent;
  border: 1px solid ${theme.colors.white};

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.white};
  resize: vertical;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.75)};
    height: ${theme.spacing(20)};
    margin-bottom: ${theme.spacing(2.5)};
    font-size: 15px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.5)};
    height: ${theme.spacing(15)};
    margin-bottom: ${theme.spacing(2)};
    font-size: 14px;
  }
`

export const SubmitButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.gray[900]};
  border: none;
  padding: ${theme.spacing(1.75)} ${theme.spacing(4)};
  border-radius: ${theme.borderRadius.small};

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  font-weight: bold;
  float: right;
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-family: ${theme.fonts.body};
  font-size: 16px;
  letter-spacing: 0.5px;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(3.5)};
    font-size: 15px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1.25)} ${theme.spacing(3)};
    font-size: 14px;
    letter-spacing: 0.3px;
  }
`
