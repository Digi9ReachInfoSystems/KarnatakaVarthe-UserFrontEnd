import styled from "styled-components";
import theme from "../../../theme/Theme";

const SettingsContainer = styled.div`
  padding: 20px 80px;
  background-color: ${theme.colors.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SettingsHeader = styled.h1`
  font-size: 28px;
  color: ${theme.colors.primary};
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${theme.colors.primary};
`;

const SettingsTitle = styled.h2`
  font-size: 24px;
  color: ${theme.colors.primary};
  margin-bottom: 30px;
  font-weight: 600;
`;

const SettingsForm = styled.form`
  max-width: 800px;
  margin: 0;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const SettingsSection = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SettingsItem = styled.div`
  margin-bottom: 24px;
`;

const SettingsLabel = styled.label`
  display: block;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 8px;
  font-size: 14px;
`;

const SettingsInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#e74c3c' : theme.colors.border};
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : theme.colors.primary};
    background-color: #ffffff;
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  padding: 12px 32px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primaryDark || '#0056b3'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const CancelButton = styled.button`
  padding: 12px 32px;
  background-color: transparent;
  color: ${theme.colors.text};
  border: 2px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  &:disabled {
    background-color: transparent;
    border-color: #e9ecef;
    color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ErrorText = styled.span`
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 6px;
  font-weight: 500;
`;

export {
  SettingsContainer,
  SettingsTitle,
  SettingsForm,
  SettingsSection,
  SettingsItem,
  SettingsLabel,
  SettingsInput,
  SaveButton,
  CancelButton,
  ButtonGroup,
  ErrorText
};
