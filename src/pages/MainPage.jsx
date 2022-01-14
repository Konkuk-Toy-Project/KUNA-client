import React from "react";
import styled from "styled-components";
import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <Category>
        <Title name={"아우터"} />
        <ItemList />
      </Category>
      <Category>
        <Title name={"상의"} />
        <ItemList />
      </Category>
      <Category>
        <Title name={"하의"} />
        <ItemList />
      </Category>
      <Category>
        <Title name={"신발"} />
        <ItemList />
      </Category>
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

const Category = styled.div``;

export default MainPage;
