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
  CostumeInput,
  WrapperBody,
  WrapperButton,
  WrapperFooter,
  WrapperFormModal,
  WrapperHeader,
  WrapperPhoneInputs,
} from "../../globalStyles/form";

const EditForm: FC<IEditForm> = ({ onCloseModal, data, refetch }) => {
  console.log(data);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [updateNumber] = useMutation(UPDATE_NUMBER);
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
              first_name: firstName,
              last_name: lastName,
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
    setFirstName(() => data?.first_name as string);
    setLastName(() => data?.last_name as string);
    setPhoneInputs(() => phones as TPhoneInputs);
    return () => {
      setFirstName(() => "");
      setLastName(() => "");
      setPhoneInputs(() => [{ number: "" }]);
    };
  }, []);
  console.log("EDIT FORM");
  return (
    <WrapperFormModal>
      <CostumeForm onSubmit={onSubmit}>
        <WrapperHeader>
          <h1>Edit Contact</h1>
        </WrapperHeader>
        <WrapperBody>
          <label htmlFor="firstName">First Name </label>
          <CostumeInput
            id="firstName"
            name="firstName"
            onChange={onChangeFistName}
            type="text"
            placeholder="Joe"
            defaultValue={firstName}
          />
          <label htmlFor="lastName">Last Name </label>
          <CostumeInput
            id="lastName"
            name="lastName"
            onChange={onChangeLastName}
            type="text"
            placeholder="Sona"
            defaultValue={lastName}
          />
          <label htmlFor="phone">Phone Number </label>
          {phoneInputs?.map((phone, index) => {
            console.log(phone);
            return (
              <WrapperPhoneInputs key={index}>
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
