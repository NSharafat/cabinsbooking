import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  background-color: var(--color-primary-50);
  height: fit-content;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 1px 4px 7px rgba(0, 0, 0, 0.05);
`;
const StateTitle = styled.p`
  margin: 0px;
  color: var(--text-main);
  font-size: small;
`;
const StateNumbers = styled.h1`
  font-size: x-large;
  font-weight: bolder;
  margin: 0px;

  color: var(--color-secondary-700);
`;
function State({ title, value, icon: Icon }) {
  return (
    <StyledCard>
      <div>
        <Icon size={28} className={"text-[var(--color-primary-700)]"} />
      </div>
      <div>
        <StateTitle>{title}</StateTitle>
        <StateNumbers>{value}</StateNumbers>
      </div>
    </StyledCard>
  );
}

export default State;
