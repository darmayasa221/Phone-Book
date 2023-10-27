import * as React from "react";
type TActiveRef = {
  activate: () => void;
};
type TCostumeInput = {
  value: string;
  isValid: boolean;
};
interface ICostumeInput extends Partial<HTMLInputElement> {
  from?: "FIRST_NAME" | "LAST_NAME";
  placeholder?: string;
  isValid?: boolean | null;
  message?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>,
  ) => void;
}

export { TActiveRef, ICostumeInput, TCostumeInput };
