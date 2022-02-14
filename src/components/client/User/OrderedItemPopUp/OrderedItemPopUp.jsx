import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentReviewItemState,
  showOrderedItemState,
  showWriteReviewState,
} from "../../../../store/client/user";
import { currentY } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const OrderedItemPopUp = () => {
  const setShowOrderedItemPopUp = useSetRecoilState(showOrderedItemState);
  const [orderedItems, setOrderedItems] = useState([]);
  const scrollY = useRecoilValue(currentY);
  const setShowWriteReviewState = useSetRecoilState(showWriteReviewState);
  const setCurrentReviewItem = useSetRecoilState(currentReviewItemState);

  const onClickWriteReview = (item) => {
    setShowOrderedItemPopUp(false);
    setShowWriteReviewState(true);
    setCurrentReviewItem(item);
  };

  const getOrderedItem = async () => {
    const data = await axios
      .get("http://localhost:8080/order/item")
      .then((response) => response.data);
    setOrderedItems(data);
  };

  useEffect(() => {
    getOrderedItem();
  }, []);

  return (
    <OrderedItemPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowOrderedItemPopUp} />
      {orderedItems.length ? <h1>주문한 제품</h1> : <h1>주문한 상품 없음</h1>}
      {orderedItems.map((item, index) => (
        <OrderedItemWrapper key={index}>
          <h1>{item.itemName}</h1>
          {item.isReviewed ? (
            <h1>리뷰 작성 완료</h1>
          ) : (
            <button onClick={() => onClickWriteReview(item)}>
              리뷰 작성하기
            </button>
          )}
        </OrderedItemWrapper>
      ))}
    </OrderedItemPopUpWrapper>
  );
};

const OrderedItemPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 10vw;
  width: 80vw;
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

const OrderedItemWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
`;

export default OrderedItemPopUp;
