import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import EnrolledItemList from "../../components/owner/EnrolledItemList/EnrolledItemList";
import { productState } from "../../store/owner/product";

const OwnerProductPageWrapper = styled.div`
  text-align: center;
`;

const OwnerProductPage = () => {
  const items = useRecoilValue(productState);
  return (
    <OwnerProductPageWrapper>
      <button>상품 추가</button>
      <button>상품 수정</button>
      <button>상품 삭제</button>
      <h1>등록한 상품 목록</h1>
      <EnrolledItemList items={items} />
    </OwnerProductPageWrapper>
  );
};

export default OwnerProductPage;
