import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import styled from "styled-components";

const Body = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 0.5rem;
  margin: auto;
`;
const LayoutWrapper = styled.div`
  gap: 0.5rem;
  width: auto;
  height: 100%;
`;
const Main = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 4rem 1fr;
  overflow-y: auto;
`;

const Container = styled.div``;
function Layout() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated || isAuthenticated === "false")
    return (
      <Navigate
        to="/"
        replace={true}
        state={{ message: "Please login first!" }}
      />
    );

  return (
    <Body>
      <LayoutWrapper>
        <Sidebar />
      </LayoutWrapper>
      <Main>
        <Topbar />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </Body>
  );
}

export default Layout;
