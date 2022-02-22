import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BasketItem from "../../components/client/Basket/BasketItem/BasketItem";

import { buyingState } from "../../store/client/buying";
import { userTokenState } from "../../store/common/user";

const BasketPage = () => {
  const [items, setItems] = useRecoilState(buyingState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [postPrice, setPostPrice] = useState(3000);
  const [withoutDiscountPrice, setWithoutDiscountPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenState);

  const getBasketData = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/cart`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    setItems(data);
  }, [setItems, userToken]);

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
      <Title>장바구니</Title>
      <BasketWrapper>
        <ItemWrapper>
          <CategoryWrapper>
            <InfoCategory>주문 상품 정보</InfoCategory>
            <CategoryCount>수량</CategoryCount>
            <CategoryPrice>가격</CategoryPrice>
          </CategoryWrapper>
          <BasketItemWrapper>
            {items.map((item) => (
              <BasketItem key={item.itemId} item={item} />
            ))}
          </BasketItemWrapper>
        </ItemWrapper>
        <PaymentWrapper>
          <PaymentTitle>결제 금액</PaymentTitle>
          <TotalPrice>{totalPrice}원</TotalPrice>
          <DetailPriceWrapper>
            <DetailDescription>총 상품 금액</DetailDescription>
            <DetailPrice>{totalPrice - postPrice}원</DetailPrice>
          </DetailPriceWrapper>
          <DetailPriceWrapper>
            <DetailDescription>배송비</DetailDescription>
            <DetailPrice>{postPrice}원</DetailPrice>
          </DetailPriceWrapper>
          <PaymentButton onClick={onClickPurchaseItems}>결제하기</PaymentButton>
        </PaymentWrapper>
      </BasketWrapper>
    </BasketPageWrapper>
  );
};

const BasketPageWrapper = styled.div`
  text-align: center;
  margin: 2em 0;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  color: #ab46bc;
  font-size: 36px;
  font-weight: 800;
  margin: 1em 0 2em 0;
`;

const BasketWrapper = styled.div`
  display: flex;
  padding: 0 2em;
`;

const ItemWrapper = styled.div`
  width: 60em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 80%;
  padding: 1em;
`;

const BasketItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const InfoCategory = styled.p`
  font-size: 16px;
  font-weight: 600;
  width: 60%;
`;

const CategoryCount = styled.p`
  font-size: 16px;
  font-weight: 600;
  width: 16%;
`;

const CategoryPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  width: 18%;
`;

const PaymentWrapper = styled.div`
  width: 30em;
  height: 20em;
  background-color: #f6f6f6;
  padding: 2em;
  border-radius: 20px;
`;

const PaymentTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1em;
`;

const TotalPrice = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: #ab46bc;
  margin-bottom: 2em;
`;

const DetailPriceWrapper = styled.div`
  display: flex;
  padding: 0 2em;
`;

const DetailDescription = styled.p`
  font-size: 14px;
  text-align: start;
  width: 15em;
  color: gray;
`;

const DetailPrice = styled.p`
  font-size: 14px;
  color: gray;
`;

const PaymentButton = styled.button`
  outline: none;
  background-color: #ab45bd;
  border: none;
  color: white;
  font-size: 20px;
  padding: 1em 4em;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 4em;
  &:hover {
    background-color: #d054e6;
    transition: all 0.2s ease-in;
  }
`;

export default BasketPage;
