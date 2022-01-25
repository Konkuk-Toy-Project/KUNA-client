import React from "react";
import ImgSection from "../components/ItemDetail/ItemBrief/ImgSection";
import ItemBriefInfo from "../components/ItemDetail/ItemBrief/ItemBriefInfo";

import { useRecoilValue } from "recoil";
import { ItemBriefImgsState } from "../components/ItemDetail/itemData/itemData";

const ItemDetailPage = () => {
  const itemImgSrcs = useRecoilValue(ItemBriefImgsState);
  return (
    <div id="itemBriefSection">
      <ImgSection imgsrcs={itemImgSrcs} defaultIdx={0} />
      <ItemBriefInfo />
    </div>
  );
};

export default ItemDetailPage;
