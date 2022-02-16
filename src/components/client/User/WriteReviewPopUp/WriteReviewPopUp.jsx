import axios from "axios";
import React, { useState } from "react";
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
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [reviewImage, setReviewImage] = useState([]);

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
  };

  const onChangeImage = (handleChange) => (event) => {
    const images = event.target.files;
    handleChange(images);
  };

  const getItem = () => {
    const formData = new FormData();
    formData.append("option", currentReviewItem.option);
    formData.append("itemId", currentReviewItem.itemId);
    formData.append("description", description);
    formData.append("rate", Number(rate));
    formData.append("reviewImage", reviewImage[0]);
    formData.append("orderItemId", currentReviewItem.orderItemId);
    return formData;
  };

  function addNewItem(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8080/review", data, config)
      .then((response) => response.data);
  }

  const onClickSubmit = async () => {
    if (window.confirm("리뷰를 작성하시겠습니까?")) {
      const data = getItem();
      await addNewItem(data);
      alert("리뷰가 작성되었습니다.");
      setShowWriteReview(false);
    }
  };

  return (
    <WriteReviewPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowWriteReview} />
      <Title>상품명 : {currentReviewItem.itemName}</Title>
      <ReviewInput type="text" onChange={onChange(setDescription)} />
      <h1>별점</h1>
      <input type="number" onChange={onChange(setRate)} />
      <h1>리뷰용 사진</h1>
      <input type="file" name="" onChange={onChangeImage(setReviewImage)} />
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
