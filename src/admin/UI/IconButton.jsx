import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  padding: 6px 0.5rem;
  background-color: inherit;
  cursor: pointer;
  margin-right: 1rem;
  border: 2px solid var(--color-primary-100);
  transition: all 0.3s;

  ${(props) =>
    props.type === "danger" &&
    css`
      background-color: var(--color-secondary-400);
      color: var(--text-light);
    `}

  ${(props) =>
    props.type === "regular" &&
    css`
      background-color: var(--color-primary-400);
      color: var(--text-light);
    `}


    &:hover {
    ${(props) =>
      props.type === "danger" &&
      css`
        background-color: var(--color-secondary-500);
        transition: all 0.3s;
      `}

    ${(props) =>
      props.type === "regular" &&
      css`
        background-color: var(--color-primary-600);
        transition: all 0.3s;
      `}
  }
`;
StyledButton.defaultProps = {
  type: "regular",
};

export default StyledButton;
