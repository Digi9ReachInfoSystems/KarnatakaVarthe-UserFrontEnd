import styled from "styled-components";
import theme from "../../../../theme/Theme";

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: ${theme.spacing(0.5)};
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing(10)};
`;

export const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.spacing(3)};
  font-weight: bold;
  margin-bottom: ${theme.spacing(5)};
`;

export const Paragraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: ${theme.spacing(2)};
  line-height: 1.6;
  text-align: justify;
  margin-bottom: ${theme.spacing(1.5)};
  color: ${theme.colors.black};
`;
