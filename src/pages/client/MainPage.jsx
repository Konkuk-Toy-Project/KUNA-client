import React from "react";
import styled from "styled-components";
import Category from "../../components/client/Main/Category/Category";
import { Suspense } from "react";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <MainImageWrapper>
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1644914647_0.jpg.webp"
          alt=""
        />
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1645162224_1.jpg.webp"
          alt=""
        />
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1645162627_0.jpg.webp"
          alt=""
        />
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1645162680_0.jpg.webp"
          alt=""
        />
      </MainImageWrapper>
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
  text-align: center;
  overflow: hidden;
`;

const MainImageWrapper = styled.div`
  display: flex;
  margin: 4em 0;
`;

const MainImage = styled.img`
  width: 40em;
  height: 45em;
  border-radius: 20px;
  margin: 0 1em;
`;

export default MainPage;
