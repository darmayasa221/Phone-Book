import { TContact } from "../components/Contact";

interface ILocalStorageContext
  extends Array<TContact & { favorite: boolean }> {}

export { ILocalStorageContext };
