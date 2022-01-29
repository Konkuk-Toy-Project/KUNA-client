import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Title from "../../components/client/Main/Title/Title";
import { useRecoilValue } from "recoil";
import ItemList from "../../components/client/Main/ItemList/ItemList";
import { itemState } from "../../store/client/home";

const MainPage = () => {
  const items = useRecoilValue(itemState);

  return (
    <MainPageWrapper>
      <Category>
        <CategoryLink to="outer">
          <Title name={"아우터"} />
        </CategoryLink>
        <ItemList listType={"main"} items={items} />
      </Category>
      <Category>
        <CategoryLink to="top">
          <Title name={"상의"} />
        </CategoryLink>
        <ItemList listType={"main"} items={items} />
      </Category>
      <Category>
        <CategoryLink to="pants">
          <Title name={"하의"} />
        </CategoryLink>
        <ItemList listType={"main"} items={items} />
      </Category>
      <Category>
        <CategoryLink to="shoes">
          <Title name={"신발"} />
        </CategoryLink>
        <ItemList listType={"main"} items={items} />
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

const CategoryLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default MainPage;
