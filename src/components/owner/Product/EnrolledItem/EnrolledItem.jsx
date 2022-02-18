import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import {
  currentItemState,
  showEditPopUpState,
  showOptionPopUpState,
} from "../../../../store/owner/product";

const EnrolledItem = ({ item }) => {
  const setCurrentItem = useSetRecoilState(currentItemState);
  const setShowEditPopUp = useSetRecoilState(showEditPopUpState);
  const setShowOptionPopUp = useSetRecoilState(showOptionPopUpState);
  const setCurrentY = useSetRecoilState(currentY);

  const calculatePopUpHeight = () => {
    setCurrentY(window.scrollY + window.innerHeight * 0.15);
  };

  const onClickEditItem = () => {
    calculatePopUpHeight();
    setCurrentItem(item);
    setShowEditPopUp(true);
  };

  const onClickAddOption = () => {
    calculatePopUpHeight();
    setCurrentItem(item);
    setShowOptionPopUp(true);
  };

  return (
    <ItemWrapper>
      <ItemImage
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <ItemDescription>
        <ItemTitle>{item.name}</ItemTitle>
        <h1>카테고리 : {item.categoryName}</h1>
        <ItemPriceWrapper>
          <p>가격 : {item.price}</p>
          <p>할인율 : {item.sale}%</p>
        </ItemPriceWrapper>
        <div>
          <button onClick={onClickEditItem}>상품 수정</button>
          <button onClick={onClickAddOption}>옵션 추가</button>
        </div>
      </ItemDescription>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
`;

const ItemImage = styled.img`
  width: 8em;
  border-radius: 10px;
`;

const ItemDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2em;
  justify-content: center;
  align-items: center;
`;

const ItemTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EnrolledItem;
