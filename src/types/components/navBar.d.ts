import { Dispatch, SetStateAction } from "react";

export type TNavBar = {
  isActive: boolean;
  setMobileOff: Dispatch<SetStateAction<boolean>>;
};
