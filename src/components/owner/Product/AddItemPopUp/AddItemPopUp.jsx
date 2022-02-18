import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY, userTokenState } from "../../../../store/common/user";
import { showAddPopUpState } from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";
import ProductButton from "../../../common/ProductButton/ProductButton";

const AddItemPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const setShowAddPopUp = useSetRecoilState(showAddPopUpState);
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(4);
  const [mainImg, setMainImg] = useState([]);
  const [detailImg, setDetailImg] = useState([]);
  const [thumbnailImg, setThumbnailImg] = useState([]);
  const userToken = useRecoilValue(userTokenState);
  const navigate = useNavigate();

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
  };

  const onChangeImage = (handleChange) => (event) => {
    const images = event.target.files;
    handleChange(images);
  };

  const getItem = () => {
    const formData = new FormData();
    formData.append("name", title);
    formData.append("price", price);
    formData.append("sale", discount);
    formData.append("categoryId", category);
    for (const image of mainImg) {
      formData.append("itemImages", image);
    }
    for (const image of detailImg) {
      formData.append("detailImages", image);
    }
    formData.append("thumbnail", thumbnailImg[0]);
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
      .post("http://localhost:8080/item", data, config)
      .then((response) => response.data);
  }

  const onClickSubmit = async () => {
    if (window.confirm("해당 상품을 등록하시겠습니까?")) {
      const data = getItem();
      await addNewItem(data);
      alert("상품이 추가되었습니다. 홈페이지로 이동합니다.");
      setShowAddPopUp(false);
      navigate("/");
    }
  };

  return (
    <AddItemPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowAddPopUp} />
      <Title>상품 등록</Title>
      <InputWrapper>
        <InputTitle>상품명</InputTitle>
        <InputText
          type="text"
          placeholder="상품명을 입력하세요"
          onChange={onChange(setTitle)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>가격</InputTitle>
        <InputText
          type="text"
          placeholder="가격을 입력하세요"
          onChange={onChange(setPrice)}
        />
        원
      </InputWrapper>
      <InputWrapper>
        <InputTitle>할인율</InputTitle>
        <InputText
          type="text"
          placeholder="할인율을 입력하세요"
          onChange={onChange(setDiscount)}
        />
        %
      </InputWrapper>
      <InputWrapper>
        <InputTitle>카테고리</InputTitle>
        <select name="category" onChange={onChange(setCategory)}>
          <option value="4">상의</option>
          <option value="5">하의</option>
          <option value="6">신발</option>
        </select>
      </InputWrapper>
      <InputImageWrapper>
        <InputTitle>상품 메인 이미지</InputTitle>
        <InputImage type="file" multiple onChange={onChangeImage(setMainImg)} />
      </InputImageWrapper>
      <InputImageWrapper>
        <InputTitle>상품 세부 이미지</InputTitle>
        <InputImage
          type="file"
          multiple
          onChange={onChangeImage(setDetailImg)}
        />
      </InputImageWrapper>
      <InputImageWrapper>
        <InputTitle>상품 썸네일 이미지</InputTitle>
        <InputImage type="file" onChange={onChangeImage(setThumbnailImg)} />
      </InputImageWrapper>
      <ProductButton onClick={onClickSubmit}>상품 추가하기</ProductButton>
    </AddItemPopUpWrapper>
  );
};

const AddItemPopUpWrapper = styled.div`
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

const Title = styled.p`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 1.5em;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: center;
  width: 24em;
`;

const InputTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  width: 8em;
  text-align: end;
  margin-right: 1em;
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid black;
  align-self: flex-start;
  width: 10em;
  &:focus {
    outline: none;
  }
`;

const InputImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5em;
`;

const InputImage = styled.input`
  font-size: 14px;
  font-weight: 500;
  margin: 0.5em 0;
  margin-left: 11em;
`;

export default AddItemPopUp;
