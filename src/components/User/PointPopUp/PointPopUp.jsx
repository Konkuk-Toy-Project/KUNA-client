import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentX,
  currentY,
  showPointState,
  userPointState,
} from "../../../store/atoms";
import CloseButton from "../CloseButton/CloseButton";

const PointPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
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

  const scrollX = useRecoilValue(currentX);
  const scrollY = useRecoilValue(currentY);

  const onClickClose = () => {
    setShowPoint(false);
  };

  return (
    <PointPopUpWrapper top={scrollY} left={scrollX}>
      <CloseButton onClick={onClickClose} />
      <h1>보유 포인트 : {points}</h1>
      <h3>구매 금액의 1%가 포인트로 적립됩니다.</h3>
    </PointPopUpWrapper>
  );
};

export default PointPopUp;
