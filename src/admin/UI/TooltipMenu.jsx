import React from "react";
import styled from "styled-components";

const TooltipMenu = styled.div`
  position: absolute;
  z-index: 999;
  width: 200%;
  display: flex;
  flex-wrap: wrap;
  right: 50%;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: -2px 3px 3px rgba(0, 0, 0, 0.05);
  background-color: var(--bg-main);
`;

export default TooltipMenu;
