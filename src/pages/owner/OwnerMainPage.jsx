import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
  return (
    <OwnerMainPageWrapper>
      <PageLink to="/enroll">
        <MenuCategory>
          <img
            src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon3.png"
            alt=""
          />
          <p>상품 등록</p>
        </MenuCategory>
      </PageLink>
      <PageLink to="/coupons">
        <MenuCategory>
          <img
            src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon2.png"
            alt=""
          />
          <p>쿠폰 등록</p>
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
    </OwnerMainPageWrapper>
  );
};

const OwnerMainPageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 80vh;
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

const PageMenus = styled.ul`
  display: flex;
  margin: 1em 0;
`;

const PageMenu = styled.li`
  padding: 1em;
  cursor: pointer;
  margin: 0 1em;
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
