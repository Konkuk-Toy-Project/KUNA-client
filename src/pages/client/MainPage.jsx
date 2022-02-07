import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { itemState } from "../../store/client/home";
import Category from "../../components/client/Main/Category/Category";

const MainPage = () => {
  const items = useRecoilValue(itemState);

  return (
    <MainPageWrapper>
      <Category link="top" name="상의" listType="main" items={items} />
      <Category link="pants" name="하의" listType="main" items={items} />
      <Category link="shoes" name="신발" listType="main" items={items} />
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
