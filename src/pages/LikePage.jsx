import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";
import { itemState } from "../store/like";

const LikePage = () => {
  const items = useRecoilValue(itemState);

  return (
    <LikePageWrapper>
      <Title name="좋아요" />
      <ItemList listType={"like"} items={items} />
    </LikePageWrapper>
  );
};

const LikePageWrapper = styled.div`
  text-align: center;
  margin: 2em 0;
  padding-bottom: 2em;
  border-bottom: 2px solid black;
`;

export default LikePage;
