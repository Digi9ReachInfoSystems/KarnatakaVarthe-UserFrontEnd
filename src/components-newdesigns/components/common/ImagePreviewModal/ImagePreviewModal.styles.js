import styled, { keyframes, css } from "styled-components"
import theme from "../../../../theme/Theme"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
`

const thinScrollbar = css`
  scrollbar-width: thin;
  scrollbar-color: rgba(30, 136, 229, 0.45) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(30, 136, 229, 0.35);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(30, 136, 229, 0.55);
  }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 12px;
  padding-top: max(12px, env(safe-area-inset-top, 0px));
  padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
  background: rgba(15, 23, 42, 0.28);
  backdrop-filter: blur(10px) saturate(1.1);
  -webkit-backdrop-filter: blur(10px) saturate(1.1);
  animation: ${fadeIn} 220ms ease-out;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 20px;
    padding-top: max(20px, env(safe-area-inset-top, 0px));
    padding-bottom: max(20px, env(safe-area-inset-bottom, 0px));
    background: rgba(15, 23, 42, 0.32);
  }
`

export const Dialog = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: min(92vw, 560px);
  max-height: min(92dvh, 92vh);
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow:
    0 18px 48px rgba(15, 23, 42, 0.16),
    0 2px 8px rgba(15, 23, 42, 0.08);
  outline: none;
  animation: ${scaleIn} 240ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
  transform: translateZ(0);

  @media (min-width: 768px) {
    max-width: min(88vw, 560px);
    border-radius: 18px;
  }

  @media (min-width: 1024px) {
    max-width: min(80vw, 600px);
  }

  @media (max-width: 768px) {
    width: fit-content;
    max-width: calc(100vw - 24px);
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    max-width: calc(100vw - 20px);
    border-radius: 12px;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: ${theme.colors.text};
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;

  svg {
    width: 18px;
    height: 18px;
    pointer-events: none;
  }

  &:hover {
    background: #fff;
    transform: scale(1.06);
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.16);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
  }
`

export const ImageStage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  flex: 0 0 auto;
  background: #ffffff;
  overflow: hidden;
  user-select: none;
  padding: 10px 10px 0;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 12px 12px 0;
  }

  @media (max-width: 480px) {
    padding: 8px 8px 0;
    width: fit-content;
    max-width: 100%;
  }
`

export const PreviewImage = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: min(88vw, 520px);
  max-height: min(68dvh, 68vh);
  margin: 0 auto;
  object-fit: contain;
  object-position: center;
  background: transparent;
  border-radius: 10px;

  @media (min-width: 768px) {
    max-width: min(80vw, 540px);
    max-height: min(72dvh, 72vh);
    border-radius: 12px;
  }

  @media (min-width: 1024px) {
    max-width: min(70vw, 560px);
    max-height: min(74dvh, 74vh);
  }

  @media (max-width: 768px) {
    max-width: calc(100vw - 44px);
    max-height: min(62dvh, 62vh);
  }

  @media (max-width: 480px) {
    max-width: calc(100vw - 36px);
    max-height: min(58dvh, 58vh);
    border-radius: 8px;
  }
`

export const ContentPanel = styled.div`
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* Hug image width — don't expand dialog from long text */
  width: 0;
  min-width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 12px 14px 14px;
  background: #ffffff;
  border-top: 1px solid #eef2f7;
  overflow: hidden;
  min-height: 0;
  max-height: min(24vh, 150px);

  @media (min-width: 768px) {
    padding: 14px 16px 16px;
    max-height: 160px;
    gap: 8px;
  }

  @media (min-width: 1024px) {
    padding: 16px 18px 18px;
    max-height: 180px;
  }

  @media (max-width: 768px) {
    padding: 12px 12px 14px;
    max-height: min(26vh, 140px);
  }

  @media (max-width: 480px) {
    padding: 10px 12px 12px;
    max-height: min(28vh, 130px);
  }
`

export const Title = styled.h2`
  margin: 0;
  flex: 0 0 auto;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.heading};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 17px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

export const Description = styled.div`
  margin: 0;
  flex: 1 1 auto;
  min-height: 0;
  color: rgba(38, 37, 36, 0.82);
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  ${thinScrollbar}

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12.5px;
    line-height: 1.5;
  }
`

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
