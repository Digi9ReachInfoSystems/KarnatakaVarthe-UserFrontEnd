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

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  background: ${theme.colors.background};
  color: ${theme.colors.gray[800]};
  padding: ${theme.spacing(1.25)};
  padding-bottom: ${theme.spacing(2.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};

  @media screen and (max-width: 1026px) {
    flex-direction: row !important;
    gap: ${theme.spacing(1.5)};
    align-items: flex-start;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing(1)};
    gap: ${theme.spacing(1)};
  }
`

export const Thumb = styled.img`
  width: 90%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid ${theme.colors.gray[200]};

 

  @media screen and (max-width: 1026px) {
    width: 140px;
    min-width: 140px;
    height: 80px;
    aspect-ratio: auto;
    border-radius: 4px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100px;
    min-width: 100px;
    height: 60px;
  }
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  margin: 0;
  color: ${theme.colors.gray[800]};
  font-family: ${theme.fonts.heading};

  @media (max-width: ${theme.breakpoints.desktop}) {
    font-size: ${theme.fontSizes.large};
  }

  @media screen and (max-width: 1026px) {
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    line-height: 1.3;
  }
`

export const Excerpt = styled.p`
  margin: 0;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.medium};
  line-height: 1.6;
  font-family: ${theme.fonts.body};

  @media screen and (max-width: 1026px) {
    font-size: 12px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.small};

  @media screen and (max-width: 1026px) {
    gap: ${theme.spacing(1)};
    font-size: 10px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 9px;
    gap: ${theme.spacing(0.5)};
  }
`

export const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: ${theme.borderRadius.circle};
  background: ${theme.colors.gray[300]};
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  flex: 1;
  min-width: 0;

  @media screen and (max-width: 1026px) {
    gap: ${theme.spacing(0.75)};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing(0.5)};
  }
`
