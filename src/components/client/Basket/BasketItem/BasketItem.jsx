import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { buyingState } from "../../../../store/client/buying";
import { userTokenState } from "../../../../store/common/user";

const BasketItem = ({ item }) => {
  const [buyingItems, setBuyingItems] = useRecoilState(buyingState);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenState);

  const deleteItem = async () => {
    await axios
      .delete(`http://localhost:8080/cart/${item.cartItemId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
  };

  const onClickDeleteBasket = () => {
    if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
      deleteItem();
      alert("삭제 되었습니다.");
      navigate("/");
    }
  };

  const changeItemCount = async (count) => {
    await axios
      .put(
        `http://localhost:8080/cart/${item.cartItemId}`,
        { count },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => response.data);
  };

  const changeCountOnClient = (count) => {
    let changingItem = buyingItems.find(
      (buyingItem) => buyingItem.cartItemId === item.cartItemId
    );
    const otherItems = buyingItems.filter(
      (buyingItem) => buyingItem.cartItemId !== item.cartItemId
    );
    changingItem = { ...changingItem, count };
    setBuyingItems([changingItem, ...otherItems]);
  };

  const onClickChangeCount = (type) => {
    let count = itemCount;
    if (type === "increase") {
      count++;
      changeItemCount(count);
      changeCountOnClient(count);
    } else {
      if (count === 1) {
        return alert("수량은 1보다 작을수 없습니다.");
      }
      count--;
      changeItemCount(count);
      changeCountOnClient(count);
    }
  };

  const discountPrice = () => {
    return (item.price * (100 - item.sale)) / 100;
  };

  useEffect(() => {
    setItemCount(item.count);
  }, [item.count]);

  return (
    <Wrapper>
      <Image
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <Description>
        <Name>{item.name}</Name>
        <Options>
          {item?.option1} {item?.option2}
        </Options>
      </Description>
      <AmountWrapper>
        <Button onClick={() => onClickChangeCount("decrease")}>〈</Button>
        <DiscountAndCount>{itemCount}</DiscountAndCount>
        <Button onClick={() => onClickChangeCount("increase")}>〉</Button>
      </AmountWrapper>
      <PriceWrapper>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
        <DiscountAndCount>
          {discountPrice().toLocaleString()}원
        </DiscountAndCount>
      </PriceWrapper>
      <Button onClick={onClickDeleteBasket}>✕</Button>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 1em;
`;

const Image = styled.img`
  width: 6em;
  height: 6em;
  border-radius: 10px;
  margin-right: 1em;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em;
  width: 30em;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.5em;
`;

const Options = styled.p`
  font-size: 16px;
  color: gray;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 13em;
`;

const AmountWrapper = styled.div`
  width: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ItemPrice = styled.p`
  color: gray;
  text-decoration: line-through;
  margin-bottom: 0.2em;
  font-size: 16px;
`;

const DiscountAndCount = styled.p`
  font-size: 16px;
`;

export default BasketItem;
