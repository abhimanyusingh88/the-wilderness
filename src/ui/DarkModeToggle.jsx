import { useState, useEffect } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease, opacity 0.3s ease;
  position: relative;
  width: 24px;
  height: 24px;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  opacity: ${props => (props.visible ? 1 : 0)};
`;

function DarkModeToggle() {
  // 1. Initialize dark mode from localStorage if exists
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // 2. Toggle dark mode
  const toggleMode = () => setDarkMode(prev => !prev);

  // 3. Apply dark-mode class to body and persist in localStorage
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ButtonIcon onClick={toggleMode}>
      <IconWrapper style={{ transform: darkMode ? "rotate(360deg)" : "rotate(0deg)" }}>
        <Icon visible={!darkMode}>
          <HiOutlineMoon size={20} />
        </Icon>
        <Icon visible={darkMode}>
          <HiOutlineSun size={20} />
        </Icon>
      </IconWrapper>
    </ButtonIcon>
  );
}

export default DarkModeToggle;
