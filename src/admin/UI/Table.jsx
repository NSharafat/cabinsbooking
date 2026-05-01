import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  font-size: small;
  font-weight: 500;
  width: 100%;
  color: var(--text-main);
  td:last-child,
  th:last-child {
    text-align: center;
    width: 1%;
  }
`;
const TableHead = styled.thead`
  font-weight: 600;
  width: 100%;
  background-color: var(--bg-card);
`;
const TableRow = styled.tr`
  text-align: left;

  &:nth-child(odd) {
    background-color: var(--bg-main);
  }
  &:nth-child(even) {
    background-color: var(--bg-card);
  }

  background-color: ${({ type }) => (type === "Header" ? "red" : "black")};
`;
TableRow.defaultProps = {
  type: "regular",
};

const TD = styled.td`
  padding: 0.5rem 1rem;
`;

function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}

export { Table, TableRow, TD, TableHead };
