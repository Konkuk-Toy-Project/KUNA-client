import React from "react";
import styled from "styled-components";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentAnswerItemState,
  showAnswerPopUpState,
} from "../../store/owner/answer";
import AnswerPopUp from "../../components/owner/Answer/AnswerPopUp/AnswerPopUp";
import { useState, useEffect } from "react";
import axios from "axios";
import { currentY, userTokenState } from "../../store/common/user";

const OwnerAnswerPage = () => {
  const [items, setItems] = useState([]);
  const [showAnswerPopUp, setShowAnswerPopUp] =
    useRecoilState(showAnswerPopUpState);
  const setCurrentAnswerItem = useSetRecoilState(currentAnswerItemState);
  const userToken = useRecoilValue(userTokenState);
  const setCurrentY = useSetRecoilState(currentY);

  const calculatePopUpHeight = () => {
    setCurrentY(window.scrollY + window.innerHeight * 0.15);
  };

  const onClickAnswer = (answer) => {
    calculatePopUpHeight();
    setShowAnswerPopUp(true);
    setCurrentAnswerItem(answer);
  };

  const convertDate = (date) => {
    return `${date.substring(0, 4)}년 ${date.substring(
      5,
      7
    )}월 ${date.substring(8, 10)}일`;
  };

  useEffect(() => {
    async function getData() {
      const data = await axios
        .get("http://localhost:8080/admin/qna/false", {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => response.data);
      setItems(data);
    }
    getData();
  }, [userToken]);

  return (
    <OwnerAnswerPageWrapper>
      <Title>질문 내역</Title>
      <CouponWrapper>
        <Description>상품명</Description>
        <Description>질문명</Description>
        <Description>질문 내용</Description>
        <Description>질문 등록 날짜</Description>
        <Description>답변 유무</Description>
      </CouponWrapper>
      {items.map((item) => (
        <CouponWrapper key={item.qnaId}>
          <Description>{item.itemName}</Description>
          <Description>{item.title}</Description>
          <Description>{item.question}</Description>
          <Description>{convertDate(item.registryDate)}</Description>
          {item.answered ? (
            <Description>답변 완료</Description>
          ) : (
            <AnswerButton onClick={() => onClickAnswer(item)}>
              답변하기
            </AnswerButton>
          )}
        </CouponWrapper>
      ))}
      {showAnswerPopUp && <AnswerPopUp />}
    </OwnerAnswerPageWrapper>
  );
};

const OwnerAnswerPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  width: 80vw;
  margin: auto;
`;

const Title = styled.p`
  margin: 1em 0;
  font-size: 24px;
  font-weight: 600;
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2em;
  border-bottom: 1px solid black;
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
  outline: none;
  color: black;
  background-color: transparent;
  border: 1px solid black;
  font-size: 14px;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  width: 20%;
  text-align: center;
  &:hover {
    color: white;
    background-color: black;
    border: 1px solid black;
    transition: all 0.3s ease-in;
  }
`;

export default OwnerAnswerPage;
