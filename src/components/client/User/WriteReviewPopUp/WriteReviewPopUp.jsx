import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentReviewItemState,
  showWriteReviewState,
} from "../../../../store/client/user";
import { currentY, userTokenState } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const WriteReviewPopUp = () => {
  const setShowWriteReview = useSetRecoilState(showWriteReviewState);
  const currentReviewItem = useRecoilValue(currentReviewItemState);
  const scrollY = useRecoilValue(currentY);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [reviewImage, setReviewImage] = useState([]);
  const userToken = useRecoilValue(userTokenState);

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

    for (const image of reviewImage) {
      formData.append("reviewImage", image);
    }

    formData.append("orderItemId", currentReviewItem.orderItemId);
    return formData;
  };

  function addNewItem(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .post("http://localhost:8080/review", data, config)
      .then((response) => response.data);
  }

  const onClickSubmit = async () => {
    if (description === "") {
      return alert("리뷰 내용을 입력해주세요.");
    }
    if (rate === "") {
      return alert("별점을 입력해주세요");
    }
    if (0 > Number(rate) || Number(rate) > 5) {
      return alert("별점은 0~5사이만 가능합니다.");
    }
    if (!reviewImage.length) {
      return alert("리뷰용 사진을 추가하셔야 리뷰작성이 가능합니다.");
    }
    if (reviewImage.length > 5) {
      return alert(
        "리뷰용 사진은 최대 5장만 가능합니다. 사진을 다시 선택해주세요"
      );
    }
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
      <ContentWrapper>
        <Description>별점</Description>
        <RateInput type="number" onChange={onChange(setRate)} />
      </ContentWrapper>
      <ContentWrapper>
        <Description>리뷰용 사진</Description>
        <FileInput
          type="file"
          name=""
          onChange={onChangeImage(setReviewImage)}
          multiple
        />
      </ContentWrapper>
      <SubmitButton onClick={onClickSubmit}>작성하기</SubmitButton>
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
  margin-bottom: 1em;
`;

const ReviewInput = styled.input`
  width: 40em;
  height: 10em;
  margin: 1em 0;
  border-radius: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  width: 5em;
`;

const RateInput = styled.input`
  width: 3.5em;
`;

const FileInput = styled.input`
  width: 11em;
`;

const SubmitButton = styled.button`
  margin-top: 2em;
  border: none;
  background-color: black;
  padding: 1em;
  color: white;
  border-radius: 10px;
`;

export default WriteReviewPopUp;
