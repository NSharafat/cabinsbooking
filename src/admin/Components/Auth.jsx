import React from "react";
import styled from "styled-components";
import LoginForm from "../UI/LoginForm";

const PageWrapper = styled.div`
  background-color: var(--color-primary-500);
  width: 100%;
  height: 100vh;
  display: grid;
  margin: auto auto;

  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
`;
const FormWrapper = styled.div`
  background-color: white;
`;
function Auth() {
  return (
    <PageWrapper>
      <div></div>
      <div></div>
      <LoginForm />
      <div></div>
      <div></div>
    </PageWrapper>
  );
}

export default Auth;
