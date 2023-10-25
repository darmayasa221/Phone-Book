import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ContactContext from "./contactContext";
import { LOCAL_STORAGE_ITEM } from "../../enum/localstorageItems";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { useQuery } from "@apollo/client";
import { GET_CONTACT } from "../../dataProvider/contact";
import { Contact_Select_Column } from "../../__generated__/graphql";
import { ILocalStorageContext } from "../../types/store/LocalStorageContext";
import { TContacts } from "../../types/components/Contact";

const ContactContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [inputSearch, setInputSearch] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [contacts, setContacts] = useState<TContacts>([] as TContacts);
  const [isClick, setIsClick] = useState<number>(0);
  const [contactFavorite, setContactFavorite] = useState<TContacts | null>(
    null,
  );
  //check has ben create contact favorite
  useEffect(() => {
    const isFavorite = getLocalStorage(LOCAL_STORAGE_ITEM.IS_FAVORITE);
    if (isFavorite) {
      setIsFavorite(() => isFavorite?.isFavorite);
    }
  }, [isClick]);
  // get contact from graphql
  const { loading, error, data } = useQuery(GET_CONTACT, {
    variables: {
      limit: limit,
      offset: offset,
      where: {
        first_name: {
          _like: Boolean(inputSearch) ? `%${inputSearch}%` : "%%",
        },
      },
      distinct_on: [Contact_Select_Column.CreatedAt],
    },
  });
  // handler to post favorite contact
  const postContactFavorite = useCallback(
    (id: number) => {
      let isAlready = false;
      const favoriteContact: ILocalStorageContext = getLocalStorage(
        LOCAL_STORAGE_ITEM.CONTACT_FAVORITE,
      );
      if (favoriteContact !== null) {
        favoriteContact?.forEach((contact) => {
          if (contact.id === id) {
            isAlready = true;
          }
        });
      }
      const contactUpdate = data?.contact.filter(
        (contact) => contact.id === id,
      );
      if (isAlready) {
        setIsClick((prev) => prev - 1);
        return;
      }
      if (favoriteContact === null) {
        setLocalStorage(LOCAL_STORAGE_ITEM.CONTACT_FAVORITE, contactUpdate);
        setLocalStorage(LOCAL_STORAGE_ITEM.IS_FAVORITE, { isFavorite: true });
        setIsClick((prev) => prev + 1);
        return;
      }
      setLocalStorage(LOCAL_STORAGE_ITEM.CONTACT_FAVORITE, [
        ...favoriteContact,
        ...(contactUpdate as TContacts),
      ]);
      setLocalStorage(LOCAL_STORAGE_ITEM.IS_FAVORITE, { isFavorite: true });
      setIsClick((prev) => prev + 1);
    },
    [data],
  );
  // filtering data
  useEffect(() => {
    console.log(isFavorite);
    if (isFavorite) {
      const favoriteContact: ILocalStorageContext = getLocalStorage(
        LOCAL_STORAGE_ITEM.CONTACT_FAVORITE,
      );
      console.log(favoriteContact, "ini dia");
      const dataListContact = data?.contact?.filter((item) => {
        let isReady = true;
        favoriteContact.forEach((itemFavorite) => {
          console.log(item.id, itemFavorite.id);
          console.log(item.id === itemFavorite.id);
          if (item.id === itemFavorite.id) {
            isReady = false;
            return;
          }
          isReady = true;
        });
        return isReady;
      });
      console.log(dataListContact);
      setContacts(() => dataListContact as TContacts);
    } else {
      setContacts(() => data?.contact as TContacts);
    }
  }, [data, isFavorite, isClick]);
  const ContactContextValuePostFavorite = useMemo(
    () => ({ postContactFavorite }),
    [data],
  );
  const ContactContextValueFunction = useMemo(
    () => ({
      setInputSearch,
      setLimit,
      setOffset,
      limit,
    }),
    [],
  );
  const ContactContextValue = useMemo(
    () => ({
      contacts: contacts,
    }),
    [contacts, data],
  );
  const ContactContextValueOffset = useMemo(
    () => ({
      offset,
    }),
    [offset],
  );
  const ContactContextValueInputSearch = useMemo(
    () => ({
      inputSearch,
    }),
    [inputSearch],
  );
  const ContactContextValueApolloResponse = useMemo(
    () => ({
      loading,
      error,
    }),
    [loading, error],
  );
  return (
    <ContactContext.Provider
      value={{
        ...ContactContextValuePostFavorite,
        ...ContactContextValueFunction,
        ...ContactContextValue,
        ...ContactContextValueOffset,
        ...ContactContextValueInputSearch,
        ...ContactContextValueApolloResponse,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default memo(ContactContextProvider);
