import { css } from "@emotion/react";

export const globalStyle = css({
  ":root": {
    "--main-background-color": "#E5E5E51F",
  },
  html: {
    background: "var(--main-background-color)",
  },
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "#root": {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
  },
});
