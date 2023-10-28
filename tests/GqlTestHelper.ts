import { QueryOptions } from "@apollo/client";
import {
  Contact_Select_Column,
  Contact_Set_Input,
  Order_By,
  Phone_Insert_Input,
  Phone_Pk_Columns_Input,
} from "../src/__generated__/graphql";
import { apolloClient } from "../src/api/apollo/apolloClient";
import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT,
  GET_CONTACT_BY_ID,
  UPDATE_CONTACT,
  UPDATE_NUMBER,
} from "../src/dataProvider/contact";
type mocks = {
  request: QueryOptions;
  result?: { data: any };
  error?: Error;
};
const GqlTestHelper = {
  async getContacts(
    limit: number,
    offset: number,
    search: string,
    error?: Error,
  ): Promise<mocks> {
    const { data } = await apolloClient.query({
      query: GET_CONTACT,
      variables: {
        limit,
        offset,
        where: {
          first_name: {
            _like: Boolean(search) ? `%${search}%` : "%%",
          },
        },
        distinct_on: [Contact_Select_Column.CreatedAt],
        order_by: [{ created_at: Order_By.Desc }],
      },
    });
    return {
      request: {
        query: GET_CONTACT,
        variables: {
          limit,
          offset,
          where: {
            first_name: {
              _like: Boolean(search) ? `%${search}%` : "%%",
            },
          },
          distinct_on: [Contact_Select_Column.CreatedAt],
          order_by: [{ created_at: Order_By.Desc }],
        },
      },
      result: { data: !error ? data : undefined },
      error,
    };
  },
  async getContact(id: number, error?: Error): Promise<mocks> {
    const { data } = await apolloClient.query({
      query: GET_CONTACT_BY_ID,
      variables: {
        id,
      },
    });
    return {
      request: {
        query: GET_CONTACT_BY_ID,
        variables: {
          id,
        },
      },
      result: { data: !error ? data : undefined },
      error,
    };
  },
  async createContact(
    first_name: string,
    last_name: string,
    phones: Phone_Insert_Input,
    error?: Error,
  ): Promise<mocks> {
    const { data } = await apolloClient.query({
      query: CREATE_CONTACT,
      variables: {
        first_name,
        last_name,
        phones,
      },
    });
    return {
      request: {
        query: CREATE_CONTACT,
        variables: {
          first_name,
          last_name,
          phones,
        },
      },
      result: { data: !error ? data : undefined },
      error,
    };
  },
  async updateContact(
    id: number,
    contact: Contact_Set_Input,
    error?: Error,
  ): Promise<mocks> {
    const { data } = await apolloClient.query({
      query: UPDATE_CONTACT,
      variables: {
        id,
        _set: contact,
      },
    });
    return {
      request: {
        query: UPDATE_CONTACT,
        variables: {
          id,
          _set: contact,
        },
      },
      result: { data: !error ? data : undefined },
      error,
    };
  },
  async updateNumber(
    pervContact: Phone_Pk_Columns_Input,
    newNumber: string,
    error?: Error,
  ): Promise<mocks> {
    const { data } = await apolloClient.query({
      query: UPDATE_NUMBER,
      variables: {
        pk_columns: pervContact,
        new_phone_number: newNumber,
      },
    });
    return {
      request: {
        query: UPDATE_NUMBER,
        variables: {
          pk_columns: pervContact,
          new_phone_number: newNumber,
        },
      },
      result: { data: !error ? data : undefined },
      error,
    };
  },
  async deleteContact(id: number, error?: Error): Promise<mocks> {
    const { data } = await apolloClient.query({
      query: DELETE_CONTACT,
      variables: {
        id,
      },
    });
    return {
      request: {
        query: DELETE_CONTACT,
        variables: {
          id,
        },
      },
      result: { data: !error ? data : undefined },
      error,
    };
  },
};

export default GqlTestHelper;
