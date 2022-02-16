import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import AddItemPopUp from "../../components/owner/Product/AddItemPopUp/AddItemPopUp";
import AddOptionPopUp from "../../components/owner/Product/AddOptionPopUp/AddOptionPopUp";
import EditItemPopUp from "../../components/owner/Product/EditItemPopUp/EditItemPopUp";
import EnrolledItemList from "../../components/owner/Product/EnrolledItemList/EnrolledItemList";
import { userTokenState } from "../../store/common/user";
import {
  productState,
  showAddPopUpState,
  showEditPopUpState,
  showOptionPopUpState,
} from "../../store/owner/product";

const OwnerProductPage = () => {
  const showOptionPopUp = useRecoilValue(showOptionPopUpState);
  const [items, setItems] = useRecoilState(productState);
  const showEditPopUp = useRecoilValue(showEditPopUpState);
  const [showAddPopUp, setShowAddPopUp] = useRecoilState(showAddPopUpState);
  const userToken = useRecoilValue(userTokenState);

  const onClickAddItem = () => {
    setShowAddPopUp(true);
  };

  useEffect(() => {
    async function getData() {
      const data = await axios
        .get("http://localhost:8080/admin/items", {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => response.data);
      setItems(data);
    }

    getData();
  }, [userToken, setItems]);

  return (
    <OwnerProductPageWrapper>
      <button onClick={onClickAddItem}>상품 추가</button>
      <h1>등록한 상품 목록</h1>
      <EnrolledItemList items={items} />
      {showAddPopUp && <AddItemPopUp />}
      {showEditPopUp && <EditItemPopUp />}
      {showOptionPopUp && <AddOptionPopUp />}
    </OwnerProductPageWrapper>
  );
};

const OwnerProductPageWrapper = styled.div`
  text-align: center;
`;

export default OwnerProductPage;
