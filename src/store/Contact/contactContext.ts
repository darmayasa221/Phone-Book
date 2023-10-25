import { createContext } from "react";
import { IContactContext } from "../../types/store/ContactContextProvider";

const ContactContext = createContext<IContactContext>({} as IContactContext);

export default ContactContext;
