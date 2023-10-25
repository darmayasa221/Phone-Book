import styled from "@emotion/styled";
import React, { FC, ReactNode, memo } from "react";
const CostumeCard = styled.div({
  border: "1px solid black",
  padding: "3px 0",
});
const Card: FC<{ children: ReactNode }> = ({ children }) => {
  console.log("card");
  return <CostumeCard>{children}</CostumeCard>;
};

export default memo(Card);
