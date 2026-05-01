import React from "react";
import styled, { css } from "styled-components";

const Status = styled.span`
  text-align: center;
  padding: 0.2rem 0.5rem;
  font-size: xx-small;
  border-radius: 5px;

  ${(props) =>
    props.type == "available" &&
    css`
      background-color: var(--badge-green);
      color: var(--text-light);
    `}
  ${(props) =>
    props.type == "checked-in" &&
    css`
      background-color: var(--badge-gray);
      color: var(--text-main);
    `}
    ${(props) =>
    props.type == "checked-out" &&
    css`
      background-color: var(--badge-secondary);
      color: var(--text-light);
    `}
    ${(props) =>
    props.type == "unconfirmed" &&
    css`
      background-color: var(--badge-warn);
      color: var(--text-main);
    `}
`;
export default Status;
