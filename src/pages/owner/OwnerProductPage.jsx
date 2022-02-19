import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import AddItemPopUp from "../../components/owner/Product/AddItemPopUp/AddItemPopUp";
import AddOptionPopUp from "../../components/owner/Product/AddOptionPopUp/AddOptionPopUp";
import EditItemPopUp from "../../components/owner/Product/EditItemPopUp/EditItemPopUp";
import EnrolledItemList from "../../components/owner/Product/EnrolledItemList/EnrolledItemList";
import { currentY, userTokenState } from "../../store/common/user";
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
  const setCurrentY = useSetRecoilState(currentY);

  const calculatePopUpHeight = () => {
    setCurrentY(window.scrollY + window.innerHeight * 0.15);
  };

  const onClickAddItem = () => {
    calculatePopUpHeight();
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
      <EnrollItemWrapper onClick={onClickAddItem}>
        <img
          src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon3.png"
          alt=""
        />
        <p>상품 등록</p>
      </EnrollItemWrapper>
      <Title>기존에 등록한 상품</Title>
      <EnrolledItemList items={items} />
      {showAddPopUp && <AddItemPopUp />}
      {showEditPopUp && <EditItemPopUp />}
      {showOptionPopUp && <AddOptionPopUp />}
    </OwnerProductPageWrapper>
  );
};

const OwnerProductPageWrapper = styled.div`
  text-align: center;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EnrollItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  width: 10em;
  height: 10em;
  padding: 1em;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
    transition: all 0.3s ease-in;
  }
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-top: 1em;
`;

export default OwnerProductPage;
