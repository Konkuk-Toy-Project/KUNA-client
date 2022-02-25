import React from "react";
import styled from "styled-components";

import LikeItem from "../../client/Like/LikeItem";
import MainItem from "../../client/Main/MainItem/MainItem";

const PreviewItemList = ({ listType, items }) => {
  return (
    <PreviewItemListWrapper>
      {items.map((item) =>
        listType === "main" ? (
          <MainItem key={item.itemId} item={item} />
        ) : (
          <LikeItem key={item.preferenceId} item={item} />
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
  margin-bottom: 5em;
`;

export default PreviewItemList;
