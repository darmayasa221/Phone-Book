import { Global } from "@emotion/react";
import React, { memo } from "react";
import { globalStyle } from "./globalStyles/globalStyle";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <Header />
      <Main />
    </>
  );
};

export default memo(App);
