import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import PreviewItemList from "../../components/common/PreviewItemList/PreviewItemList";

import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";
import { basketItemState } from "../../store/client/basket";

const BasketPage = () => {
  const [items, setItems] = useRecoilState(basketItemState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [postPrice, setPostPrice] = useState(3000);
  const [withoutDiscountPrice, setWithoutDiscountPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  const onClickDeleteAll = () => {
    setItems([]);
  };

  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    items.map((item) => (total += item.price * item.count));
    setWithoutDiscountPrice(total);
    if (withoutDiscountPrice > 50000) {
      setPostPrice(2000);
    } else {
      setPostPrice(3000);
    }
  }, [withoutDiscountPrice, items]);

  const calculateDiscountPrice = useCallback(() => {
    let total = 0;
    items.map(
      (item) =>
        item.discount > 0 &&
        (total +=
          (item.price *
            item.count *
            Number(item.discount.substring(0, item.discount.length - 1))) /
          100)
    );
    setDiscountPrice(total);
  }, [items]);

  useEffect(() => {
    calculateTotalPrice();
    calculateDiscountPrice();
    setTotalPrice(withoutDiscountPrice - discountPrice + postPrice);
  }, [
    calculateTotalPrice,
    calculateDiscountPrice,
    withoutDiscountPrice,
    discountPrice,
    postPrice,
  ]);

  return (
    <BasketPageWrapper>
      <PreviewTitle name="장바구니" />
      <PreviewItemList listType={"basket"} items={items} />
      <button onClick={onClickDeleteAll}>전체 삭제</button>
      <button>결제하기</button>
      <p>기존 금액 : {withoutDiscountPrice}원</p>
      <p>할인된 금액 : {discountPrice}원</p>
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
