import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userTokenState } from "../../../../store/common/user";
import {
  currentAnswerItemState,
  showAnswerPopUpState,
} from "../../../../store/owner/answer";
import CloseButton from "../../../common/CloseButton/CloseButton";
import ProductButton from "../../../common/ProductButton/ProductButton";

const AnswerPopUp = () => {
  const setShowAnswerPopUp = useSetRecoilState(showAnswerPopUpState);
  const currentAnswerItem = useRecoilValue(currentAnswerItemState);
  const [answer, setAnswer] = useState("");
  const userToken = useRecoilValue(userTokenState);
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

  const addAnswer = () => {
    axios
      .post(
        `http://localhost:8080/admin/qna/${currentAnswerItem.qnaId}`,
        {
          answer,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => response.data);
  };

  return (
    <AnswerPopUpWrapper>
      <CloseButton onClick={setShowAnswerPopUp} />
      <Title>답변하기</Title>
      <ContentWrapper>
        <ContentTitle>상품명 :</ContentTitle>
        <ContentDescription>{currentAnswerItem.itemName}</ContentDescription>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>제목 :</ContentTitle>
        <ContentDescription>{currentAnswerItem.title}</ContentDescription>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>질문 :</ContentTitle>
        <ContentDescription>{currentAnswerItem.question}</ContentDescription>
      </ContentWrapper>
      <InputText cols="50" rows="10" onChange={onChangeAnswer} />
      <ProductButton onClick={onClickSubmit}>답변 등록하기</ProductButton>
    </AnswerPopUpWrapper>
  );
};

const AnswerPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  width: 40em;
  height: 40em;
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
  font-weight: 800;
  margin-bottom: 1.5em;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
`;

const ContentTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-align: end;
  width: 4em;
  margin: 0.2em;
`;

const ContentDescription = styled.p`
  font-size: 18px;
  width: 20em;
  margin: 0.2em;
`;

const InputText = styled.textarea`
  border: 1px solid black;
  resize: none;
  border-radius: 20px;
  text-align: center;
  padding: 1em;
  margin: 1em 0;
  &:focus {
    outline: none;
  }
`;

export default AnswerPopUp;
