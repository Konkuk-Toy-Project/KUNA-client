import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentReviewItemState,
  showWriteReviewState,
} from "../../../store/atoms";
import CloseButton from "../CloseButton/CloseButton";

const WriteReviewPopUpWrapper = styled.div`
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

const WriteReviewPopUp = () => {
  const setShowWriteReview = useSetRecoilState(showWriteReviewState);
  const currentReviewItem = useRecoilValue(currentReviewItemState);

  const onClickClose = () => {
    setShowWriteReview(false);
  };

  const onClickSubmit = () => {
    alert("리뷰가 작성되었습니다. 가격의 1% 금액이 포인트로 충전됩니다.");
    setShowWriteReview(false);
  };

  return (
    <WriteReviewPopUpWrapper>
      <CloseButton onClick={onClickClose} />
      <h1>상품 : {currentReviewItem.title}</h1>
      <input type="text" />
      <button onClick={onClickSubmit}>작성하기</button>
    </WriteReviewPopUpWrapper>
  );
};

export default WriteReviewPopUp;
