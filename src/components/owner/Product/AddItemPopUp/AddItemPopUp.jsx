import axios from "axios";
import React from "react";
import { useState } from "react/cjs/react.development";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import {
  productState,
  showAddPopUpState,
} from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";

const AddItemPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const setShowAddPopUp = useSetRecoilState(showAddPopUpState);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [mainImg, setMainImg] = useState([]);
  const [detailImg, setDetailImg] = useState([]);
  const [thumbnailImg, setThumbnailImg] = useState([]);
  const [category, setCategory] = useRecoilState(productState);

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
  };

  const onChangeImage = (handleChange) => (event) => {
    const images = event.target.files;
    handleChange(images);
    console.log(images);
    const formData = new FormData();
    for (const image of images) {
      formData.append("img", image);
    }
    for (const keyValue of formData) {
      console.log(keyValue);
    }
  };

  const addItem = () => {
    const currentItem = {
      id: new Date(),
      title,
      image,
      discount,
      price,
    };
    setCategory([currentItem, ...category]);
  };

  const getItem = () => {
    const formData = new FormData();
    formData.append("name", title);
    formData.append("price", price);
    formData.append("sale", discount);
    formData.append("categoryId", 4);
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
      },
    };
    axios
      .post("http://localhost:8080/item", data, config)
      .then((response) => response.data);
  }

  const onClickSubmit = async () => {
    if (window.confirm("해당 상품을 등록하시겠습니까?")) {
      addItem();
      const data = getItem();
      await addNewItem(data);
      alert("상품이 추가되었습니다.");
      setShowAddPopUp(false);
    }
  };

  return (
    <AddItemPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowAddPopUp} />
      <div>
        <h1>상품명 </h1>
        <input type="text" onChange={onChange(setTitle)} />
      </div>
      <div>
        <h1>가격 </h1>
        <input type="text" onChange={onChange(setPrice)} />
      </div>
      <div>
        <h1>할인율 </h1>
        <input type="text" onChange={onChange(setDiscount)} />
      </div>
      <div>
        <h1>카테고리</h1>
        <input type="text" />
      </div>
      <div>
        <h1>상품 메인 이미지</h1>
        <input type="file" multiple onChange={onChangeImage(setMainImg)} />
      </div>
      <div>
        <h1>상품 세부 이미지</h1>
        <input type="file" multiple onChange={onChangeImage(setDetailImg)} />
      </div>
      <div>
        <h1>썸네일 이미지</h1>
        <input type="file" name="" onChange={onChangeImage(setThumbnailImg)} />
      </div>
      <button onClick={onClickSubmit}>상품 추가하기</button>
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

export default AddItemPopUp;
