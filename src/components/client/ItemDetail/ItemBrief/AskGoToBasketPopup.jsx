import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { basketPopupState } from "../../../../store/client/popup";
import IconX from "../../Icon/IconX";

const AskGoToBasketPopup = () => {
  const setBasketPopup = useSetRecoilState(basketPopupState);
  const navigate = useNavigate();
  const onCloseClick = () => {
    setBasketPopup(false);
  };
  const onGoToBasketClick = () => {
    setBasketPopup(false);
    navigate("/basket");
  };
  return (
    <PopupBackGround>
      <PopupWrapper>
        <IconXWrapper>
          <IconX onClick={onCloseClick} />
        </IconXWrapper>
        <ContentTextWrapper>
          <ContentTextSpan>
            선택하신 상품이 장바구니에 담겼습니다
          </ContentTextSpan>
        </ContentTextWrapper>
        <BtnWrapper>
          <BtnLi>
            <Button onClick={onGoToBasketClick}>장바구니 확인하기</Button>
          </BtnLi>
          <BtnLi>
            <Button color="plum" onClick={onCloseClick}>
              쇼핑 계속하기
            </Button>
          </BtnLi>
        </BtnWrapper>
      </PopupWrapper>
    </PopupBackGround>
  );
};

const PopupBackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const PopupWrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 400px;
  height: 280px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const IconXWrapper = styled.div`
  text-align: right;
  height: 15%;
  box-sizing: border-box;
  padding-right: 4%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ContentTextWrapper = styled.div`
  height: 60%;
  text-align: center;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentTextSpan = styled.div`
  transform: translate(0, 30%);
`;
const BtnWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 30%;
  width: 100%;
  padding: 20px 10px;
  justify-content: center;
`;
const BtnLi = styled.li`
  display: inline-block;
  width: 40%;
  margin: 0px 2px;
`;
const Button = styled.button`
  display: inline-block;
  height: 100%;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  color: #f5f5f5;
  border: none;
  cursor: pointer;
  background-color: ${({ color }) =>
    color === "plum" ? "#ab47bc" : "#212121  "};
`;
export default AskGoToBasketPopup;
