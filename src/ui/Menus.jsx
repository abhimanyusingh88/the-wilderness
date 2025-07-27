import { createContext, useContext, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDetectOutsideClicks } from "../hooks/detectOutSideClicks";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// ✅ Context
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open,position,setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open,setPosition } = useContext(MenusContext);
  const buttonRef = useRef();

  function handleClick(e) {
   const rect= e.target.closest("button").getBoundingClientRect();
setPosition({
  x:window.innerWidth-rect.width-rect.x,
  y: rect.y+rect.height+ 8,
});
    // const rect = buttonRef.current.getBoundingClientRect();
    // setPosition({
    //   x: window.innerWidth - rect.right,
    //   y: rect.bottom + 4,
    // });

    openId === id ? close() : open(id);
  }

  return (
    <StyledToggle ref={buttonRef} onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId,position,close} = useContext(MenusContext);
  const ref=useRef();
  useDetectOutsideClicks(ref,close);
  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>{children}</StyledList>,
    document.body
  );
}

function Button({ children, icon,onClick }) {
  const {close}=useContext(MenusContext);
  function handleClick()
  {
       onClick?.();
       close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{icon}<span>{children}</span></StyledButton>
    </li>
  );
}

// ✅ Attach subcomponents
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

/////////////////////////////////////////////////
// ✅ ✅ ✅ PROP TYPES VALIDATION BELOW ✅ ✅ ✅ //
/////////////////////////////////////////////////

Menus.propTypes = {
  children: PropTypes.node.isRequired, // All JSX inside <Menus>
};

Toggle.propTypes = {
  id: PropTypes.string.isRequired, // Unique identifier for each menu
};

List.propTypes = {
  id: PropTypes.string.isRequired, // Should match Toggle's id
  children: PropTypes.node.isRequired, // Buttons inside List
};

Button.propTypes = {
  children: PropTypes.node.isRequired, // Text inside the button
  icon: PropTypes.node,                // ✅ Can be any valid React node (e.g., <Icon />)
  onClick: PropTypes.func,             // Optional callback
};

