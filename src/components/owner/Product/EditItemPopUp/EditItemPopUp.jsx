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
import ProductButton from "../../../common/ProductButton/ProductButton";

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
      .put(
        `http://localhost:8080/admin/price/${currentItem.itemId}`,
        {
          price,
          sale,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
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
        <Title>상품명 : {currentItem.name}</Title>
        <EditContentWrapper>
          <CategoryTitle>할인율 </CategoryTitle>
          <InputText type="text" value={sale} onChange={onChange(setSale)} />%
        </EditContentWrapper>
        <EditContentWrapper>
          <CategoryTitle>가격</CategoryTitle>
          <InputText type="text" value={price} onChange={onChange(setPrice)} />
          원
        </EditContentWrapper>
        <ProductButton onClick={onClickSubmit}>수정 완료</ProductButton>
      </div>
    </EditItemPopUpWrapper>
  );
};

const EditItemPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  width: 30em;
  height: 30em;
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
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 24em;
  margin-bottom: 1em;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.5em;
`;

const CategoryTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  width: 3em;
  text-align: end;
  margin-right: 0.5em;
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid black;
  align-self: flex-start;
  width: 6em;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

export default EditItemPopUp;
