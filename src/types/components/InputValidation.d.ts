type TInputValidation = {
  value: string;
  action: "FIRST_NAME" | "LAST_NAME";
};
type TInput = {
  isValid: boolean;
  message: string;
};

export { TInputValidation, TInput };
