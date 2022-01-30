import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import EnrolledItemList from "../../components/owner/Product/EnrolledItemList/EnrolledItemList";
import { productState } from "../../store/owner/product";

const OwnerProductPageWrapper = styled.div`
  text-align: center;
`;

const OwnerProductPage = () => {
  const items = useRecoilValue(productState);
  return (
    <OwnerProductPageWrapper>
      <button>상품 추가</button>
      <h1>등록한 상품 목록</h1>
      <EnrolledItemList items={items} />
    </OwnerProductPageWrapper>
  );
};

export default OwnerProductPage;
