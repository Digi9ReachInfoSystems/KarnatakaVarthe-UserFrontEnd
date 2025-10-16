import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3.5)};

  @media (max-width: ${theme.breakpoints.desktop}) {
    gap: ${theme.spacing(3)};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing(2.5)};
    margin-top: ${theme.spacing(2.5)};
  }
`

export const Divider = styled.hr`
  height: 1px;
  border: none;
  background: ${theme.colors.gray[400]};
  margin: ${theme.spacing(3.125)} 0 0;
  width: 100%;
`

// ========================================
// SHIMMER/SKELETON LOADING STYLES
// ========================================
const shimmer = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  background: ${theme.colors.background};
  color: ${theme.colors.gray[800]};
  padding-bottom: ${theme.spacing(2.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};
  padding: ${theme.spacing(1.25)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing(2)};
    gap: ${theme.spacing(1.25)};
  }
`

export const SkeletonThumb = styled.div`
  width: 90%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.desktop}) {
    width: 95%;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`

export const SkeletonTitle = styled.div`
  width: 85%;
  height: 18px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  margin-bottom: ${theme.spacing(1)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 15px;
  }
`

export const SkeletonExcerpt = styled.div`
  width: 70%;
  height: 14px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  margin-bottom: ${theme.spacing(0.5)};
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 13px;
  }
`

export const SkeletonMeta = styled.div`
  width: 50%;
  height: 12px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 11px;
  }
`