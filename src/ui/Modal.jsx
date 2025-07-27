import styled from "styled-components";
import PropTypes from "prop-types"; // ✅ Added for prop validation
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext,  useState } from "react";
import { useRef } from "react";
import { useDetectOutsideClicks } from "../hooks/detectOutSideClicks";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// modal windows must be always on the top of everything so that can not be cut by any other component so we use portal for this
// react portal just makes sure that we can render things anywhere we want but it keeps the component at its original place in the dom tree so that we can pass props as usual

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  // returns same element but with added extra handler

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const ref=useRef();


  const { openName, close } = useContext(ModalContext);
  
   useDetectOutsideClicks(ref,close);

  if (name !== openName) return null;

  
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children,{onClosingModal:close})}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// ✅ Added prop validation for all components
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Open.propTypes = {
  children: PropTypes.element.isRequired,
  opens: PropTypes.string.isRequired,
};

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
