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

const GqlTestHelper = {
  async getContacts(limit: number, offset: number, search: string) {
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
    return data;
  },
  async getContact(id: number) {
    const { data } = await apolloClient.query({
      query: GET_CONTACT_BY_ID,
      variables: {
        id,
      },
    });
    return data;
  },
  async createContact(
    first_name: string,
    last_name: string,
    phones: Phone_Insert_Input,
  ) {
    const { data } = await apolloClient.query({
      query: CREATE_CONTACT,
      variables: {
        first_name,
        last_name,
        phones,
      },
    });
    return data;
  },
  async updateContact(id: number, contact: Contact_Set_Input) {
    const { data } = await apolloClient.query({
      query: UPDATE_CONTACT,
      variables: {
        id,
        _set: contact,
      },
    });
    return data;
  },
  async updateNumber(pervContact: Phone_Pk_Columns_Input, newNumber: string) {
    const { data } = await apolloClient.query({
      query: UPDATE_NUMBER,
      variables: {
        pk_columns: pervContact,
        new_phone_number: newNumber,
      },
    });
    return data;
  },
  async deleteContact(id: number) {
    const { data } = await apolloClient.query({
      query: DELETE_CONTACT,
      variables: {
        id,
      },
    });
    return data;
  },
};

export default GqlTestHelper;
