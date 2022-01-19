import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";
import { basketItemState } from "../store/like";

const BasketPage = () => {
  const [items, setItems] = useRecoilState(basketItemState);

  const onClickDeleteAll = () => {
    setItems([]);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    items.map((item) => {
      return (total += item.price * item.count);
    });
    return total;
  };

  return (
    <BasketPageWrapper>
      <Title name="장바구니" />
      <ItemList listType={"basket"} items={items} />
      <button onClick={onClickDeleteAll}>전체 삭제</button>
      <p>결제 금액 : {calculateTotalPrice()}</p>
    </BasketPageWrapper>
  );
};

const BasketPageWrapper = styled.div`
  text-align: center;
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default BasketPage;
