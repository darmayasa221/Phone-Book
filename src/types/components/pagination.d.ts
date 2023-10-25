import { Dispatch, SetStateAction } from "react";

export type TPaginationControls = {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  offsite: number;
  setOffsite: Dispatch<SetStateAction<number>>;
  count: number;
};
