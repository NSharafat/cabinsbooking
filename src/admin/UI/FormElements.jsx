import styled from "styled-components";

const Input = styled.input`
  padding: 12px 0.5rem;
  background-color: var(--color-primary-100);
  align-items: center;
  border: none;
  border-radius: 6px;
  width: 100%;
`;

const H4 = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Error = styled.span`
  color: var(--color-secondary-700);
`;
export { Input, H4, Error };
