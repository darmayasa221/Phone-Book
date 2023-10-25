export type TContact = {
  [x: string]: string | Array | undefined;
  __typename?: "contact" | undefined;
  id: number;
  first_name: string;
  last_name: string;
  phones: Array<{
    __typename?: "phone" | undefined;
    number: string;
  }>;
};

export type TContacts = Array<TContact>;
