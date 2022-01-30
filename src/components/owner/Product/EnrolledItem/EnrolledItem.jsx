import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { productState } from "../../../../store/owner/product";

const EnrolledItem = ({ item }) => {
  const [items, setItems] = useRecoilState(productState);

  const onClickDeleteItem = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      if (
        window.confirm(
          "제품을 삭제하면 다시 복구할 수 없습니다. 정말 삭제 하시겠습니까?"
        )
      ) {
        const filterClickedItem = items.filter(
          (current) => current.id !== item.id
        );
        setItems(filterClickedItem);
        alert("제품이 삭제되었습니다.");
      }
    }
  };
  return (
    <ItemWrapper>
      <ItemImage src={item.image} />
      <ItemDescription>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemPriceWrapper>
          <p>할인율 : {item.discount}</p>
          <p>가격 : {item.price}</p>
        </ItemPriceWrapper>
        <div>
          <button>상품 수정</button>
          <button onClick={onClickDeleteItem}>상품 삭제</button>
        </div>
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
