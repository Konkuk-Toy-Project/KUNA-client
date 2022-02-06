import React from "react";
import { useState } from "react/cjs/react.development";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import {
  currentItemState,
  productState,
  showEditPopUpState,
} from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";

const EditItemPopUpWrapper = styled.div`
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

const EditContentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1em;
  width: 80%;
`;

const EditItemPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const currentItem = useRecoilValue(currentItemState);
  const setShowEditPopUp = useSetRecoilState(showEditPopUpState);
  const [discount, setDiscount] = useState(currentItem.discount);
  const [price, setPrice] = useState(currentItem.price);
  const [product, setProduct] = useRecoilState(productState);

  const onChangeDiscount = (event) => {
    setDiscount(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const editDiscountOrPrice = () => {
    const otherItems = product.filter((item) => item.id !== currentItem.id);
    const editedItem = { ...currentItem, discount, price };
    setProduct([editedItem, ...otherItems]);
  };

  const onClickSubmit = () => {
    editDiscountOrPrice();
    alert("수정이 완료되었습니다.");
    setShowEditPopUp(false);
  };

  return (
    <EditItemPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowEditPopUp} />
      <div>
        <h1>상품명 : {currentItem.title}</h1>
        <EditContentWrapper>
          <p>할인율 </p>
          <input type="text" value={discount} onChange={onChangeDiscount} />
        </EditContentWrapper>
        <EditContentWrapper>
          <p>가격</p>
          <input type="text" value={price} onChange={onChangePrice} />
        </EditContentWrapper>
        <div>
          <button onClick={onClickSubmit}>수정 완료</button>
        </div>
      </div>
    </EditItemPopUpWrapper>
  );
};

export default EditItemPopUp;
