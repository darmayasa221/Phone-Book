import { FORM_ACTION } from "../../enum/form";
import { TContact } from "./Contact";

type TForm = {
  refetch?: () => Promise<any>;
  onCloseModal?: () => void;
};
type TPhoneInputs = Array<{ number: string }>;
interface ICreateForm extends TForm {}
interface IEditForm extends TForm {
  data: TContact;
}
export { TForm, TPhoneInputs, ICreateForm, IEditForm };
