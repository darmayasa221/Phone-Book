import { gql } from "../__generated__/gql";

const CREATE_CONTACT = gql(/* GraphQL */ `
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`);

const GET_CONTACT = gql(/* GraphQL */ `
  query Contact(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`);

const DELETE_CONTACT = gql(/* GraphQL*/ `
mutation DeleteContact($id: Int!) {
  delete_contact_by_pk(id: $id) {
    first_name
    last_name
    id
  }
}
`);

const UPDATE_CONTACT = gql(/* GraphQL*/ `
mutation UpdateContact($id: Int!, $_set: contact_set_input) {
  update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    first_name
    last_name
    phones {
      number
    }
  }
}
`);

const UPDATE_NUMBER = gql(/* GraphQL*/ `
mutation UpdatePhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
  update_phone_by_pk(pk_columns: $pk_columns, _set: {number: $new_phone_number}) {
    contact {
      id
      last_name
      first_name
      created_at
      phones {
        number
      }
    }
  }
}
`);
export {
  GET_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  UPDATE_NUMBER,
  CREATE_CONTACT,
};
