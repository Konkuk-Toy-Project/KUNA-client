import React from "react";
import styled from "styled-components";
import Category from "../../components/client/Main/Category/Category";
import { Suspense } from "react";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category link="top" name="상의" listType="main" />
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category link="pants" name="하의" listType="main" />
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category link="shoes" name="신발" listType="main" />
      </Suspense>
    </MainPageWrapper>
  );
};

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  text-align: center;
`;

export default MainPage;
