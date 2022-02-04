import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import AddItemPopUp from "../../components/owner/Product/AddItemPopUp/AddItemPopUp";
import EditItemPopUp from "../../components/owner/Product/EditItemPopUp/EditItemPopUp";
import EnrolledItemList from "../../components/owner/Product/EnrolledItemList/EnrolledItemList";
import {
  productState,
  showAddPopUpState,
  showEditPopUpState,
} from "../../store/owner/product";

const OwnerProductPageWrapper = styled.div`
  text-align: center;
`;

const OwnerProductPage = () => {
  const items = useRecoilValue(productState);
  const showEditPopUp = useRecoilValue(showEditPopUpState);
  const [showAddPopUp, setShowAddPopUp] = useRecoilState(showAddPopUpState);

  const onClickAddItem = () => {
    setShowAddPopUp(true);
  };

  return (
    <OwnerProductPageWrapper>
      <button onClick={onClickAddItem}>상품 추가</button>
      <h1>등록한 상품 목록</h1>
      <EnrolledItemList items={items} />
      {showAddPopUp && <AddItemPopUp />}
      {showEditPopUp && <EditItemPopUp />}
    </OwnerProductPageWrapper>
  );
};

export default OwnerProductPage;
