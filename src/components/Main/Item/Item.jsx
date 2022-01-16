import React from "react";
import styled from "styled-components";

const Item = ({ listType }) => {
  const briefTitle = (listType, title) => {
    return listType === "main"
      ? title.slice(0, 16) + "..."
      : title.slice(0, 8) + "...";
  };

  return (
    <ItemWrapper listType={listType}>
      <ItemImage
        src="https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp"
        listType={listType}
      />
      <ItemDescription listType={listType}>
        <ItemTitle>
          {briefTitle(
            listType,
            "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)"
          )}
        </ItemTitle>
        <ItemPriceWrapper listType={listType}>
          <p>5%</p>
          <p>25,400</p>
        </ItemPriceWrapper>
      </ItemDescription>
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
