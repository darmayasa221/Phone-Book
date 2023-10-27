import { TContact } from "./Contact";

interface IItem {
  item: TContact;
  postContactFavorite?: (id: number) => void;
  deleteContact?: (id: number) => void;
  onSelectContactToUpdate?: (item: TContact) => void;
}
