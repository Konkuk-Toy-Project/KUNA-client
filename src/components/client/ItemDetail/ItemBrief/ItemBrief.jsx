import React, { useState } from "react";
import PropTypes from "prop-types";
import ImgSlide from "../../../common/ImgSlide/ImgSlide";
import LikeBtn from "./BriefInfoComp/LikeBtn";
import Option from "./BriefInfoComp/Option";
import BriefHeader from "./BriefInfoComp/BriefHeader";
import axios from "axios";
import AskGoToBasketPopup from "./AskGoToBasketPopup";

const ItemBrief = ({ itemObj }) => {
  const [item, setItem] = useState(itemObj);
  const [chosenOpts, setChosenOpts] = useState([]);
  const [openBasketPopup, setOpenBasketPopup] = useState(false);

  const onBuyClick = () => {
    if (chosenOpts.length === 0) {
      alert("상품을 선택해 주세요.");
      return;
    }

    console.log("atom에 설정");
  };

  const onBasketClick = () => {
    if (chosenOpts.length === 0) {
      alert("상품을 선택해 주세요.");
      return;
    }
    postChosenOpt();
  };

  const postChosenOpt = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/cart",
        chosenOpts
      );
      if (response.data !== undefined) setOpenBasketPopup(true);
    } catch (error) {
      if (error.response) {
        alert("오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

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
        <Option item={item} chosen={chosenOpts} setChosen={setChosenOpts} />
        <div name="submit-btns">
          <button onClick={onBasketClick}>장바구니</button>
          <button onClick={onBuyClick}>바로결제</button>
        </div>
        <img src={item.infoImg}></img>
      </div>
      {openBasketPopup ? (
        <AskGoToBasketPopup setOpenPopUp={setOpenBasketPopup} />
      ) : null}
    </div>
  );
};

ItemBrief.propTypes = { itemObj: PropTypes.object.isRequired };

export default ItemBrief;
