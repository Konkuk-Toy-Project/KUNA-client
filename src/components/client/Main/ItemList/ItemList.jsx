import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { likeState } from "../../../../store/client/like";
import Item from "../Item/Item";

const ItemList = ({ listType, items }) => {
  const setLikeItems = useSetRecoilState(likeState);

  const onClickDeleteAll = () => {
    setLikeItems([]);
  };

  return (
    <ItemListWrapper>
      {items.map((item) => (
        <Item key={item.id} listType={listType} item={item} />
      ))}
      {listType === "like" ? (
        <button onClick={onClickDeleteAll}>전체 삭제</button>
      ) : null}
    </ItemListWrapper>
  );
};

const ItemListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  margin: 0.5em 0;
`;

export default ItemList;
