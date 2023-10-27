import styled from "@emotion/styled";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import PaginationControls from "../../components/Pagination/PaginationControls";
import InputSearch from "../../components/Input/InputSearch";
import HeaderContext from "../../store/Header/headerContext";
import { TInputSearch } from "../../types/components/InputSearch";
import { useMutation, useQuery } from "@apollo/client";
import Items from "../../components/Contact/Items";
import { TContact, TContacts } from "../../types/components/Contact";
import { Contact_Select_Column, Order_By } from "../../__generated__/graphql";
import { DELETE_CONTACT, GET_CONTACT } from "../../dataProvider/contact";
import { ILocalStorageContext } from "../../types/store/LocalStorageContext";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { LOCAL_STORAGE_ITEM } from "../../enum/localstorageItems";
import ModalContext from "../../store/Modal/ModalContext";
import Modal from "../../components/Modal/Modal";
import EditForm from "../../components/Form/EditForm";
import CreateForm from "../../components/Form/CreateForm";
const Body = styled.div<TInputSearch>(({ isSearch }) => ({
  top: !isSearch ? "-35px" : "0px",
  transition: "0.3s",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.2rem",
  "@media only screen and (max-height: 550px)": {
    overflowY: "scroll",
    height: !isSearch ? "73vh" : "68vh",
  },
}));

const Footer = styled.footer({
  "@media only screen and (max-height: 550px)": {
    position: "absolute",
    width: "100%",
    bottom: "0",
    right: "0rem",
    padding: "0.4rem 0.8rem",
  },
});

const Contacts = () => {
  const { isSearch } = useContext(HeaderContext);
  const { setModalOn, setModalOff, isModalVisible } = useContext(ModalContext);
  const [selectContactToUpdate, setSelectContactToUpdate] = useState<TContact>(
    {} as TContact,
  );
  const [inputSearch, setInputSearch] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [deleteContactById] = useMutation(DELETE_CONTACT);
  const { loading, error, data, refetch } = useQuery(GET_CONTACT, {
    variables: {
      limit: limit,
      offset: offset,
      where: {
        first_name: {
          _like: Boolean(inputSearch) ? `%${inputSearch}%` : "%%",
        },
      },
      distinct_on: [Contact_Select_Column.CreatedAt],
      order_by: [{ created_at: Order_By.Desc }],
    },
  });
  const dataMemo = useMemo(() => data, [data]);
  const postContactFavorite = useCallback(async (id: number) => {
    const favoriteContactLocalStorage: ILocalStorageContext = getLocalStorage(
      LOCAL_STORAGE_ITEM.CONTACT_FAVORITE,
    );
    const favoriteContact = dataMemo?.contact?.filter(
      (contact) => contact.id === id,
    );
    if (favoriteContactLocalStorage === null) {
      setLocalStorage(LOCAL_STORAGE_ITEM.CONTACT_FAVORITE, favoriteContact);
      await deleteContactById({ variables: { id } });
      await refetch();
      return;
    }
    setLocalStorage(LOCAL_STORAGE_ITEM.CONTACT_FAVORITE, [
      ...favoriteContactLocalStorage,
      ...(favoriteContact as TContacts),
    ]);
    await deleteContactById({ variables: { id } });
    await refetch();
  }, []);
  const deleteContact = useCallback(
    async (id: number) => {
      await deleteContactById({ variables: { id } });
      await refetch();
    },
    [dataMemo],
  );
  const onSelectContactToUpdate = useCallback((item: TContact) => {
    setSelectContactToUpdate((prev) => ({ ...prev, ...item }));
    setModalOn("update");
  }, []);
  return (
    <>
      {isModalVisible.modal ? (
        <Modal onModalOff={setModalOff}>
          {isModalVisible.action === "update" ? (
            <EditForm
              data={selectContactToUpdate}
              onCloseModal={setModalOff}
              refetch={refetch}
            />
          ) : (
            <CreateForm onCloseModal={setModalOff} refetch={refetch} />
          )}
        </Modal>
      ) : (
        <></>
      )}
      <InputSearch isSearch={isSearch} setInputSearch={setInputSearch} />
      <Body isSearch={isSearch}>
        {error ? (
          <h2>{error.message}</h2>
        ) : loading ? (
          <h2>loading...</h2>
        ) : (
          <Items
            onSelectContactToUpdate={onSelectContactToUpdate}
            deleteContact={deleteContact}
            postContactFavorite={postContactFavorite}
            data={dataMemo?.contact as TContacts}
          />
        )}
      </Body>
      <Footer>
        <PaginationControls
          limit={limit}
          offsite={offset}
          setLimit={setLimit}
          setOffsite={setOffset}
          count={data?.contact === undefined ? 0 : data?.contact?.length}
        />
      </Footer>
    </>
  );
};

export default memo(Contacts);
