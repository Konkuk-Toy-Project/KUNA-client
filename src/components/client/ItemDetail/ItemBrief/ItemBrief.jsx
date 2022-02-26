import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import ImgSlide from "../../../common/ImgSlide/ImgSlide";
import Option from "./BriefInfoComp/Option";
import BriefHeader from "./BriefInfoComp/BriefHeader";
import axios from "axios";
import AskGoToBasketPopup from "./AskGoToBasketPopup";
import { useRecoilState, useRecoilValue } from "recoil";
import { buyingState } from "../../../../store/client/buying";
import { userTokenState } from "../../../../store/common/user";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { basketPopupState } from "../../../../store/client/popup";

const ItemBrief = ({ itemObj }) => {
  const [item, setItem] = useState(itemObj);
  const [chosenOpts, setChosenOpts] = useState([]);
  const [chosenOptsSubInfo, setChosenOptsSubInfo] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const userToken = useRecoilValue(userTokenState);
  const [buying, setBuying] = useRecoilState(buyingState);
  const [openBasketPopup, setOpenBasketPopup] =
    useRecoilState(basketPopupState);
  const navigate = useNavigate();
  const [isSoldout, setIsSoldout] = useState(false);

  const onBuyClick = () => {
    if (!canDoBtnClickEvent()) return;

    setBuying(
      chosenOpts.map((chosen, idx) => {
        return {
          thumbnailImg: item.thumbnailUrl,
          name: item.name,
          price: item.price,
          sale: item.sale,
          ...chosen,
          ...chosenOptsSubInfo[idx], // option names, stock
        };
      })
    );
  };
  useEffect(() => {
    if (buying.length === 0) return;
    navigate("/order");
  }, [buying]);

  useEffect(async () => {
    checkIsSoldout();
    try {
      const response = await axios.get(`http://localhost:8080/member/isLogin`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setIsLogin(response.data.isLogin);
      return;
    } catch (error) {
      if (error.response) {
        const message = error.response.message;
        if (message !== undefined) {
          alert(error.response.message);
          return;
        }
      }
      alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
    }
  }, []);

  const onBasketClick = () => {
    if (!canDoBtnClickEvent()) return;
    postChosenOpt();
  };

  const canDoBtnClickEvent = useCallback(() => {
    if (chosenOpts.length === 0) {
      alert("상품을 선택해 주세요.");
      return false;
    } else if (!isLogin) {
      if (window.confirm("로그인이 필요합니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
      return false;
    }
    return true;
  }, [chosenOpts, isLogin]);

  const checkIsSoldout = useCallback(() => {
    item.option1.map((o1) => o1.stock).reduce((p, f) => p + f) === 0
      ? setIsSoldout(true)
      : setIsSoldout(false);
  }, [item]);

  const postChosenOpt = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/cart",
        chosenOpts,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data !== undefined) setOpenBasketPopup(true);
    } catch (error) {
      if (error.response) {
        alert("오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  return (
    <ItemBriefWrapper>
      <div>
        <ImgSlide
          imgsrcs={item.itemImageUrl.map(
            (url) => `http://localhost:8080/image/item/${url}`
          )}
          defaultIdx={0}
        />
      </div>

      <BriefInfoWrapper>
        <BriefHeader
          state={isSoldout ? "sold_out" : "NORMALITY"}
          name={item.name}
          price={item.price}
          sale={item.sale}
          id={item.itemId}
          like={item.preference}
        />

        <Option
          item={item}
          chosen={chosenOpts}
          price={(item.price * (100 - item.sale)) / 100}
          setChosen={setChosenOpts}
          setChosenSubInfo={setChosenOptsSubInfo}
        />
        <ButtonWrapper name="submit-btns">
          <Button onClick={onBasketClick}>장바구니</Button>
          <Button onClick={onBuyClick} color="plum">
            바로결제
          </Button>
        </ButtonWrapper>
      </BriefInfoWrapper>
    </ItemBriefWrapper>
  );
};

ItemBrief.propTypes = { itemObj: PropTypes.object.isRequired };

const ItemBriefWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 50px auto;
`;

const BriefInfoWrapper = styled.div`
  margin: 40px 20px 20px 30px;
  flex-grow: 1;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.div`
  display: inline-block;
  width: 49.5%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #f5f5f5;
  background-color: ${({ color }) =>
    color === "plum" ? "#ab47bc" : "#212121  "};
`;

export default ItemBrief;
