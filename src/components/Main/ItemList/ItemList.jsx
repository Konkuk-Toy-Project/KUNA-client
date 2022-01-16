import React from "react";
import styled from "styled-components";
import Item from "../Item/Item";

const ItemList = ({ listType }) => {
  return (
    <ItemListWrapper>
      <Item listType={listType} />
      <Item listType={listType} />
      <Item listType={listType} />
      <Item listType={listType} />
      <Item listType={listType} />
      <Item listType={listType} />
      <Item listType={listType} />
      <Item listType={listType} />
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
