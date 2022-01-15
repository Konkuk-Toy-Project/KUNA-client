import React from "react";
import styled from "styled-components";
import ItemList from "../components/Main/ItemList/ItemList";
import Title from "../components/Main/Title/Title";

const LikePage = () => {
  return (
    <LikePageWrapper>
      <Title name="좋아요" />
      <ItemList listType={"like"} />
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
