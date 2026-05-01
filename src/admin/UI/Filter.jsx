import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import StyledButton from "./IconButton";
import { useSearchParams } from "react-router-dom";
import { object } from "zod";

const StyledFilter = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`;

const FilterItems = styled.li`
  padding: 0.3rem 1rem;
  font-size: x-small;
  border: none;
  ${(props) =>
    props.active
      ? `
    background-color: var(--color-secondary-600);
    color: var(--text-light);
  `
      : `
    background-color: var(--color-primary-50);
    
  `}
  &:hover {
    ${(props) =>
      props.active
        ? `
    background-color: var(--color-secondary-600);
    color: var(--text-light);
    cursor: pointer;

  `
        : `
   background-color: var(--color-secondary-200);
    cursor: pointer;
  `}
  }
`;
function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get(filterField),
  );

  useEffect(() => {
    const setParams = () => {
      if (!activeFilter) return;
      setSearchParams((params) => {
        const newParams = Object.fromEntries(params);
        return {
          ...newParams,
          [filterField]: activeFilter,
        };
      });
    };
    setParams();
  }, [activeFilter]);

  return (
    <StyledFilter>
      {options.map((option, index) => {
        return (
          <FilterItems
            onClick={() => setActiveFilter(option.value)}
            active={activeFilter == option.value ? true : false}
            key={index}
          >
            {option.label}
          </FilterItems>
        );
      })}
    </StyledFilter>
  );
}

export default Filter;
