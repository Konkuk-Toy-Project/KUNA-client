import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";
import { basketItemState } from "../store/atoms";

const BasketPage = () => {
  const [items, setItems] = useRecoilState(basketItemState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [postPrice, setPostPrice] = useState(3000);

  const onClickDeleteAll = () => {
    setItems([]);
  };

  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    items.map((item) => {
      return (total += item.price * item.count);
    });
    return total;
  }, [items]);

  const calculateDiscountPrice = useCallback(() => {
    let total = 0;
    items.map((item) => {
      return (total +=
        (item.price *
          item.count *
          Number(item.discount.substring(0, item.discount.length - 1))) /
        100);
    });
    return total;
  }, [items]);

  useEffect(() => {
    const total = calculateTotalPrice();
    const discount = calculateDiscountPrice();
    if (total > 50000) {
      setPostPrice(2000);
    } else {
      setPostPrice(3000);
    }
    setTotalPrice(total - discount + postPrice);
  }, [calculateTotalPrice, calculateDiscountPrice, postPrice]);

  return (
    <BasketPageWrapper>
      <Title name="장바구니" />
      <ItemList listType={"basket"} items={items} />
      <button onClick={onClickDeleteAll}>전체 삭제</button>
      <button>결제하기</button>
      <p>기존 금액 : {calculateTotalPrice()}원</p>
      <p>할인된 금액 : {calculateDiscountPrice()}원</p>
      <p>배송비 : {postPrice}원</p>
      <p>결제 금액 : {totalPrice}원</p>
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
