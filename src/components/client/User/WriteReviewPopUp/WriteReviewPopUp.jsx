import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentReviewItemState,
  showWriteReviewState,
} from "../../../../store/client/user";
import { currentY } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const WriteReviewPopUp = () => {
  const setShowWriteReview = useSetRecoilState(showWriteReviewState);
  const currentReviewItem = useRecoilValue(currentReviewItemState);
  const scrollY = useRecoilValue(currentY);

  const onClickSubmit = () => {
    if (window.confirm("해당 후기를 추가하시겠습니까?")) {
      alert("리뷰가 작성되었습니다.");
      setShowWriteReview(false);
    }
  };

  return (
    <WriteReviewPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowWriteReview} />
      <Title>상품명 : {currentReviewItem.title}</Title>
      <ReviewInput type="text" />
      <h1>별점</h1>
      <input type="number" />
      <h1>리뷰용 사진</h1>
      <input type="file" />
      <button onClick={onClickSubmit}>작성하기</button>
    </WriteReviewPopUpWrapper>
  );
};

const WriteReviewPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 20vw;
  width: 60vw;
  height: 50vh;
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

export default WriteReviewPopUp;
