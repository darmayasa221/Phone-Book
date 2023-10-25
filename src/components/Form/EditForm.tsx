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
import styled from "@emotion/styled";
import { mq } from "../../globalStyles/responsive";
import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT, UPDATE_NUMBER } from "../../dataProvider/contact";
import { IEditForm, TPhoneInputs } from "../../types/components/Form";
const Wrapper = styled.div({
  background: "var(--second-background-color)",
  boxShadow: " 0px 6px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  position: "fixed",
  zIndex: 31,
  width: "320px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  padding: "10px 38px",
  [mq[1] as string]: {
    width: "490px",
    height: "355px",
  },
});
const WrapperHeader = styled.div({ display: "flex", justifyContent: "center" });
const WrapperBody = styled.div({
  display: "flex",
  flexDirection: "column",
});
const WrapperFooter = styled.div({
  display: "flex",
  justifyContent: "center",
  columnGap: "5rem",
});
const CostumeForm = styled.form({
  display: "flex",
  flexDirection: "column",
  rowGap: "1rem",
});
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
    <Wrapper>
      <CostumeForm onSubmit={onSubmit}>
        <WrapperHeader>Head</WrapperHeader>
        <WrapperBody>
          <label>First Name </label>
          <input
            name="firstName"
            onChange={onChangeFistName}
            type="text"
            placeholder="Joe"
            defaultValue={firstName}
          />
          <label>Last Name </label>
          <input
            name="lastName"
            onChange={onChangeLastName}
            type="text"
            placeholder="Sona"
            defaultValue={lastName}
          />
          <label>Phone Number </label>
          {phoneInputs?.map((phone, index) => {
            console.log(phone);
            return (
              <div key={index}>
                <p>Phone {index + 1} </p>
                <input
                  name={`phone-${index}`}
                  onChange={(event) => {
                    onChangePhoneNumber(index, event);
                  }}
                  type="number"
                  placeholder="08111111111"
                  defaultValue={phone?.number}
                />
              </div>
            );
          })}
        </WrapperBody>
        <WrapperFooter>
          <button onClick={onHandlerClose}>cancel</button>
          <button>save</button>
        </WrapperFooter>
      </CostumeForm>
    </Wrapper>
  );
};

export default memo(EditForm);
