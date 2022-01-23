import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showPointState, userPointState } from "../../../store/atoms";

const PointPopUpWrapper = styled.form`
  width: 40vw;
  height: 30vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PointPopUp = () => {
  const points = useRecoilValue(userPointState);
  const setShowPoint = useSetRecoilState(showPointState);

  const onClickClose = (event) => {
    event.preventDefault();
    setShowPoint(false);
  };

  return (
    <PointPopUpWrapper>
      <h1>보유 포인트 : {points}</h1>
      <h3>구매 금액의 1%가 포인트로 적립됩니다.</h3>
      <button onClick={onClickClose}>닫기</button>
    </PointPopUpWrapper>
  );
};

export default PointPopUp;
