import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { createPortal } from "react-dom";
import { IModal, TBackdrop } from "../../types/components/Modal";

const WrapperBackdrop = styled.div({
  position: "fixed",
  width: "100%",
  height: "100vh",
  background: "rgba(33, 37, 41, 0.68)",
  zIndex: 20,
  top: 0,
});
const WrapperModal = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  width: "100%",
  height: "100vh",
});
const Backdrop: FC<TBackdrop> = ({ onModalOff }) => {
  return <WrapperBackdrop onClick={onModalOff} />;
};
const Modal: React.FC<IModal> = ({ children, onModalOff }) => {
  return (
    <>
      {createPortal(
        <Backdrop onModalOff={onModalOff} />,
        document.getElementById("backdrop-root") as HTMLElement,
      )}
      {createPortal(
        <WrapperModal>{children}</WrapperModal>,
        document.getElementById("modal-root") as HTMLElement,
      )}
    </>
  );
};
export default memo(Modal);
