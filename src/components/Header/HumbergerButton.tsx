import React, { FC, memo, useEffect, useState } from "react";
import { mq } from "../../globalStyles/responsive";
import { IHamburgerButton } from "../../types/components/humbergerButton";
import styled from "@emotion/styled";
const HamburgerButtonWrapper = styled.button<
  Pick<IHamburgerButton, "isActive">
>(({ isActive }) => ({
  display: "block",
  position: "relative",
  cursor: "pointer",
  background: "none",
  border: "none",
  span: {
    display: "block",
    width: "25px",
    height: "3px",
    position: "relative",
    marginBottom: "5px",
    borderRadius: "6px",
    backgroundColor: "black",
    transformOrigin: "0 0",
    transition: "0.4s",
  },
  ":hover": {
    "span:nth-of-type(2)": {
      transform: "translateX(10px)",
    },
  },
  "span:nth-of-type(1)": {
    transform: !isActive ? "none" : "translate(0px, 0px) rotate(45deg)",
  },
  "span:nth-of-type(2)": {
    opacity: !isActive ? "unset" : 0,
    transform: !isActive ? "none" : "translateX(-15px)",
  },
  "span:nth-of-type(3)": {
    transform: !isActive ? "none" : "translate(-2px, 2px) rotate(-45deg)",
  },
  [mq[1] as string]: {
    display: "none",
  },
}));
const HamburgerButton: FC<Pick<IHamburgerButton, "setMobile">> = ({
  setMobile,
}) => {
  console.log("hamburger component");
  const [isActive, setIsActive] = useState<boolean>(false);
  const onClick = (): void =>
    !isActive ? setIsActive(() => true) : setIsActive(() => false);
  useEffect(() => {
    setMobile(isActive);
  }, [isActive]);
  return (
    <HamburgerButtonWrapper isActive={isActive} type="button" onClick={onClick}>
      <span />
      <span />
      <span />
    </HamburgerButtonWrapper>
  );
};

export default memo(HamburgerButton);
