import React, { FC, memo, useCallback } from "react";
import Card from "../Card/Card";
import { FaUserCircle } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import styled from "@emotion/styled";
import concatWhiteSpace from "../../utils/concatWhiteSpace";
import { IItem } from "../../types/components/Item";
import { useLocation } from "react-router-dom";
import { mq } from "../../globalStyles/responsive";
const WrapperItem = styled.div({
  display: "grid",
  gridTemplateColumns: "2.2fr 1.1fr ",
  alignItems: "center",
  [mq[1] as string]: {
    height: "2.5rem",
  },
});
const WrapperLeftSide = styled.div({
  display: "grid",
  gridTemplateColumns: "0.5fr 1.7fr ",
  cursor: "pointer",
  [mq[1] as string]: {
    gridTemplateColumns: "0.3fr 1.7fr ",
  },
  [mq[2] as string]: {
    gridTemplateColumns: "0.2fr 1.7fr ",
  },
});
const WrapperUser = styled.div({
  display: "flex",
  justifyContent: "center",
});
const TextName = styled.h2({
  fontSize: "15px",
  [mq[1] as string]: {
    fontSize: "18px",
  },
});
const TextNoHp = styled.p({
  fontSize: "13px",
  [mq[1] as string]: {
    fontSize: "15px",
  },
});
const LWrapperRightItem = styled.div({});
const WrapperRight = styled.div({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  columnGap: "5px",
  [mq[1] as string]: {
    justifyContent: "flex-end",
    paddingRight: "10px",
    columnGap: "1rem",
  },
});

const Item: FC<IItem> = ({
  item,
  postContactFavorite,
  deleteContact,
  onSelectContactToUpdate,
}) => {
  const { pathname } = useLocation();
  const fullName = concatWhiteSpace(item?.first_name, item?.last_name);
  const phoneNumber =
    item?.phones?.length > 0 ? item?.phones[0].number : "number is empty";
  const onPostContactFavorite = useCallback(() => {
    if (postContactFavorite) {
      postContactFavorite(item?.id);
    }
  }, [item?.id]);
  const onDeleteContact = useCallback(() => {
    if (deleteContact) {
      deleteContact(item?.id);
    }
  }, [item?.id]);
  const onUpdateContact = useCallback(() => {
    if (onSelectContactToUpdate) {
      onSelectContactToUpdate(item);
    }
  }, [item]);
  return (
    <Card>
      <WrapperItem>
        <WrapperLeftSide>
          <WrapperUser>
            <FaUserCircle size={30} />
          </WrapperUser>
          <LWrapperRightItem>
            <TextName>{fullName}</TextName>
            <TextNoHp>{phoneNumber}</TextNoHp>
          </LWrapperRightItem>
        </WrapperLeftSide>
        {pathname === "/contacts/favorite" ? (
          <></>
        ) : (
          <WrapperRight>
            <FaHeartCirclePlus onClick={onPostContactFavorite} size={30} />
            <FaEdit onClick={onUpdateContact} size={30} />
            <FaDeleteLeft onClick={onDeleteContact} size={30} />
          </WrapperRight>
        )}
      </WrapperItem>
    </Card>
  );
};

export default memo(Item);
