import { ApolloError } from "@apollo/client";
import { TContacts } from "../components/Contact";
import { Dispatch, SetStateAction } from "react";
interface IContactContext {
  contacts: TContacts;
  limit: number;
  offset: number;
  loading: boolean;
  error: ApolloError | undefined;
  setInputSearch: Dispatch<SetStateAction<string | undefined>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  postContactFavorite: (id: number) => void;
}
export { IContactContext };
