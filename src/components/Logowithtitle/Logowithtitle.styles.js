import styled from "styled-components";
import theme from "../../theme/Theme";

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: ${theme.spacing(15)};
  padding: ${theme.spacing(8)};

  h2 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.text};
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing(-1)};
    margin-top: ${theme.spacing(2)};
  }

  p {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.black};
    font-size: 1rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(4)};
    margin-right: 0;
    text-align: center;
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
    text-align: center;
    h2 {
      font-size: 1.75rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;

export const Logo = styled.img`
  max-width: 180px;

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: ${theme.breakpoints.desktop}) {
    max-width: 200px;
  }
`;
