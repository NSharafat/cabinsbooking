import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: grid;
  margin-bottom: 1rem;

  font-size: small;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
function FormRow({ children, label }) {
  return (
    <Row>
      <Item>
        <label>{label}</label>
      </Item>
      <Item>{children}</Item>
    </Row>
  );
}

export default FormRow;
