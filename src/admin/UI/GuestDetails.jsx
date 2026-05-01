import styled from "styled-components";

const Details = styled.div`
  font-size: small;
  display: grid;
  grid-template-columns: 1fr auto;
  text-align: left;
  justify-content: space-around;
  span:last-child {
    font-size: xx-small;
    color: var(--color-primary-600);
  }
  div:last-child {
    text-align: right;
  }
`;
const PersonelDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
export default function GuestDetails({ children }) {
  return <Details>{children}</Details>;
}
export { PersonelDetails };
