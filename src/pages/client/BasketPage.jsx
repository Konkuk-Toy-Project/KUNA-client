import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import PreviewItemList from "../../components/common/PreviewItemList/PreviewItemList";

import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";
import { buyingItemState } from "../../store/client/basket";
import { buyingState } from "../../store/client/buying";

const BasketPage = () => {
  const [items, setItems] = useRecoilState(buyingItemState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [postPrice, setPostPrice] = useState(3000);
  const [withoutDiscountPrice, setWithoutDiscountPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const setBuying = useSetRecoilState(buyingState);
  const navigate = useNavigate();

  const getBasketData = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/cart`)
      .then((response) => response.data);
    setItems(data);
  }, [setItems]);

  console.log(items);

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
        item.sale > 0 && (total += (item.price * item.count * item.sale) / 100)
    );
    setDiscountPrice(total);
  }, [items]);

  const onClickPurchaseItems = () => {
    if (window.confirm("상품을 구매하시겠습니까?")) {
      setBuying(items);
      navigate("/order");
    }
  };

  useEffect(() => {
    getBasketData();
  }, [getBasketData]);

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
      <button onClick={onClickPurchaseItems}>결제하기</button>
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
