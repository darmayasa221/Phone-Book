import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMutation } from "@apollo/client";
import { ICreateForm, TPhoneInputs } from "../../types/components/Form";
import { CREATE_CONTACT } from "../../dataProvider/contact";
import {
  ButtonCount,
  CostumeForm,
  WrapperBody,
  WrapperButton,
  WrapperCountButtons,
  WrapperFooter,
  WrapperFormModal,
  WrapperHeader,
  WrapperPhoneInput,
  WrapperPhoneInputs,
} from "../../globalStyles/form";
import CostumeInput from "../CostumeInput/CostumeInput";
import { TActiveRef, TCostumeInput } from "../../types/components/CostumeInput";
import { inputValidation } from "../CostumeInput/inputValidation";
const CreateForm: FC<ICreateForm> = ({ onCloseModal, refetch }) => {
  const [createContact, { loading }] = useMutation(CREATE_CONTACT);
  const [count, setCount] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [phoneInputs, setPhoneInputs] = useState<TPhoneInputs>([
    { number: "" },
  ]);
  const firstNameInputRef = React.useRef<TActiveRef | null>(null);
  const lastNameInputRef = React.useRef<TActiveRef | null>(null);
  const [firstName, setFirstName] = useState<TCostumeInput>({
    isValid: false,
    value: "",
  });
  const [lastName, setLastName] = useState<TCostumeInput>({
    isValid: false,
    value: "",
  });
  const onHandlerClose = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      if (onCloseModal) {
        onCloseModal();
      }
    },
    [],
  );
  const onHandlerIncreaseInputPhones = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setCount((prev) => {
        const count = prev + 1;
        phoneInputs.push({ number: "" });
        return count;
      });
    },
    [phoneInputs],
  );
  const onHandlerDecreaseInputPhones = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      event.preventDefault();
      setCount((prev) => {
        if (prev === 1) {
          return prev;
        }
        phoneInputs.pop();
        const count = prev - 1;
        return count;
      });
    },
    [phoneInputs],
  );
  const onChangeFistName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = inputValidation({
        action: "FIRST_NAME",
        value: event.target.value,
      });
      setMessage(() => inputValue.message);
      setFirstName((prev) => ({
        ...prev,
        isValid: inputValue.isValid,
        value: event.target.value,
      }));
    },
    [],
  );
  const onChangeLastName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = inputValidation({
        action: "LAST_NAME",
        value: event.target.value,
      });
      setMessage(() => inputValue.message);
      setLastName((prev) => ({
        ...prev,
        isValid: inputValue.isValid,
        value: event.target.value,
      }));
    },
    [],
  );
  const onChangePhoneNumber = useCallback(
    (index: number, event: ChangeEvent<HTMLInputElement>) => {
      setPhoneInputs((prev) => {
        prev[index].number = event.target.value;
        return prev;
      });
    },
    [],
  );
  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await createContact({
        variables: {
          first_name: firstName.value,
          last_name: lastName.value,
          phones: phoneInputs,
        },
      });
      if (refetch) {
        await refetch();
      }
      if (onCloseModal) {
        onCloseModal();
      }
    },
    [phoneInputs, lastName],
  );
  useEffect(() => {
    return () => {
      setFirstName(() => ({ isValid: false, value: "" }));
      setLastName(() => ({ isValid: false, value: "" }));
      setPhoneInputs(() => [{ number: "" }]);
      setCount(() => 1);
    };
  }, [loading]);
  console.log("CREATE FORM");
  return (
    <WrapperFormModal>
      <CostumeForm onSubmit={onSubmit}>
        <WrapperHeader>
          <h1>Create Contact</h1>
        </WrapperHeader>
        <WrapperBody>
          <label htmlFor="firstName">First Name</label>
          <CostumeInput
            ref={firstNameInputRef}
            id="firstName"
            type="text"
            value={firstName.value}
            onChange={onChangeFistName}
            onBlur={onChangeFistName}
            isValid={firstName.isValid}
            message={message}
            placeholder="jhon"
          />
          <label htmlFor="lastName">Last Name</label>
          <CostumeInput
            ref={lastNameInputRef}
            id="lastName"
            type="text"
            value={lastName.value}
            onChange={onChangeLastName}
            onBlur={onChangeLastName}
            isValid={lastName.isValid}
            message={message}
            placeholder="bon"
          />
          <label htmlFor="phone">Phone Number</label>
          <WrapperPhoneInputs>
            {phoneInputs?.map((phone, index) => {
              return (
                <WrapperPhoneInput key={index}>
                  <p>Phone {index + 1} </p>
                  <CostumeInput
                    id="phone"
                    onChange={(event) => {
                      onChangePhoneNumber(index, event);
                    }}
                    type="number"
                    placeholder="08111111111"
                    defaultValue={phone?.number}
                  />
                </WrapperPhoneInput>
              );
            })}
          </WrapperPhoneInputs>
          <WrapperCountButtons>
            <ButtonCount onClick={onHandlerIncreaseInputPhones}>+</ButtonCount>
            {phoneInputs.length > 1 ? (
              <ButtonCount onClick={onHandlerDecreaseInputPhones}>
                -
              </ButtonCount>
            ) : (
              <></>
            )}
          </WrapperCountButtons>
          <WrapperFooter>
            <WrapperButton>
              <button onClick={onHandlerClose}>cancel</button>
            </WrapperButton>
            <WrapperButton>
              <button>save</button>
            </WrapperButton>
          </WrapperFooter>
        </WrapperBody>
      </CostumeForm>
    </WrapperFormModal>
  );
};

export default memo(CreateForm);
