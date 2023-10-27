import styled from "@emotion/styled";
import { mq } from "./responsive";

const WrapperFormModal = styled.div({
  background: "var(--second-background-color)",
  boxShadow: " 0px 6px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  position: "fixed",
  zIndex: 31,
  width: "320px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  padding: "10px 38px",
  [mq[1] as string]: {
    width: "490px",
    height: "355px",
  },
});

const WrapperHeader = styled.div({ display: "flex", justifyContent: "center" });
const WrapperBody = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: "5px",
});
const WrapperFooter = styled.div({
  display: "flex",
  justifyContent: "center",
  columnGap: "5rem",
});
const CostumeForm = styled.form({
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",
});
const CostumeInput = styled.input({
  padding: "0.5rem ",
  borderRadius: "5px",
  outline: "none",
  border: "1px solid gray",
});
const WrapperPhoneInputs = styled.div({
  overflow: "scroll",
  height: "7rem",
  display: "flex",
  flexDirection: "column",
  rowGap: "2px",
});
const WrapperPhoneInput = styled.div({});
const WrapperButton = styled.div({
  button: {
    height: "2rem",
    width: "5rem",
    cursor: "pointer",
    fontWeight: "bolder",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "#d4d4d4",
    ":hover": {
      color: "white",
    },
    ":active": {
      color: "white",
    },
  },
});
const ButtonCount = styled.button({
  height: "1rem",
  width: "1rem",
  cursor: "pointer",
  fontWeight: "bolder",
  border: "none",
  borderRadius: "100%",
  backgroundColor: "black",
  color: "#d4d4d4",
  ":hover": {
    color: "white",
  },
  ":active": {
    color: "white",
  },
});
const WrapperCountButtons = styled.div({
  display: "flex",
  columnGap: "10px",
});

export {
  WrapperFormModal,
  WrapperBody,
  ButtonCount,
  CostumeForm,
  CostumeInput,
  WrapperButton,
  WrapperCountButtons,
  WrapperFooter,
  WrapperHeader,
  WrapperPhoneInput,
  WrapperPhoneInputs,
};
