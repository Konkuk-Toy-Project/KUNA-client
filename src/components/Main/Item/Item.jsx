import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { basketItemState, likeState } from "../../../store/like";

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
    setBasketItems([...basketItems, item]);
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
