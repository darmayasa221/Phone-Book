import { Dispatch, SetStateAction } from "react";
import { TInputSearch } from "../components/InputSearch";
import { THeader } from "../components/Header";

export interface IHeaderContext extends TInputSearch, THeader {}
