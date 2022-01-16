import React from "react";
import styled from "styled-components";
import Item from "../Item/Item";

const ItemList = ({ listType, items }) => {
  return (
    <ItemListWrapper>
      {items.map((item, index) => (
        <Item key={index} listType={listType} item={item} />
      ))}
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
