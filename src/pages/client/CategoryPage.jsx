import React from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PreviewItemList from "../../components/client/Main/PreviewItemList/PreviewItemList";
import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";
import { categoryState } from "../../store/client/category";

const CategoryPage = () => {
  const items = useRecoilValue(categoryState);
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
      <PreviewTitle name={convertEngTitleToKor(category)} />
      <PreviewItemList listType={"main"} items={items} />
      <PreviewItemList listType={"main"} items={items} />
      <PreviewItemList listType={"main"} items={items} />
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
