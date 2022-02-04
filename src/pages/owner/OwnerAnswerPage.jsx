import React from "react";
import styled from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentAnswerItemState,
  getAllAnswerState,
  showAnswerPopUpState,
} from "../../store/owner/answer";
import AnswerPopUp from "../../components/owner/Answer/AnswerPopUp/AnswerPopUp";

const OwnerAnswerPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
`;

const Title = styled.p`
  margin: 1em 0;
  font-size: 24px;
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Description = styled.p`
  font-size: 14px;
  height: 20px;
  padding: 1em;
  text-align: center;
  line-height: 20px;
  width: 20%;
`;

const AnswerButton = styled.p`
  font-size: 14px;
  height: 20px;
  padding: 1em;
  text-align: center;
  line-height: 20px;
  width: 20%;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
`;

const OwnerAnswerPage = () => {
  const getAnswers = useRecoilValue(getAllAnswerState);
  const [showAnswerPopUp, setShowAnswerPopUp] =
    useRecoilState(showAnswerPopUpState);
  const setCurrentAnswerItem = useSetRecoilState(currentAnswerItemState);

  const onClickAnswer = (answer) => {
    setShowAnswerPopUp(true);
    setCurrentAnswerItem(answer);
  };

  return (
    <OwnerAnswerPageWrapper>
      <Title>질문 내역</Title>
      <CouponWrapper>
        <Description>상품명</Description>
        <Description>질문</Description>
        <Description>답변 내용</Description>
      </CouponWrapper>
      {getAnswers.map((answer, index) => (
        <CouponWrapper key={index}>
          <Description>{answer.title}</Description>
          <Description>{answer.question}</Description>
          {answer.answer ? (
            <Description>{answer.answer}</Description>
          ) : (
            <AnswerButton onClick={() => onClickAnswer(answer)}>
              답변하기
            </AnswerButton>
          )}
        </CouponWrapper>
      ))}
      {showAnswerPopUp && <AnswerPopUp />}
    </OwnerAnswerPageWrapper>
  );
};

export default OwnerAnswerPage;
