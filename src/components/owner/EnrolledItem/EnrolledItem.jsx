import React from "react";
import styled from "styled-components";

const EnrolledItem = ({ item }) => {
  return (
    <ItemWrapper>
      <ItemImage src={item.image} />
      <ItemDescription>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemPriceWrapper>
          <p>할인율 : {item.discount}</p>
          <p>가격 : {item.price}</p>
        </ItemPriceWrapper>
      </ItemDescription>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
`;

const ItemImage = styled.img`
  width: 8em;
  border-radius: 10px;
`;

const ItemDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2em;
  justify-content: center;
  align-items: center;
`;

const ItemTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EnrolledItem;
