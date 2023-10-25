import React, { FC, memo } from "react";
import { TNavBar } from "../../../types/components/navBar";
import styled from "@emotion/styled";
import { mq } from "../../../globalStyles/responsive";
import { Anchor } from "../../../globalStyles/Anchor";
import { MdContactEmergency } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { Link } from "react-router-dom";
const NavBarContainer = styled.nav<TNavBar>(({ isActive }) => ({
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
    position: "static",
    transform: "unset",
    height: "unset",
    margin: 0,
    background: "unset",
  },
}));
const UnderList = styled.ul({
  marginTop: "10px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  alignItems: "center",
  [mq[1] as string]: {
    justifyContent: "flex-end",
    flexDirection: "row",
    margin: 0,
    columnGap: "20px",
  },
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
  [mq[1] as string]: {
    border: "none",
    width: "unset",
    borderRadius: "6px",
    ":hover": {
      cursor: "pointer",
      padding: "1rem 1.5rem",
      border: "1px solid white",
    },
  },
});
const CostumeLink = styled(Link)(Anchor, {
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
const NavBar: FC<TNavBar> = ({ isActive }) => {
  console.log("nav bar component");
  return (
    <NavBarContainer isActive={isActive as boolean}>
      <UnderList>
        <List>
          <CostumeLink to={"/"}>
            <p>Create New Contact</p>
            <MdPersonAddAlt1 size={30} />
          </CostumeLink>
        </List>
        <List>
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
