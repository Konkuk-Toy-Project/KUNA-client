import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AskGoToBasketPopup = ({ setOpenPopUp }) => {
  const navigate = useNavigate();
  const onCloseClick = () => {
    setOpenPopUp(false);
  };
  const onGoToBasketClick = () => {
    navigate("/basket");
  };
  return (
    <div>
      <div>선택하신 상품이 장바구니에 담겼습니다</div>
      <ul>
        <li>
          <button onClick={onGoToBasketClick}>장바구니 확인하기</button>
        </li>
        <li>
          <button onClick={onCloseClick}>쇼핑 계속하기</button>
        </li>
      </ul>
    </div>
  );
};

AskGoToBasketPopup.propTypes = { setOpenPopUp: PropTypes.func.isRequired };

export default AskGoToBasketPopup;
