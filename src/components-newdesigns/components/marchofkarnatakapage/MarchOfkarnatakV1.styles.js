import styled from "styled-components"
import theme from "../../../theme/Theme"

export const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(7.5)};
  max-width: 100%;
  padding-left: ${theme.spacing(10)};
  padding-right: ${theme.spacing(10)};
  padding-top: ${theme.spacing(2.5)};
  padding-bottom: ${theme.spacing(2.5)};
  background: ${theme.colors.background};
  overflow-x: hidden;
  box-sizing: border-box;

  @media (max-width: 1026px) {
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(2)} ${theme.spacing(2)};
    max-width: 100%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(4)};
    padding: ${theme.spacing(3)} ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(2)} ${theme.spacing(2)};
  }
`

export const FlexContainer = styled.div`
  display: flex;
  gap: ${theme.spacing(5)};
  align-items: flex-start;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;

  /* StateNews takes 70% */
  > :first-child {
    flex: 0 0 70%;
    max-width: 70%;
    min-width: 0;
  }

  /* StateGovernmentWebsites takes 30% */
  > :last-child {
    flex: 0 0 30%;
    max-width: 29%;
    min-width: 0;
  }

  @media (max-width: 1026px) {
    flex-direction: column;
    gap: ${theme.spacing(4)};
    
    > :first-child,
    > :last-child {
      flex: 1 1 auto;
      max-width: 100%;
      min-width: 0;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(4)};
    
    > :first-child,
    > :last-child {
      flex: 1 1 auto;
      max-width: 100%;
      min-width: 0;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(3)};
  }
`