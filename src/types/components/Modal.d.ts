import { ReactNode } from "react";

type TBackdrop = {
  onModalOff: () => void;
};
interface IModal extends TBackdrop {
  children: ReactNode;
}

export { TBackdrop, IModal };
