import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  transition: all 0.3s;
  align-items: center;
  display: flex;
  gap: 5px;

  &.primary {
    background-color: var(--color-primary-700);
    color: var(--text-light);
  }
  &.secondary {
    background-color: var(--color-secondary-100);
    color: var(--text-main);
  }
  &.default {
    background-color: var(--color-primary-100);
    color: var(--text-main);
  }
  &.link {
    background-color: inherit;
    border-bottom: 1px solid var(--color-primary-100);
  }

  &:hover {
    cursor: pointer;
    &.primary {
      background-color: var(--color-primary-900);
      transition: all 0.3s;
    }
    &.secondary {
      background-color: var(--color-secondary-300);
      transition: all 0.3s;
    }
    &.default {
      background-color: var(--color-primary-200);
      transition: all 0.3s;
    }
  }
  &:disabled {
    cursor: no-drop;
    background-color: var(--color-primary-200);
  }
`;

function Button({
  children,
  type = "button",
  variation,
  disabled = false,
  onClick,
}) {
  return (
    <StyledButton
      className={variation}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
