import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import EditItemPopUp from "../../components/owner/Product/EditItemPopUp/EditItemPopUp";
import EnrolledItemList from "../../components/owner/Product/EnrolledItemList/EnrolledItemList";
import {
  currentItemState,
  productState,
  showEditPopUpState,
} from "../../store/owner/product";

const OwnerProductPageWrapper = styled.div`
  text-align: center;
`;

const OwnerProductPage = () => {
  const items = useRecoilValue(productState);
  const currentItem = useRecoilValue(currentItemState);
  const showEditPopUp = useRecoilValue(showEditPopUpState);

  if (currentItem) {
    console.log(currentItem);
  }

  return (
    <OwnerProductPageWrapper>
      <button>상품 추가</button>
      <h1>등록한 상품 목록</h1>
      <EnrolledItemList items={items} />
      {showEditPopUp && <EditItemPopUp />}
    </OwnerProductPageWrapper>
  );
};

export default OwnerProductPage;
