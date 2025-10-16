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
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const GuidelineCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 24px;
  width: 300px;
  min-width: 280px;
  max-width: 350px;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  flex: 1 1 300px;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    min-width: 100%;
  }
`;

export const GuidelineTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #222;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 16px;
    min-height: 40px;
  }
`;

export const GuidelineImage = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

export const GuidelineActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Button = styled.a`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${theme.colors.primary};
  color: #fff;
  border: 1px solid ${theme.colors.primary};
  text-align: center;

  &:hover {
    background-color: #1565C0;
    border-color: #1565C0;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(30, 136, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 20px;
  }
`;


