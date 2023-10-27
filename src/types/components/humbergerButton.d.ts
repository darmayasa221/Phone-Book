import { Dispatch, SetStateAction } from "react";
import { TNavBar } from "./navBar";

export interface IHamburgerButton extends TNavBar {
  setMobile: Dispatch<SetStateAction<boolean>>;
}
