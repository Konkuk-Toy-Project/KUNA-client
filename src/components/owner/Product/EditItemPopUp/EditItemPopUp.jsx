import axios from "axios";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY, userTokenState } from "../../../../store/common/user";
import {
  currentItemState,
  productState,
  showEditPopUpState,
} from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";

const EditItemPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const currentItem = useRecoilValue(currentItemState);
  const setShowEditPopUp = useSetRecoilState(showEditPopUpState);
  const [sale, setSale] = useState(0);
  const [price, setPrice] = useState(0);
  const [product, setProduct] = useRecoilState(productState);
  const userToken = useRecoilValue(userTokenState);

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
  };

  const editSaleOrPrice = () => {
    const otherItems = product.filter(
      (item) => item.itemId !== currentItem.itemId
    );
    const editedItem = { ...currentItem, sale, price };
    setProduct([editedItem, ...otherItems]);
  };

  const onClickSubmit = async () => {
    if (window.confirm("해당 상품을 수정하시겠습니까?")) {
      await changePriceAndSale();
      editSaleOrPrice();
      alert("수정이 완료되었습니다.");
      setShowEditPopUp(false);
    }
  };

  function changePriceAndSale() {
    axios
      .put(`http://localhost:8080/admin/price/${currentItem.itemId}`, {
        price,
        sale,
      })
      .then((response) => response.data);
  }

  useEffect(() => {
    setSale(currentItem.sale);
    setPrice(currentItem.price);
  }, [currentItem.sale, currentItem.price]);

  return (
    <EditItemPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowEditPopUp} />
      <div>
        <h1>상품명 : {currentItem.title}</h1>
        <EditContentWrapper>
          <p>할인율 </p>
          <input type="text" value={sale} onChange={onChange(setSale)} />
        </EditContentWrapper>
        <EditContentWrapper>
          <p>가격</p>
          <input type="text" value={price} onChange={onChange(setPrice)} />
        </EditContentWrapper>
        <div>
          <button onClick={onClickSubmit}>수정 완료</button>
        </div>
      </div>
    </EditItemPopUpWrapper>
  );
};

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

export default EditItemPopUp;
