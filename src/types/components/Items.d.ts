import { TContacts } from "./Contact";

interface IItems {
  data: TContacts;
  postContactFavorite?: (id: number) => void;
  deleteContact?: (id: number) => void;
  onSelectContactToUpdate?: (item: TContact) => void;
}
