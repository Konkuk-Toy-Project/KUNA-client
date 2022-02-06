import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentAnswerItemState,
  getAllAnswerState,
  showAnswerPopUpState,
} from "../../../../store/owner/answer";
import CloseButton from "../../../common/CloseButton/CloseButton";

const AnswerPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 20vw;
  width: 60vw;
  height: 60vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnswerPopUp = () => {
  const setShowAnswerPopUp = useSetRecoilState(showAnswerPopUpState);
  const currentAnswerItem = useRecoilValue(currentAnswerItemState);
  const [answer, setAnswer] = useState("");
  const [getAllAnswer, setGetAllAnswer] = useRecoilState(getAllAnswerState);

  const onChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const onClickSubmit = () => {
    const otherAnswers = getAllAnswer.filter(
      (answer) => answer.title !== currentAnswerItem.title
    );
    const currentItem = {
      title: currentAnswerItem.title,
      question: currentAnswerItem.question,
      answer,
    };
    setGetAllAnswer([currentItem, ...otherAnswers]);
    alert("답변이 등록되었습니다.");
    setShowAnswerPopUp(false);
  };

  return (
    <AnswerPopUpWrapper>
      <CloseButton onClick={setShowAnswerPopUp} />
      <h1>상품명 : {currentAnswerItem.title}</h1>
      <h1>질문 : {currentAnswerItem.question}</h1>
      <input type="text" onChange={onChangeAnswer} />
      <button onClick={onClickSubmit}>답변 등록하기</button>
    </AnswerPopUpWrapper>
  );
};

export default AnswerPopUp;
