import React from "react";
import styled from "styled-components";

const Item = () => {
  return (
    <ItemWrapper>
      <ItemImage
        src="https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp"
        alt=""
      />
      <p>레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)</p>
      <div>
        <p>5%</p>
        <p>25,400</p>
      </div>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li``;

const ItemImage = styled.img`
  width: 10em;
  border-radius: 10px;
`;

export default Item;
