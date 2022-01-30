import React from "react";
import styled from "styled-components";
import EnrolledItem from "../EnrolledItem/EnrolledItem";

const EnrolledItemList = ({ items }) => {
  return (
    <EnrolledItemListWrapper>
      {items.map((item) => (
        <EnrolledItem key={item.id} item={item} />
      ))}
    </EnrolledItemListWrapper>
  );
};

const EnrolledItemListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  margin: 2em;
`;

export default EnrolledItemList;
