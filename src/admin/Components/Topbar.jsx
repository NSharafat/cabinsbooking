import React from "react";
import styled from "styled-components";
import profile from "../../assets/profile.png";
import { BellIcon } from "@heroicons/react/24/outline";
import { UseDarkMode } from "../API/DarkModeProvider";
import { HiMoon, HiSun } from "react-icons/hi2";

const TopBar = styled.div`
  background-color: var(--bg-card);
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0rem 3rem;
`;

const Profile = styled.img`
  height: 2.5rem;
  width: auto;
  border-radius: 100%;
  background-color: gainsboro;
  border: 2px solid var(--color-primary-600);
`;
const Icon = styled.div`
  max-height: 1rem;
`;

const RightMenuWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const DarkModeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
function Topbar() {
  const { darkMode, setDarkMode } = UseDarkMode();
  function handleClick() {
    setDarkMode((prev) => !prev);
  }
  return (
    <TopBar>
      <RightMenuWrapper>
        <BellIcon style={{ height: "1.5rem" }} />
        <DarkModeButton onClick={handleClick}>
          {darkMode ? (
            <HiMoon size={22} color="var(--color-secondary-700)" />
          ) : (
            <HiSun color="var(--color-primary-700)" size={24} />
          )}
        </DarkModeButton>
        <Profile src={profile} />
      </RightMenuWrapper>
    </TopBar>
  );
}

export default Topbar;
