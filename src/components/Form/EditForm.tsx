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
import { UPDATE_CONTACT, UPDATE_NUMBER } from "../../dataProvider/contact";
import { IEditForm, TPhoneInputs } from "../../types/components/Form";
import {
  CostumeForm,
  WrapperBody,
  WrapperButton,
  WrapperFooter,
  WrapperFormModal,
  WrapperHeader,
  WrapperPhoneInputs,
} from "../../globalStyles/form";
import { TActiveRef, TCostumeInput } from "../../types/components/CostumeInput";
import CostumeInput from "../CostumeInput/CostumeInput";
import { inputValidation } from "../CostumeInput/inputValidation";

const EditForm: FC<IEditForm> = ({ onCloseModal, data, refetch }) => {
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [updateNumber] = useMutation(UPDATE_NUMBER);
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
      const bulkPhoneNumber = async () => {
        phoneInputs.forEach(async (phone, index) => {
          await updateNumber({
            variables: {
              pk_columns: {
                contact_id: data?.id as number,
                number: data?.phones[index]?.number as string,
              },
              new_phone_number: phone?.number,
            },
          });
        });
      };
      await Promise.all([
        bulkPhoneNumber(),
        updateContact({
          variables: {
            id: data?.id as number,
            _set: {
              first_name: firstName.value,
              last_name: lastName.value,
            },
          },
        }),
      ]);
      if (refetch) {
        await refetch();
      }
      if (onCloseModal) {
        onCloseModal();
      }
    },
    [phoneInputs, firstName, lastName, data],
  );
  useEffect(() => {
    const phones = data?.phones?.map(({ number }) => ({
      number,
    })) as TPhoneInputs;
    setFirstName((prev) => ({
      ...prev,
      isValid: false,
      value: data?.first_name as string,
    }));
    setLastName((prev) => ({
      ...prev,
      isValid: false,
      value: data?.last_name as string,
    }));
    setPhoneInputs(() => phones as TPhoneInputs);
    return () => {
      setFirstName(() => ({ isValid: false, value: "" }));
      setLastName(() => ({ isValid: false, value: "" }));
      setPhoneInputs(() => [{ number: "" }]);
    };
  }, []);
  return (
    <WrapperFormModal>
      <CostumeForm onSubmit={onSubmit}>
        <WrapperHeader>
          <h1>Edit Contact</h1>
        </WrapperHeader>
        <WrapperBody>
          <label htmlFor="firstName">First Name </label>
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
          <label htmlFor="lastName">Last Name </label>
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
          <label htmlFor="phone">Phone Number </label>
          {phoneInputs?.map((phone, index) => {
            return (
              <WrapperPhoneInputs key={index}>
                <p>Phone {index + 1} </p>
                <CostumeInput
                  id="phone"
                  onChange={(event) => {
                    onChangePhoneNumber(index, event);
                  }}
                  type="number"
                  placeholder="08111111111"
                  value={phone?.number}
                />
              </WrapperPhoneInputs>
            );
          })}
        </WrapperBody>
        <WrapperFooter>
          <WrapperButton>
            <button onClick={onHandlerClose}>cancel</button>
          </WrapperButton>
          <WrapperButton>
            <button>save</button>
          </WrapperButton>
        </WrapperFooter>
      </CostumeForm>
    </WrapperFormModal>
  );
};

export default memo(EditForm);
