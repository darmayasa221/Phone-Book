import styled from "@emotion/styled";
import React, { memo } from "react";
import { Outlet } from "react-router-dom";
const Container = styled.div({
  margin: "0.2rem 0.8rem",
});
const Main = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default memo(Main);
