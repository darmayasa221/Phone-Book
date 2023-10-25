import styled from "@emotion/styled";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { mq } from "../../globalStyles/responsive";
import HamburgerButton from "./HumbergerButton";
import { RiUserSearchFill } from "react-icons/ri";
import NavBar from "./NavBar/NavBar";
import HeaderContext from "../../store/Header/headerContext";
import { Link } from "react-router-dom";
import { MdPersonAddAlt1 } from "react-icons/md";
import ModalContext from "../../store/Modal/ModalContext";
import Modal from "../Modal/Modal";
import CreateForm from "../Form/CreateForm";
const Container = styled.div({
  // backgroundColor: "var(--main-background-color)",
  position: "relative",
  zIndex: "10",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.8rem 1rem 0.6rem 1rem",
});
const Title = styled.h1({
  fontSize: "23px",
  [mq[1] as string]: {
    fontSize: "35px",
  },
});
const Horizontal = styled.hr({
  margin: "0 0.8rem",
  borderRadius: "50%",
  border: "0.07rem solid black",
});
const WrapperLeftSide = styled.div({
  display: "flex",
  columnGap: "10px",
});
const Header = () => {
  const { setModalOn } = useContext(ModalContext);
  const { onHandlerSearch } = useContext(HeaderContext);
  console.log("header component");
  const [mobile, setMobile] = useState<boolean>(false);
  return (
    <>
      <Container>
        <Link to={"/"}>
          <Title>Phone Book</Title>
        </Link>
        <NavBar isActive={mobile} />
        <WrapperLeftSide>
          <RiUserSearchFill onClick={onHandlerSearch} size={25} />
          <MdPersonAddAlt1
            onClick={setModalOn.bind(this, "create")}
            size={32}
            style={{ position: "relative", top: "-4px" }}
          />
          <HamburgerButton setMobile={setMobile} />
        </WrapperLeftSide>
      </Container>
      <Horizontal />
    </>
  );
};

export default memo(Header);
