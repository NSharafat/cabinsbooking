import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
`;

const StyledModal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

function Modal({ children, onClose }) {
  return (
    <Overlay onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </StyledModal>
    </Overlay>
  );
}

export default Modal;
