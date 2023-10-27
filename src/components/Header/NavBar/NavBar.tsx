import React, { FC, MouseEventHandler, memo, useCallback } from "react";
import { TNavBar } from "../../../types/components/navBar";
import styled from "@emotion/styled";
import { mq } from "../../../globalStyles/responsive";
import { MdContactEmergency } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { Link } from "react-router-dom";
import { anchor } from "../../../globalStyles/anchor";
const NavBarContainer = styled.nav<Pick<TNavBar, "isActive">>(
  ({ isActive }) => ({
    position: "absolute",
    width: "100%",
    height: "100vh",
    left: 0,
    top: 0,
    marginTop: "3.7rem",
    transition: "0.4s",
    transform: !isActive ? "translateX(100%)" : "translateX(17%)",
    background: "rgba(36, 36, 36, 0.06)",
    backdropFilter: "blur(10px)",
    [mq[1] as string]: {
      display: "unset",
    },
  }),
);
const UnderList = styled.ul({
  marginTop: "10px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  alignItems: "center",
});
const List = styled.li({
  width: "90%",
  listStyle: "none",
  borderTop: "2px solid rgba(102, 102, 102, 0.24)",
  borderBottom: "2px solid rgba(102, 102, 102, 0.24)",
  padding: "1rem 0",
  transition: "0.4s",
  ":hover": {
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
  },
});
const CostumeLink = styled(Link)(anchor, {
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  justifyContent: "flex-end",
  paddingRight: "6rem",
  color: "black",
  transition: "0.4s",
  ":hover": {
    color: "white",
  },
});
const NavBar: FC<TNavBar> = ({ isActive, setMobileOff }) => {
  console.log("nav bar component");
  const onHandler = useCallback((event: any) => {
    event.preventDefault();
    setMobileOff(false);
  }, []);
  return (
    <NavBarContainer isActive={isActive as boolean}>
      <UnderList>
        {/* <List onClick={onHandler}>
          <CostumeLink to={"/"}>
            <p>Create New Contact</p>
            <MdPersonAddAlt1 size={30} />
          </CostumeLink>
        </List> */}
        <List onClick={onHandler}>
          <CostumeLink to={"/contacts/favorite"}>
            <p>Contact Favorite</p>
            <MdContactEmergency size={30} />
          </CostumeLink>
        </List>
      </UnderList>
    </NavBarContainer>
  );
};

export default memo(NavBar);
