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
  const [category, setCategory] = useRecoilState(productState);

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
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

  const onClickSubmit = () => {
    if (window.confirm("해당 상품을 등록하시겠습니까?")) {
      addItem();
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
        <h1>사진 </h1>
        <input type="text" onChange={onChange(setImage)} />
      </div>
      <div>
        <h1>할인율 </h1>
        <input type="text" onChange={onChange(setDiscount)} />
      </div>
      <div>
        <h1>가격 </h1>
        <input type="text" onChange={onChange(setPrice)} />
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
