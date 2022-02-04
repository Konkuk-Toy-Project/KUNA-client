import React, { useState } from "react";
import PropTypes from "prop-types";
import ImgSlide from "./ImgSlide";
import LikeBtn from "./BriefInfoComp/LikeBtn";
import Option from "./BriefInfoComp/Option";
import BriefHeader from "./BriefInfoComp/BriefHeader";

const ItemBrief = ({ itemObj }) => {
  const [item, setItem] = useState(itemObj);
  const [chosenOpts, setChosenOpts] = useState([]);
  const onBasketClick = () => {
    console.log("서버로 chosenOpts 보내기");
  };
  const onBuyClick = () => {
    console.log("Path로? 선택내용 보내기");
  };
  console.log(chosenOpts);

  return (
    <div>
      <ImgSlide imgsrcs={item.itemImageUrl} defaultIdx={0} />

      <div>
        <BriefHeader
          state={item.itemState}
          name={item.name}
          price={item.price}
          sale={item.sale}
        />
        {/* 찜개수+사용자의 찜 내역에 포함 해야함--------------------------------- */}
        <LikeBtn num={item.preference} />
        {/* 옵션 컴포넌트*/}
        <Option item={item} chosen={chosenOpts} setChosen={setChosenOpts} />
        <div name="submit-btns">
          <button onClick={onBasketClick}>장바구니</button>
          <button onClick={onBuyClick}>바로결제</button>
        </div>
        <img src={item.infoImg}></img>
      </div>
    </div>
  );
};

ItemBrief.propTypes = { itemObj: PropTypes.object.isRequired };

export default ItemBrief;
