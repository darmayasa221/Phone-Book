import React, { memo, useMemo } from "react";
import { getLocalStorage } from "../../utils/localStorage";
import { LOCAL_STORAGE_ITEM } from "../../enum/localstorageItems";
import { TContacts } from "../../types/components/Contact";
import Items from "../../components/Contact/Items";
import styled from "@emotion/styled";
const Body = styled.div({
  transition: "0.3s",
  position: "relative",
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  rowGap: "0.2rem",
  height: "90vh",
});

const ContactsFavorite = () => {
  const dataMemo = useMemo(() => {
    const contactsFavorite = getLocalStorage(
      LOCAL_STORAGE_ITEM.CONTACT_FAVORITE,
    );
    if (contactsFavorite === null) {
      return [];
    }
    return contactsFavorite;
  }, []);
  return (
    <Body>
      <Items data={dataMemo as TContacts} />
    </Body>
  );
};

export default memo(ContactsFavorite);
