import React from "react";
import styled from "styled-components";

import BasketItem from "../../client/Basket/BasketItem/BasketItem";
import LikeItem from "../../client/Like/LikeItem";
import MainItem from "../../client/Main/MainItem/MainItem";

const PreviewItemList = ({ listType, items }) => {
  return (
    <PreviewItemListWrapper>
      {items.map((item) =>
        listType === "main" ? (
          <MainItem key={item.itemId} item={item} />
        ) : listType === "basket" ? (
          <BasketItem key={item.itemId} item={item} />
        ) : (
          <LikeItem key={item.itemId} item={item} />
        )
      )}
    </PreviewItemListWrapper>
  );
};

const PreviewItemListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  margin: 0.5em 0;
`;

export default PreviewItemList;
