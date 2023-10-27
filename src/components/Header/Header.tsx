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
import { Link, useLocation } from "react-router-dom";
import { MdOutlineArrowBack, MdPersonAddAlt1 } from "react-icons/md";
import ModalContext from "../../store/Modal/ModalContext";
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
  const { pathname } = useLocation();
  const { setModalOn } = useContext(ModalContext);
  const { onHandlerSearch } = useContext(HeaderContext);
  console.log("header component");
  const [mobile, setMobile] = useState<boolean>(false);
  return (
    <>
      <Container>
        {pathname === "/" ? (
          <></>
        ) : (
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
            <MdOutlineArrowBack size={30} />
          </Link>
        )}
        <Title>Phone Book</Title>
        <NavBar setMobileOff={setMobile} isActive={mobile} />
        <WrapperLeftSide>
          {pathname === "/contacts/favorite" ? (
            <></>
          ) : (
            <>
              <RiUserSearchFill onClick={onHandlerSearch} size={25} />
              <MdPersonAddAlt1
                onClick={setModalOn.bind(this, "create")}
                size={32}
                style={{ position: "relative", top: "-4px" }}
              />
            </>
          )}
          <HamburgerButton isActive={mobile} setMobile={setMobile} />
        </WrapperLeftSide>
      </Container>
      <Horizontal />
    </>
  );
};

export default memo(Header);
