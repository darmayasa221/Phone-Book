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
  CostumeInput,
  WrapperBody,
  WrapperButton,
  WrapperCountButtons,
  WrapperFooter,
  WrapperFormModal,
  WrapperHeader,
  WrapperPhoneInput,
  WrapperPhoneInputs,
} from "../../globalStyles/form";

const CreateForm: FC<ICreateForm> = ({ onCloseModal, refetch }) => {
  const [createContact, { loading }] = useMutation(CREATE_CONTACT);
  const [count, setCount] = useState<number>(1);
  const [phoneInputs, setPhoneInputs] = useState<TPhoneInputs>([
    { number: "" },
  ]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
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
      setFirstName(() => event.target.value);
    },
    [],
  );
  const onChangeLastName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLastName(() => event.target.value);
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
          first_name: firstName,
          last_name: lastName,
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
    [phoneInputs, firstName, lastName],
  );
  useEffect(() => {
    return () => {
      setFirstName(() => "");
      setLastName(() => "");
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
            id="firstName"
            name="firstName"
            onChange={onChangeFistName}
            type="text"
            placeholder="Joe"
            defaultValue={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <CostumeInput
            id="lastName"
            name="lastName"
            onChange={onChangeLastName}
            type="text"
            placeholder="Sona"
            defaultValue={lastName}
          />
          <label htmlFor="phone">Phone Number</label>
          <WrapperPhoneInputs>
            {phoneInputs?.map((phone, index) => {
              console.log(phone);
              return (
                <WrapperPhoneInput key={index}>
                  <p>Phone {index + 1} </p>
                  <CostumeInput
                    id="phone"
                    name="phone"
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

export default memo(CreateForm);
