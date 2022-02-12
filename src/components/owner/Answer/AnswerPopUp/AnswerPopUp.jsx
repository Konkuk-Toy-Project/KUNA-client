import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentAnswerItemState,
  showAnswerPopUpState,
} from "../../../../store/owner/answer";
import CloseButton from "../../../common/CloseButton/CloseButton";

const AnswerPopUp = () => {
  const setShowAnswerPopUp = useSetRecoilState(showAnswerPopUpState);
  const currentAnswerItem = useRecoilValue(currentAnswerItemState);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const onChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const onClickSubmit = async () => {
    await addAnswer();
    alert("답변이 등록되었습니다.");
    setShowAnswerPopUp(false);
    navigate("/");
  };

  console.log(answer);

  function addAnswer() {
    axios
      .post(`http://localhost:8080/admin/qna/${currentAnswerItem.qnaId}`, {
        answer,
      })
      .then((response) => response.data);
  }

  return (
    <AnswerPopUpWrapper>
      <CloseButton onClick={setShowAnswerPopUp} />
      <h1>상품명 : {currentAnswerItem.itemName}</h1>
      <h1>제목 : {currentAnswerItem.title}</h1>
      <h1>질문 : {currentAnswerItem.question}</h1>
      <input type="text" onChange={onChangeAnswer} />
      <button onClick={onClickSubmit}>답변 등록하기</button>
    </AnswerPopUpWrapper>
  );
};

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

export default AnswerPopUp;
