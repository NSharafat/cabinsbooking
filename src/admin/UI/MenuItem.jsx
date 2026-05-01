import styled from "styled-components";

const MenuItem = styled.div`
  cursor: pointer;
  padding: 2px 4px;
  transition: 0.15s ease;
  width: 100%;

  &:hover {
    background: var(--color-primary-50);
  }

  &:active {
    transform: scale(0.98);
  }
`;
export default MenuItem;
