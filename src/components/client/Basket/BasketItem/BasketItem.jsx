import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { buyingItemState } from "../../../../store/client/basket";

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 10em;
  border-radius: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em;
  width: 12em;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const BasketItem = ({ item }) => {
  const [buyingItems, setBuyingItems] = useRecoilState(buyingItemState);
  const [itemCount, setItemCount] = useState(0);

  const deleteItem = async () => {
    await axios
      .delete(`http://localhost:8080/cart/${item.cartItemId}`)
      .then((response) => response.data);
  };

  const onClickDeleteBasket = () => {
    if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
      deleteItem();
      alert("삭제 되었습니다.");
    }
  };

  const changeItemCount = async (count) => {
    await axios
      .put(`http://localhost:8080/cart/${item.cartItemId}`, { count })
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

  useEffect(() => {
    setItemCount(item.count);
  }, [item.count]);

  return (
    <Wrapper>
      <Image
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <Description>
        <Title>{item.name}</Title>
        <PriceWrapper>
          <h1>할인율 : {item.sale}%</h1>
          <h1>{item.price}원</h1>
        </PriceWrapper>
      </Description>
      <button onClick={() => onClickChangeCount("decrease")}>-</button>
      <span>{itemCount}</span>
      <button onClick={() => onClickChangeCount("increase")}>+</button>
      <button onClick={onClickDeleteBasket}>Delete Basket</button>
    </Wrapper>
  );
};

export default BasketItem;
