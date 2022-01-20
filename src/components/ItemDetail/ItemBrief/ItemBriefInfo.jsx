import React from "react";
import { useRecoilValue } from "recoil";
import { itemDetailState } from "../itemData/itemData";
import ItemHeader from "./ItemHeader";
import LikeBtn from "./LikeBtn";

const ItemBriefInfo = () => {
  const item = useRecoilValue(itemDetailState);
  return (
    <div>
      <ItemHeader
        name={item.name}
        price={item.price}
        discount={item.discount}
      />
      <LikeBtn num={item.like} />
    </div>
  );
};

export default ItemBriefInfo;
