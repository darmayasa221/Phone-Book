import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { RouterProvider } from "react-router-dom";
import routes from "../routes/routes";
describe("App", () => {
  it("should render component", async () => {
    render(<RouterProvider router={routes} />);
  });
});
