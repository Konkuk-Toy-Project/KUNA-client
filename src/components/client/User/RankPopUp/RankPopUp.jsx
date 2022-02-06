import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showRankState } from "../../../../store/client/user";
import { currentY } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const RankPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const setShowRank = useSetRecoilState(showRankState);

  return (
    <RankPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowRank} />
      <h1>등급 목록</h1>
      <h1>Gold : 누적 결제 금액 500,000원</h1>
      <h1>Silver : 누적 결제 금액 300,000원</h1>
      <h1>Bronze : 누적 결제 금액 200,000원</h1>
    </RankPopUpWrapper>
  );
};

const RankPopUpWrapper = styled.div`
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

export default RankPopUp;
