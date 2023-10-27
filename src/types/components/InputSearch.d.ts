import { Dispatch, SetStateAction } from "react";

export type TInputSearch = {
  isSearch: boolean;
};
export interface IInputSearchProps extends TInputSearch {
  setInputSearch: Dispatch<SetStateAction<string | undefined>>;
}
