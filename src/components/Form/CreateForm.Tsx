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
import { ICreateForm, TPhoneInputs } from "../../types/components/Form";
import { CREATE_CONTACT } from "../../dataProvider/contact";
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
          <button onClick={onHandlerDecreaseInputPhones}>-</button>
          <button onClick={onHandlerIncreaseInputPhones}>+</button>
        </WrapperBody>
        <WrapperFooter>
          <button onClick={onHandlerClose}>cancel</button>
          <button>save</button>
        </WrapperFooter>
      </CostumeForm>
    </Wrapper>
  );
};

export default memo(CreateForm);
