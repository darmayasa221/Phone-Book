import styled from "@emotion/styled";
import React, { memo, useContext, useState } from "react";
import { mq } from "../../globalStyles/responsive";
import HamburgerButton from "./HumbergerButton";
import { RiUserSearchFill } from "react-icons/ri";
import NavBar from "./NavBar/NavBar";
import HeaderContext from "../../store/Header/headerContext";
import { Link, useLocation } from "react-router-dom";
import {
  MdContactEmergency,
  MdOutlineArrowBack,
  MdPersonAddAlt1,
} from "react-icons/md";
import ModalContext from "../../store/Modal/ModalContext";
import { anchor } from "../../globalStyles/anchor";
const Container = styled.div({
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
  [mq[1] as string]: {
    paddingTop: "9px",
  },
});
const CostumeLink = styled(Link)(anchor, {
  position: "relative",
  bottom: "4px",
  color: "black",
});
const Header = () => {
  const { pathname } = useLocation();
  const { setModalOn } = useContext(ModalContext);
  const { onHandlerSearch } = useContext(HeaderContext);
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
              <CostumeLink to={"/contacts/favorite"}>
                <MdContactEmergency size={32} />
              </CostumeLink>
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
