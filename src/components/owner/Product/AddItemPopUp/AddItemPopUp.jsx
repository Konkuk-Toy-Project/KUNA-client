import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import { showAddPopUpState } from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";

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
        <select name="category" onChange={onChange(setCategory)}>
          <option value="4">상의</option>
          <option value="5">하의</option>
          <option value="6">신발</option>
        </select>
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
