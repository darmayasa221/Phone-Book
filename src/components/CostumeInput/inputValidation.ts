import {
  TInput,
  TInputValidation,
} from "../../types/components/InputValidation";

const inputValidation = ({ action, value }: TInputValidation): TInput => {
  const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
  const isValid = specialCharactersRegex.test(value);
  if (isValid) {
    return {
      isValid,
      message: `${action} doesn't have a special Character `,
    };
  }
  return {
    isValid,
    message: "",
  };
};

export { inputValidation };
