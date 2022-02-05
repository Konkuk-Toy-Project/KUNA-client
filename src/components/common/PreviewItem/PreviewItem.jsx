import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { basketItemState } from "../../../store/client/basket";
import { likeState } from "../../../store/client/like";

const Item = ({ listType, item }) => {
  const [items, setItems] = useRecoilState(likeState);
  const [basketItems, setBasketItems] = useRecoilState(basketItemState);

  const briefTitle = (listType, title) => {
    return listType === "main"
      ? title.slice(0, 16) + "..."
      : title.slice(0, 8) + "...";
  };

  const onClickDeleteLike = () => {
    const filterClickedItem = items.filter((current) => current.id !== item.id);
    setItems(filterClickedItem);
  };

  const onClickDeleteBasket = () => {
    const filterClickedItem = basketItems.filter(
      (current) => current.id !== item.id
    );
    setBasketItems(filterClickedItem);
  };

  const onClickLikeItem = () => {
    const currentItem = { ...item, count: 1 };
    const existingItem = basketItems.find((item) => item.id === currentItem.id);
    if (!existingItem) {
      setBasketItems([...basketItems, currentItem]);
    } else {
      alert("이미 장바구니에 추가된 아이템입니다.");
    }
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
    <ItemWrapper listType={listType}>
      <ItemImage src={item.image} listType={listType} />
      <ItemDescription listType={listType}>
        <ItemTitle>{briefTitle(listType, item.title)}</ItemTitle>
        <ItemPriceWrapper listType={listType}>
          <p>{item.discount}</p>
          <p>{item.price}</p>
        </ItemPriceWrapper>
      </ItemDescription>
      {listType === "like" ? (
        <button onClick={onClickDeleteLike}>Delete Like</button>
      ) : null}
      {listType === "basket" ? (
        <button onClick={onClickDeleteBasket}>Delete Basket</button>
      ) : null}
      {listType === "main" ? (
        <button onClick={onClickLikeItem}>장바구니 추가</button>
      ) : null}
      {listType === "basket" ? <span>{item.count}</span> : null}
      {listType === "basket" ? (
        <button onClick={() => changeItemCount(item, "increase")}>+</button>
      ) : null}
      {listType === "basket" ? (
        <button onClick={() => changeItemCount(item, "decrease")}>-</button>
      ) : null}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: ${(props) => (props.listType === "main" ? "column" : "row")};
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
`;

const ItemImage = styled.img`
  width: ${(props) => (props.listType === "main" ? "10em" : "5em")};
  border-radius: 10px;
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em;
`;

const ItemTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.listType === "main" ? "column" : "row")};
`;

export default Item;
