import React from "react";
import { useRecoilValue } from "recoil";
import { ItemInfoImgState } from "./itemData/itemData";

const ItemInfo = () => {
  const imgSrc = useRecoilValue(ItemInfoImgState);
  return (
    <div>
      <img src={imgSrc} alt="상품 상세 정보" />
    </div>
  );
};

export default ItemInfo;
