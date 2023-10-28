import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PaginationControls from "../../components/Pagination/PaginationControls";
import "@testing-library/jest-dom";
describe("Pagination", () => {
  it("should render correctly", async () => {
    // arrange
    // action
    render(
      <PaginationControls
        limit={10}
        setLimit={() => {}}
        offsite={0}
        setOffsite={() => {}}
        count={10}
      />,
      { wrapper: BrowserRouter },
    );
    // assert
    const buttonPrev = screen.getByRole("button", { name: "prev page" });
    const buttonNext = screen.getByRole("button", { name: "next page" });
    expect(buttonPrev).toBeTruthy();
    expect(buttonNext).toBeTruthy();
  });
});
