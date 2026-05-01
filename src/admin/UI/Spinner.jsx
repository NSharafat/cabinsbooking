import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  margin: auto auto;
  border: 7px solid #ddd;
  border-top-color: var(--color-secondary-700);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
export default Spinner;
