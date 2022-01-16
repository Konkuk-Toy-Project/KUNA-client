import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";
import { basketItemState, itemState } from "../store/like";

const BasketPage = () => {
  const [items, setItems] = useRecoilState(basketItemState);
  const initialItems = useRecoilValue(itemState);

  //   useEffect(() => {
  //     setItems([...initialItems]);
  //   }, [initialItems]);

  return (
    <BasketPageWrapper>
      <Title name="장바구니" />
      <ItemList listType={"basket"} items={items} />
    </BasketPageWrapper>
  );
};

const BasketPageWrapper = styled.div`
  text-align: center;
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default BasketPage;
