import styled from "styled-components"
import theme from "../../../../../theme/Theme"

export const Section = styled.section`
  width: 100%;
  padding: ${theme.spacing(3)} ${theme.spacing(2)};
  background: ${theme.colors.background};
  color: ${theme.colors.text};

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(6)} ${theme.spacing(4)};
  }
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 90%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing(2.5)};

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing(3)};
    max-width: 95%;
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${theme.spacing(4)};
  }
`

export const LeftImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${theme.colors.background};
  border-radius: 0;
  margin-bottom: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(2)};
  box-sizing: border-box;

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
    aspect-ratio: 16 / 9;
    margin-bottom: ${theme.spacing(1.5)};
    padding-bottom: ${theme.spacing(1.5)};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`

export const MainContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  padding: ${theme.spacing(1)} ${theme.spacing(0.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
    padding: ${theme.spacing(1)} ${theme.spacing(1)};
    gap: ${theme.spacing(1.75)};
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(1)} 0;
    gap: ${theme.spacing(2)};
  }

  h2 {
    font-size: 1.25rem;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.01em;
    font-family: ${theme.fonts.heading};

    @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
      font-size: 1.5rem;
    }

    @media (min-width: ${theme.breakpoints.desktop}) {
      font-size: 2rem;
    }
  }

  p {
    color: ${theme.colors.gray[500]};
    line-height: 1.65;
    font-family: ${theme.fonts.body};
    max-width: 60ch;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 767px) {
      max-width: 100%;
      -webkit-line-clamp: 3;
    }
  }
`

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.spacing(1.25)};

  @media (max-width: 767px) {
    gap: ${theme.spacing(1)};
  }
`

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 ${theme.spacing(1.25)};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.small};
  font-weight: 600;

  &:focus-visible {
    outline: 2px solid ${theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: 767px) {
    height: 24px;
    padding: 0 ${theme.spacing(1)};
    font-size: 11px;
  }
`

export const DateText = styled.time`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.primary};

  @media (max-width: 767px) {
    font-size: 11px;
  }
`

export const Sidebar = styled.aside`
  display: grid;
  grid-template-rows: auto auto;
  gap: ${theme.spacing(2.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
    gap: ${theme.spacing(2)};
  }

  @media (max-width: 767px) {
    gap: ${theme.spacing(2)};
    margin-top: ${theme.spacing(2)};
  }
`

export const SideCard = styled.article`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: ${theme.spacing(1.75)};
  align-items: start;
  padding-bottom: ${theme.spacing(2.25)};
  border-bottom: 1px solid ${theme.colors.gray[200]};

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
    grid-template-columns: 100px 1fr;
    gap: ${theme.spacing(1.5)};
    padding-bottom: ${theme.spacing(2)};
  }

  @media (max-width: 767px) {
    grid-template-columns: 80px 1fr;
    gap: ${theme.spacing(1.25)};
    padding-bottom: ${theme.spacing(1.75)};
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .thumb {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: ${theme.colors.gray[200]};
    border-radius: 0;
    border-bottom: 1px solid ${theme.colors.gray[500]};

    @media (max-width: 767px) {
      aspect-ratio: 3 / 2;
    }
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.3;
    margin: ${theme.spacing(0.75)} 0 ${theme.spacing(0.5)};
    font-family: ${theme.fonts.heading};

    @media (max-width: 767px) {
      font-size: 0.9rem;
      margin: ${theme.spacing(0.5)} 0 ${theme.spacing(0.375)};
    }
  }

  p {
    font-size: 0.95rem;
    color: ${theme.colors.gray[500]};
    line-height: 1.6;
    font-family: ${theme.fonts.body};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 767px) {
      font-size: 0.85rem;
      -webkit-line-clamp: 2;
    }
  }
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

export const SkeletonImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-radius: 0;
  margin-bottom: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(2)};
  ${shimmer}

  @media (min-width: ${theme.breakpoints.tablet}) and (max-width: 1023px) {
    aspect-ratio: 16 / 9;
  }
`

export const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1.5)};
  padding: ${theme.spacing(1)} ${theme.spacing(0.5)};
  border-bottom: 1px solid ${theme.colors.gray[400]};
  ${shimmer}

  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing(1)} 0;
    gap: ${theme.spacing(2)};
  }
`

export const SkeletonTag = styled.div`
  width: 100px;
  height: 26px;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  ${shimmer}

  @media (max-width: 767px) {
    height: 24px;
    width: 80px;
  }
`

export const SkeletonTitle = styled.div`
  width: 90%;
  height: 32px;
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

  @media (min-width: ${theme.breakpoints.desktop}) {
    height: 40px;
  }
`

export const SkeletonText = styled.div`
  width: ${props => props.width || "80%"};
  height: ${props => props.height || "16px"};
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  margin-bottom: ${theme.spacing(0.75)};
  ${shimmer}
`

export const SkeletonSideCard = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: ${theme.spacing(1.75)};
  align-items: start;
  padding-bottom: ${theme.spacing(2.25)};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  ${shimmer}

  @media (max-width: 767px) {
    grid-template-columns: 80px 1fr;
    gap: ${theme.spacing(1.25)};
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

export const SkeletonThumb = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(
    90deg,
    ${theme.colors.gray[200]} 25%,
    ${theme.colors.gray[100]} 50%,
    ${theme.colors.gray[200]} 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
  border-bottom: 1px solid ${theme.colors.gray[500]};
  ${shimmer}

  @media (max-width: 767px) {
    aspect-ratio: 3 / 2;
  }
`