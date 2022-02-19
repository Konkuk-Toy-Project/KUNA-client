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
      <Title>등급 목록</Title>
      <RankWrapper>
        <Rank color="gold">Gold</Rank>
        <Requirement>누적 결제 금액 500,000원</Requirement>
      </RankWrapper>
      <RankWrapper>
        <Rank color="silver">Silver</Rank>
        <Requirement>누적 결제 금액 300,000원</Requirement>
      </RankWrapper>
      <RankWrapper>
        <Rank color="brown">Bronze</Rank>
        <Requirement>누적 결제 금액 200,000원</Requirement>
      </RankWrapper>
    </RankPopUpWrapper>
  );
};

const RankPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  width: 30em;
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

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0.5em;
`;

const RankWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5em;
`;

const Rank = styled.p`
  width: 4em;
  text-align: end;
  margin-right: 1em;
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => props.color};
`;

const Requirement = styled.p`
  font-size: 20px;
`;

export default RankPopUp;
