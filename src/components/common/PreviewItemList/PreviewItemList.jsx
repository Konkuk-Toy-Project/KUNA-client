import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { likeState } from "../../../store/client/like";
import PreviewItem from "../PreviewItem/PreviewItem";

const PreviewItemList = ({ listType, items }) => {
  const setLikeItems = useSetRecoilState(likeState);

  const onClickDeleteAll = () => {
    setLikeItems([]);
  };

  return (
    <PreviewItemListWrapper>
      {items.map((item) => (
        <PreviewItem key={item.id} listType={listType} item={item} />
      ))}
      {listType === "like" ? (
        <button onClick={onClickDeleteAll}>전체 삭제</button>
      ) : null}
    </PreviewItemListWrapper>
  );
};

const PreviewItemListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  margin: 0.5em 0;
`;

export default PreviewItemList;
