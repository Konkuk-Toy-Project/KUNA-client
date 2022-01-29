import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentReviewItemState,
  currentY,
  showWriteReviewState,
} from "../../../store/user";
import CloseButton from "../CloseButton/CloseButton";

const WriteReviewPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 20vw;
  width: 60vw;
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
`;

const ReviewInput = styled.input`
  width: 40vw;
  height: 10vh;
  margin: 1em 0;
`;

const WriteReviewPopUp = () => {
  const setShowWriteReview = useSetRecoilState(showWriteReviewState);
  const currentReviewItem = useRecoilValue(currentReviewItemState);
  const scrollY = useRecoilValue(currentY);

  const onClickClose = () => {
    setShowWriteReview(false);
  };

  const onClickSubmit = () => {
    alert("리뷰가 작성되었습니다. 가격의 1% 금액이 포인트로 충전됩니다.");
    setShowWriteReview(false);
  };

  return (
    <WriteReviewPopUpWrapper top={scrollY}>
      <CloseButton onClick={onClickClose} />
      <Title>상품명 : {currentReviewItem.title}</Title>
      <ReviewInput type="text" />
      <button onClick={onClickSubmit}>작성하기</button>
    </WriteReviewPopUpWrapper>
  );
};

export default WriteReviewPopUp;
