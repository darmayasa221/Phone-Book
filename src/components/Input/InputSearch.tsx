import React, { ChangeEvent, FC, memo, useCallback } from "react";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import {
  IInputSearchProps,
  TInputSearch,
} from "../../types/components/InputSearch";
const Wrapper = styled.div<TInputSearch>(({ isSearch }) => ({
  position: "relative",
  zIndex: "0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "35px",
  columnGap: "5px",
  border: "1px solid black",
  margin: "0.2rem 0",
  padding: "0 2.1rem 0 0.8rem",
  transition: "0.3s",
  transform: !isSearch ? "translateY(-115%)" : "translateY(0%)",
  opacity: !isSearch ? 0 : 1,
}));
const CostumeInputSearch = styled.input({
  border: "none",
  height: "33px",
  width: "100%",
  outline: "none",
  fontSize: "18px",
});
const InputSearch: FC<IInputSearchProps> = ({ isSearch, setInputSearch }) => {
  const onChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(() => event.target.value);
  }, []);
  return (
    <Wrapper isSearch={isSearch}>
      <CostumeInputSearch onChange={onChangeInput} />
      <FaSearch size={25} />
    </Wrapper>
  );
};

export default memo(InputSearch);
