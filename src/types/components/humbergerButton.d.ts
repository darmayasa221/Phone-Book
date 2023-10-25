import { TNavBar } from "./navBar";

export interface IHamburgerButton extends TNavBar {
  setMobile(params: boolean): void;
}
