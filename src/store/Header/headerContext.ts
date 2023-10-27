import { createContext } from "react";
import { IHeaderContext } from "../../types/store/HeaderContext";

const HeaderContext = createContext<IHeaderContext>({} as IHeaderContext);
export default HeaderContext;
