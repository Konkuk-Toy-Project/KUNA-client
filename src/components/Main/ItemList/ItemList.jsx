import React from "react";
import styled from "styled-components";
import Item from "../Item/Item";

const ItemList = () => {
  return (
    <ItemListWrapper>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </ItemListWrapper>
  );
};

const ItemListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  margin: 2em 0;
`;

export default ItemList;
