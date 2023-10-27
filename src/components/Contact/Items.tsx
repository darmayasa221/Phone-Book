import React, { FC, memo } from "react";
import Item from "./Item";
import { IItems } from "../../types/components/Items";

const Items: FC<IItems> = ({
  data,
  postContactFavorite,
  deleteContact,
  onSelectContactToUpdate,
}) => {
  if (data?.length > 0)
    return data?.map((item) => {
      return (
        <Item
          onSelectContactToUpdate={onSelectContactToUpdate}
          deleteContact={deleteContact}
          postContactFavorite={postContactFavorite}
          key={item.id}
          item={item}
        />
      );
    });
  return <h2>data not found</h2>;
};

export default memo(Items);
