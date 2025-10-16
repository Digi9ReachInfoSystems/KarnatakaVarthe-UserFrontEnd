import styled from "styled-components"
import theme from "../../../theme/Theme"

export const FlexContainer = styled.div`
  display: flex;
  margin-left: 100px;
  margin-right: 40px;
  padding: 20px;
  gap: 60px;
  overflow: hidden;
  position: relative; 

  @media (max-width: ${theme.breakpoints.desktop}) {
    margin-left: 80px;
    margin-right: 30px;
    gap: 40px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    margin-left: ${theme.spacing(4)};
    margin-right: ${theme.spacing(4)};
    gap: ${theme.spacing(4)};
    padding: 10px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: ${theme.spacing(2)};
    margin-right: ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
    padding: 5px;
  }

  /* Specific device adjustments */
  @media (max-width: 1024px) and (min-width: 768px) {
    margin-left: 60px;
    margin-right: 20px;
    gap: 30px;
  }

  @media (max-width: 820px) and (min-width: 768px) {
    margin-left: 40px;
    margin-right: 10px;
    gap: 20px;
  }

  @media (max-width: 540px) {
    margin-left: ${theme.spacing(2)};
    margin-right: ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
  }

  @media (max-width: 280px) {
    margin-left: ${theme.spacing(1)};
    margin-right: ${theme.spacing(1)};
    gap: ${theme.spacing(1)};
  }
`

export const SecondFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(5)};
  margin-top: ${theme.spacing(5)};

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(4)};
    margin-top: ${theme.spacing(4)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(2)};
    margin-top: ${theme.spacing(2)};
  }
`

export const RelatedPostsContainer = styled.div`
  margin-top: ${theme.spacing(5)};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: ${theme.spacing(4)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: ${theme.spacing(2)};
  }
`
