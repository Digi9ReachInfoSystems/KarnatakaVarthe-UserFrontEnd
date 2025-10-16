import styled from "styled-components";
import theme from "../../../theme/Theme";

export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 80px;
  background-color: ${theme.colors.background};
  min-height: 100vh;

  @media (max-width: 1024px) {
    padding: 36px 60px;
  }

  @media (max-width: 768px) {
    padding: 32px 40px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-bottom: 24px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

export const Content = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  text-align: left;
  
  p {
    margin: 0 0 16px 0;
    text-align: justify;
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin: 32px 0 16px 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;

    p {
      margin-bottom: 14px;
    }

    h3 {
      font-size: 20px;
      margin: 28px 0 14px 0;
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.6;

    p {
      margin-bottom: 12px;
      text-align: left;
    }

    h3 {
      font-size: 18px;
      margin: 24px 0 12px 0;
    }
  }
`;
