import React from "react";
import { styled } from "styled-components";
import logo from "../../assets/logoc.png";
import { Link, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import Cabins from "./Cabins";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Bookings from "./Bookings";
import Settings from "./Settings";
import Logo from "../UI/Logo";
const SideBarWrapper = styled.div`
  height: 100vh;
  background-color: var(--bg-card);
  padding: 0rem 0rem;
  display: grid;
  grid-template-rows: 10rem 1fr;
`;

const MenuWarpper = styled.div`
  border-top: 2px solid #e6e6e6;
  padding: 2rem 0rem;
  display: flex;
  //border: 1px solid blue;
  overflow: hidden;
  flex-direction: column;
  gap: 0rem;
`;
const StyledNavLink = styled(NavLink)`
  color: var(--text-main);
  text-decoration: none;
  padding: 0.5rem 2rem;
  transition: all 100ms;
  width: 100%;
  font-size: medium;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: var(--color-primary-100);

    transition: all 100ms;
  }

  &.active {
    background-color: var(--bg-main);
    transition: all 100ms;
  }
`;
function Sidebar() {
  return (
    <SideBarWrapper className="">
      <Logo src={logo} alt="Cabin Booking Logo" />
      <MenuWarpper>
        <StyledNavLink to="/dashboard" element={<Dashboard />}>
          <HomeIcon style={{ height: "1.2rem" }} />
          Dashboard
        </StyledNavLink>

        <StyledNavLink to="bookings" element={<Bookings />}>
          <ClipboardDocumentIcon style={{ height: "1.2rem" }} />
          Bookings
        </StyledNavLink>
        <StyledNavLink to="cabins" element={<Cabins />}>
          <BuildingStorefrontIcon style={{ height: "1.2rem" }} />
          Cabins
        </StyledNavLink>
        <StyledNavLink to="settings" element={<Settings />}>
          <Cog6ToothIcon style={{ height: "1.2rem" }} />
          Settings
        </StyledNavLink>
      </MenuWarpper>
    </SideBarWrapper>
  );
}

export default Sidebar;
