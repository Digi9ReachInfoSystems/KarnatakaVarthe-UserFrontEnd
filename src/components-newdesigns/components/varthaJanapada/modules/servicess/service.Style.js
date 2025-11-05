import styled ,{keyframes} from "styled-components";
import theme from "../../../../../theme/Theme";


// Ensure consistent spacing using theme or rem
const spacing = (factor) => `${factor * 0.25}rem`; // 0.25rem = 4px baseline

export const Card = styled.section`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.04);
  height: 500px;
  max-height: 500px;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 400px;
    max-height: 400px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 350px;
    max-height: 350px;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const CardBodySkeleton = styled.div`
  padding: ${spacing(3)} ${spacing(3.5)}; /* 12px 14px → ~0.75rem 0.875rem */
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)}; /* 8px */
`;

export const SkeletonLine = styled.div`
  height: 1.25rem; /* 20px → 1.25rem */
  width: ${(props) => props.width || '100%'};
  background: linear-gradient(to right, #d0d0d0 0%, #808080 20%, #d0d0d0 40%, #d0d0d0 100%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const CardHeader = styled.header`
  padding: ${spacing(3)} ${spacing(4)}; /* 12px 16px */
  font-weight: 600;
  font-size: 1rem; /* 16px */
  line-height: 1.2;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #ffffff; /* Prevent content from showing through during scroll */
`;

export const CardBody = styled.div`
  padding: ${spacing(3)} ${spacing(3.5)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  flex-grow: 1;
`;

export const ServiceList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 420px;
  min-height: 80px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 320px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 270px;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
`;

export const ServiceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing(2.5)} ${spacing(2)}; /* ~10px 8px */
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  font-size: 0.875rem; /* 14px */
  line-height: 1.4;
  min-height: 3.75rem; /* 60px → 3.75rem */
  box-sizing: border-box;

  /* Ensure touch-friendly tap target */
  @media (hover: none) and (pointer: coarse) {
    min-height: 4.25rem; /* ~68px on touch devices */
  }

  &:last-child {
    border-bottom: none;
  }

  /* Responsive adjustments */
  @media (max-width: ${theme.breakpoints.tablet || '768px'}) {
    padding: ${spacing(2)} ${spacing(1.5)}; /* 8px 6px */
    font-size: 0.8125rem; /* 13px → 12px on mobile */
    min-height: 3.25rem; /* ~52px */
  }

  @media (max-width: ${theme.breakpoints.mobile || '480px'}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing(1)};
  }
`;

export const ItemAction = styled.span`
  margin-left: ${spacing(3)};
  font-weight: 600;
  font-size: 0.8125rem; /* 13px */
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.mobile || '480px'}) {
    margin-left: 0;
    align-self: flex-end;
  }
`;

export const ListLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  margin-left: auto;
  white-space: nowrap;
  font-size: 0.875rem; /* 14px */
  flex-shrink: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.mobile || '480px'}) {
    font-size: 0.75rem; /* 12px */
    margin-left: 0;
    align-self: flex-end;
  }
`;