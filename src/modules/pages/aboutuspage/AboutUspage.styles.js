import styled from "styled-components";
import theme from "../../../theme/Theme";

export const PageContainer = styled.div`
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  margin-left: 8%;
  margin-right: 40px;
  padding: 20px;
  gap: 30px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    margin-left: ${theme.spacing(4)};
    margin-right: ${theme.spacing(4)};
    gap: ${theme.spacing(4)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: ${theme.spacing(2)};
    margin-right: ${theme.spacing(2)};
    gap: ${theme.spacing(2)};
  }
`;

export const RecommendedContainer = styled.div`
  width: 30%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const AllNewsContainer = styled.div`
  width: 70%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`;