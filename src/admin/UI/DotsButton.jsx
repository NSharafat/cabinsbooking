import styled from "styled-components";

const StyledButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  padding: 2px 2px;
  border-radius: 2px;
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-secondary-400);
    color: var(--text-light);
    transition: all 0.3s;
  }
`;

import React, { useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

function DotsButton({ setOpen, index, menuref }) {
  useEffect(() => {
    const handleClick = (e) => {
      if (menuref.current && menuref.current.contains(e.target)) return;
      setOpen(null);
    };
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <StyledButton
      onClick={(e) => {
        e.stopPropagation();
        setOpen((open) => (open === index ? null : index));
      }}
    >
      <HiEllipsisVertical size={20} color="var(--text-main)" />
    </StyledButton>
  );
}

export default DotsButton;
