import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { basketItemState } from "../../../../store/client/basket";

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
  const [basketItems, setBasketItems] = useRecoilState(basketItemState);

  const onClickDeleteBasket = () => {
    const filterClickedItem = basketItems.filter(
      (current) => current.id !== item.id
    );
    setBasketItems(filterClickedItem);
  };

  const changeItemCount = (item, type) => {
    const currentItem = { ...item };
    type === "increase" ? currentItem.count++ : currentItem.count--;
    let currentItemIndex;
    basketItems.find((item, index) =>
      item.id === currentItem.id ? (currentItemIndex = index) : null
    );

    let existingItem = basketItems.filter((item) => item.id !== currentItem.id);
    if (currentItem.count !== 0) {
      existingItem.splice(currentItemIndex, 0, currentItem);
    }

    setBasketItems([...existingItem]);
  };
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
      <button onClick={onClickDeleteBasket}>Delete Basket</button>
      <span>{item.count}</span>
      <button onClick={() => changeItemCount(item, "increase")}>+</button>
      <button onClick={() => changeItemCount(item, "decrease")}>-</button>
    </Wrapper>
  );
};

export default BasketItem;
