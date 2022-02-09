import React from "react";
import { Suspense } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Category from "../../components/client/Main/Category/Category";

const CategoryPage = () => {
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
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category
          link="top"
          name={convertEngTitleToKor(category)}
          listType="main"
        />
      </Suspense>
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
