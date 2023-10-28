import { render, screen } from "@testing-library/react";
import React from "react";
import Contacts from "../../pages/Contacts/Index";
import { MockedProvider } from "@apollo/client/testing";
import GqlTestHelper from "../../../tests/GqlTestHelper";
import ModalContextProvider from "../../store/Modal/ModalContextProvider";
import HeaderContextProvider from "../../store/Header/HeaderContextProvider";
import { TContact, TContacts } from "../../types/components/Contact";
import "@testing-library/jest-dom";
describe("Contacts Component", () => {
  it("should render correctly component", async () => {
    // arrange
    // mock contact data
    const mockContacts = await GqlTestHelper.getContacts(10, 0, "");
    const contacts: { contact: TContacts } = mockContacts?.result?.data;
    // action
    render(
      <MockedProvider mocks={[mockContacts]} addTypename={false}>
        <ModalContextProvider>
          <HeaderContextProvider>
            <Contacts />
          </HeaderContextProvider>
        </ModalContextProvider>
      </MockedProvider>,
    );
    // assert
    contacts.contact.forEach(async (contact: TContact) => {
      expect(await screen.findByText(contact.first_name)).toBeInTheDocument();
      expect(await screen.findByText(contact.last_name)).toBeInTheDocument();
      expect(
        await screen.findByText(contact.phones[0].number),
      ).toBeInTheDocument();
    });
  });
  it("should render with text loading... when data is empty", async () => {
    // arrange
    // mock contact data
    const mockContacts: Array<any> = [];
    // action
    render(
      <MockedProvider mocks={mockContacts} addTypename={false}>
        <ModalContextProvider>
          <HeaderContextProvider>
            <Contacts />
          </HeaderContextProvider>
        </ModalContextProvider>
      </MockedProvider>,
    );
    // assert
    expect(await screen.findByText(/loading.../)).toBeInTheDocument();
  });
  it("should render with text error message when failed to get data ", async () => {
    // arrange
    // mock contact data
    const mockContacts = await GqlTestHelper.getContacts(
      10,
      0,
      "",
      new Error("An error occurred"),
    );
    // action
    render(
      <MockedProvider mocks={[mockContacts]} addTypename={false}>
        <ModalContextProvider>
          <HeaderContextProvider>
            <Contacts />
          </HeaderContextProvider>
        </ModalContextProvider>
      </MockedProvider>,
    );
    // assert
    expect(await screen.findByText(/An error occurred/)).toBeInTheDocument();
  });
});
