import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import PreviewItemList from "../../components/common/PreviewItemList/PreviewItemList";
import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";
import { likeState } from "../../store/client/like";

const LikePage = () => {
  const [items, setItems] = useRecoilState(likeState);
  const onClickDeleteAll = () => {
    setItems([]);
  };

  return (
    <LikePageWrapper>
      <PreviewTitle name="좋아요" />
      <PreviewItemList listType={"like"} items={items} />
      <button onClick={onClickDeleteAll}>전체 삭제</button>
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
