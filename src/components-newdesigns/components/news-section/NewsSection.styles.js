import styled from "styled-components"
import theme from "../../../theme/Theme"

export const FilterContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing(2.5)} ${theme.spacing(10)} 0;
  background: ${theme.colors.background};

  @media (max-width: 1026px) {
    padding: ${theme.spacing(2)} ${theme.spacing(2)} 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(1.5)} ${theme.spacing(1.5)} 0;
  }
`

const PageLayout = styled.div`
  grid-template-columns: 1fr;
  gap: ${theme.spacing(7.5)};
  max-width: 100%;
  padding-left: ${theme.spacing(10)};
  padding-right: ${theme.spacing(10)};
  padding-top: ${theme.spacing(2.5)};
  padding-bottom: ${theme.spacing(2.5)};
  background: ${theme.colors.background};

  @media (max-width: 1026px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(3.5)};
    max-width: 100%;
    padding: ${theme.spacing(2)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing(2.5)};
    max-width: 100%;
    padding: ${theme.spacing(1.5)};
  }
`

export { PageLayout }
