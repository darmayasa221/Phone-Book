import { createContext } from "react";
import { IModalContext } from "../../types/store/ModalContext";

const ModalContext = createContext<IModalContext>({} as IModalContext);

export default ModalContext;
