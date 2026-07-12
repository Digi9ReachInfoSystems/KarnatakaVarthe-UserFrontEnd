import styled, { keyframes } from "styled-components";
import spinnerSrc from "../../../../assets/load-more-spinner.png";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0 24px;
  width: 100%;
`;

const SpinnerImg = styled.img`
  width: ${(p) => p.$size || 40}px;
  height: ${(p) => p.$size || 40}px;
  animation: ${spin} 0.9s linear infinite;
  display: block;
`;

/**
 * Shared load-more indicator (teal ring spinner).
 * Render only when loadingMore is true.
 */
export default function LoadMoreSpinner({ size = 40, label = "Loading more" }) {
  return (
    <Wrap role="status" aria-live="polite" aria-label={label}>
      <SpinnerImg src={spinnerSrc} alt="" $size={size} aria-hidden="true" />
    </Wrap>
  );
}
