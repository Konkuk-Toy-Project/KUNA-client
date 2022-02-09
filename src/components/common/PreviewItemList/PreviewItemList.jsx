import React from "react";
import styled from "styled-components";

import BasketItem from "../../client/Basket/BasketItem/BasketItem";
import PreviewItem from "../PreviewItem/PreviewItem";

const PreviewItemList = ({ listType, items }) => {
  return (
    <PreviewItemListWrapper>
      {items.map((item) =>
        listType === "main" ? (
          <PreviewItem key={item.itemId} listType={listType} item={item} />
        ) : (
          <BasketItem key={item.itemId} item={item} />
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
