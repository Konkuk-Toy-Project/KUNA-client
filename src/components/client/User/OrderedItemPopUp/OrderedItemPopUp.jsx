import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentReviewItemState,
  showOrderedItemState,
  showWriteReviewState,
} from "../../../../store/client/user";
import { currentY, userTokenState } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const OrderedItemPopUp = () => {
  const setShowOrderedItemPopUp = useSetRecoilState(showOrderedItemState);
  const [orderedItems, setOrderedItems] = useState([]);
  const scrollY = useRecoilValue(currentY);
  const setShowWriteReviewState = useSetRecoilState(showWriteReviewState);
  const setCurrentReviewItem = useSetRecoilState(currentReviewItemState);
  const userToken = useRecoilValue(userTokenState);

  const onClickWriteReview = (item) => {
    setShowOrderedItemPopUp(false);
    setShowWriteReviewState(true);
    setCurrentReviewItem(item);
  };

  const getOrderedItem = useCallback(async () => {
    const data = await axios
      .get("http://localhost:8080/order/item", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    setOrderedItems(data);
  }, [userToken]);

  useEffect(() => {
    getOrderedItem();
  }, [getOrderedItem]);

  return (
    <OrderedItemPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowOrderedItemPopUp} />
      {orderedItems.length ? (
        <Title>주문한 제품</Title>
      ) : (
        <Title>주문한 상품 없음</Title>
      )}
      {orderedItems.map((item, index) => (
        <OrderedItemWrapper key={index}>
          <ItemName>{item.itemName}</ItemName>
          {item.isReviewed ? (
            <Review>리뷰 작성 완료</Review>
          ) : (
            <Button onClick={() => onClickWriteReview(item)}>
              리뷰 작성하기
            </Button>
          )}
        </OrderedItemWrapper>
      ))}
    </OrderedItemPopUpWrapper>
  );
};

const OrderedItemPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  width: 40em;
  padding: 2em;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderedItemWrapper = styled.div`
  width: 30em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid black;
  margin: 1em 0;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1em;
`;

const ItemName = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const Review = styled.p`
  font-size: 18px;
`;

const Button = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 1em;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

export default OrderedItemPopUp;
