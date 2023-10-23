import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import "@testing-library/jest-dom";

describe("test", () => {
  it("should render hello world", async () => {
    render(<App />);
    const linkElement = screen.getByText(/hello world/);
    expect(linkElement).toBeInTheDocument();
  });
});
