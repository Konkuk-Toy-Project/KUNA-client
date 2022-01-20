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
      {/* 옵션 컴포넌트*/}
      <div name="submi-btns">
        <button>장바구니</button>
        <button>바로결제</button>
      </div>
    </div>
  );
};

export default ItemBriefInfo;
