import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CreateForm from "../../components/Form/CreateForm";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";

describe("Create Form", () => {
  it("should render correctly", async () => {
    // arrange
    // action && assert
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CreateForm />
      </MockedProvider>,
    );

    const header = screen.getByText("Create Contact");
    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    const phoneLabel = screen.getByText("Phone Number");

    expect(header).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveValue("Doe");
    expect(phoneLabel).toBeInTheDocument();
  });
});
