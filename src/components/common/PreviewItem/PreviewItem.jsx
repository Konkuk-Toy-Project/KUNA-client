import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { basketItemState } from "../../../store/client/basket";
import { likeState } from "../../../store/client/like";

const PreviewItem = ({ listType, item }) => {
  const [items, setItems] = useRecoilState(likeState);
  const [basketItems, setBasketItems] = useRecoilState(basketItemState);

  const onClickDeleteAll = () => {
    setItems([]);
  };

  const briefTitle = (listType, title) => {
    return listType === "main"
      ? title.slice(0, 16) + "..."
      : title.slice(0, 8) + "...";
  };

  const onClickDeleteLike = () => {
    const filterClickedItem = items.filter((current) => current.id !== item.id);
    setItems(filterClickedItem);
  };

  const onClickLikeItem = () => {
    const currentItem = { ...item, count: 1 };
    const existingItem = basketItems.find((item) => item.id === currentItem.id);
    if (!existingItem) {
      setBasketItems([...basketItems, currentItem]);
    } else {
      alert("이미 장바구니에 추가된 아이템입니다.");
    }
  };

  return (
    <PreviewItemWrapper listType={listType}>
      <PreviewItemImage
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <PreviewItemDescription listType={listType}>
        <PreviewItemTitle>{briefTitle(listType, item.name)}</PreviewItemTitle>
        <PreviewItemPriceWrapper listType={listType}>
          <h1>할인율 : {item.sale}%</h1>
          <h1>{item.price}원</h1>
        </PreviewItemPriceWrapper>
      </PreviewItemDescription>
      {listType === "like" && (
        <button onClick={onClickDeleteLike}>Delete Like</button>
      )}
      {listType === "main" && (
        <button onClick={onClickLikeItem}>장바구니 추가</button>
      )}
      {listType === "like" ? (
        <button onClick={onClickDeleteAll}>전체 삭제</button>
      ) : null}
    </PreviewItemWrapper>
  );
};

const PreviewItemWrapper = styled.li`
  display: flex;
  flex-direction: ${(props) => (props.listType === "main" ? "column" : "row")};
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
`;

const PreviewItemImage = styled.img`
  width: 10em;
  border-radius: 10px;
`;

const PreviewItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em;
  width: 12em;
`;

const PreviewItemTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const PreviewItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.listType === "main" ? "column" : "row")};
`;

export default PreviewItem;
