import React from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";
import { itemState } from "../store/like";

const CategoryPage = () => {
  const items = useRecoilValue(itemState);
  const { category } = useParams();

  const convertEngTitleToKor = (category) => {
    switch (category) {
      case "outer":
        return "아우터";
      case "top":
        return "상의";
      case "pants":
        return "하의";
      case "shoes":
        return "신발";
      default:
        return;
    }
  };

  return (
    <CategoryPageWrapper>
      <Title name={convertEngTitleToKor(category)} />
      <ItemList listType={"main"} items={items} />
      <ItemList listType={"main"} items={items} />
      <ItemList listType={"main"} items={items} />
    </CategoryPageWrapper>
  );
};

const CategoryPageWrapper = styled.div`
  text-align: center;
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default CategoryPage;
