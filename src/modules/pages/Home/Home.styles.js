import styled from "styled-components";
import theme from "../../../theme/Theme";

export const HomeContainer = styled.div`
  background-color: ${theme.colors.background};
  font-size: inherit;
  ${theme.spacing(1)};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: ${theme.spacing(0.8)};
  align-items: flex-start;
  width: 100%;
  font-size: inherit;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${theme.spacing(2)};
    align-items: center;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)};
    align-items: center;
  }
`;

export const NewsSection = styled.div`
  flex: 1;
  margin-left: ${theme.spacing(12)};
  font-size: inherit;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    max-width: 100%;
    margin-left: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: 0; 
  }
`;

export const MagazineSection = styled.div`
  flex: 1;
  // margin-right: ${theme.spacing(12)};
  margin-left: ${theme.spacing(3)};
  font-size: inherit;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    // margin-right: 7%;
    margin-left: 0;

    // padding: ${theme.spacing(2)};
  }
    
  // @media (max-width: ${theme.breakpoints.mobile}) {
  //   margin-left: 0;
  //   margin-right: 0;
  //   padding: ${theme.spacing(3)};
  // }
`;
