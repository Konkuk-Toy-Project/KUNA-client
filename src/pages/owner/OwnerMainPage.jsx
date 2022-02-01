import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
  return (
    <OwnerMainPageWrapper>
      <Title>원하는 작업을 선택하세요</Title>
      <MenuCategoryWrapper>
        <PageLink to="/products">
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon3.png"
              alt=""
            />
            <p>상품 관리</p>
          </MenuCategory>
        </PageLink>
        <PageLink to="/coupons">
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon2.png"
              alt=""
            />
            <p>쿠폰 관리</p>
          </MenuCategory>
        </PageLink>
        <PageLink to="/answers">
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon1.png"
              alt=""
            />
            <p>Q&A 답변</p>
          </MenuCategory>
        </PageLink>
      </MenuCategoryWrapper>
    </OwnerMainPageWrapper>
  );
};

const OwnerMainPageWrapper = styled.div`
  text-align: center;
  height: 70vh;
`;

const Title = styled.p`
  font-size: 2em;
  margin: 2em 0 4em 0;
`;

const MenuCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const MenuCategory = styled.div`
  width: 15em;
  height: 15em;
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0em 0.2em;
  img {
    width: 6em;
    margin-bottom: 0.4em;
  }
  p {
    font-size: 18px;
    font-weight: 400;
  }
  &:hover {
    transition: all 0.3s ease-in;
    background-color: black;
    color: white;
  }
`;

const PageLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default MainPage;
