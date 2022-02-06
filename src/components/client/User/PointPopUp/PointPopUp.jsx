import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showPointState, userPointState } from "../../../../store/client/user";
import { currentY } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const PointPopUp = () => {
  const points = useRecoilValue(userPointState);
  const setShowPoint = useSetRecoilState(showPointState);
  const scrollY = useRecoilValue(currentY);

  return (
    <PointPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowPoint} />
      <h1>보유 포인트 : {points}</h1>
      <h3>구매 금액의 1%가 포인트로 적립됩니다.</h3>
    </PointPopUpWrapper>
  );
};

const PointPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 30vw;
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

export default PointPopUp;
