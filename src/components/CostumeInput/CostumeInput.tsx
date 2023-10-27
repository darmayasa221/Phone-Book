import styled from "@emotion/styled";
import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { ICostumeInput, TActiveRef } from "../../types/components/CostumeInput";
const Input = styled.input<Pick<ICostumeInput, "isValid">>(({ isValid }) => ({
  margin: "5px 0 8px 0",
  padding: "5px",
  borderRadius: "5px",
  outline: "none",
  border: "1px solid gray",
  ":focus,:active": {
    backgroundColor:
      !isValid === null ? "none" : !isValid ? "none" : "#ff9e9e75",
  },
}));
const ErrorMessage = styled.p<Pick<ICostumeInput, "isValid">>(
  ({ isValid }) => ({
    color: "red",
    fontSize: "14px",
    paddingLeft: "4px",
    paddingBottom: !isValid === null ? "none" : !isValid ? "none" : "5px",
  }),
);
const CostumeInput = forwardRef<TActiveRef, ICostumeInput>(
  (
    { id, type, message, isValid, onChange, onBlur, value, placeholder },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const activate = () => {
      inputRef.current?.focus();
    };
    useImperativeHandle(ref, () => {
      return {
        activate: activate,
      };
    });
    return (
      <>
        <Input
          ref={inputRef}
          type={type}
          id={id}
          onChange={onChange}
          isValid={isValid}
          onBlur={onBlur}
          defaultValue={value}
          placeholder={placeholder}
        />
        {isValid ? (
          <ErrorMessage isValid={isValid}>
            <i>{message}</i>
          </ErrorMessage>
        ) : (
          <></>
        )}
      </>
    );
  },
);

export default React.memo(CostumeInput);
