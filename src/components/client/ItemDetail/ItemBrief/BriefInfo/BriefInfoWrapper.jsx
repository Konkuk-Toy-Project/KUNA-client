import React from "react";
import { useRecoilValue } from "recoil";
import { itemDetailState } from "../../itemData/itemData";
import ItemHeader from "./BriefHeader";
import LikeBtn from "./LikeBtn";
import Option from "./Options/Option";

const Info = () => {
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
      <Option />
      <div name="submit-btns">
        <button>장바구니</button>
        <button>바로결제</button>
      </div>
      <img src={item.infoImg}></img>
    </div>
  );
};

export default Info;
