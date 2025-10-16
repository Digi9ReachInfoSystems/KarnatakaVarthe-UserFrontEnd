import styled, { keyframes } from "styled-components";
import theme from "../../../theme/Theme";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: ${scaleIn} 0.3s ease-out;
  cursor: default;
  pointer-events: auto;
  max-height: 80vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

export const ModalText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #444;
  text-align: left;
  margin-bottom: 20px;
  max-height: 700px;
  overflow-y: auto;
  padding-right: 10px;
`;

export const HelpTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  text-align: left;
  margin-top: 16px;
`;

export const TableCaption = styled.caption`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr``;

export const TableHeaderCell = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  background-color: #f2f2f2;
`;

export const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #555;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;
