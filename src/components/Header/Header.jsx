import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const ShortcutMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
`;

const HomeIcon = styled.img`
  cursor: pointer;
  width: 8em;
`;

const SearchBar = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 0.2em 1em;
  border-radius: 4em;
  width: 12em;
  margin: 0 2em;
`;

const SearchBarInput = styled.input`
  font-size: 16px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const MenuCategories = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuCategory = styled.li`
  width: 3.5em;
  height: 3.5em;
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0em 0.2em;
  img {
    width: 2em;
    margin-bottom: 0.4em;
  }
  p {
    font-size: 10px;
    font-weight: 600;
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

const Header = () => {
  return (
    <HeaderWrapper>
      <ShortcutMenuWrapper>
        <HomeIcon
          src="https://img.sonyunara.com/2021/asset/pc/img/common/header/renual_logo_pc.png"
          alt="Home Icon"
        />
        <SearchBar>
          <SearchBarInput type="text" />
          <SearchIcon type="button">🔎</SearchIcon>
        </SearchBar>
        <MenuCategories>
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon3.png"
              alt=""
            />
            <p>장바구니</p>
          </MenuCategory>
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon2.png"
              alt=""
            />
            <p>찜목록</p>
          </MenuCategory>
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon1.png"
              alt=""
            />
            <p>로그인</p>
          </MenuCategory>
          <MenuCategory>
            <img
              src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon5.png"
              alt=""
            />
            <p>프로필</p>
          </MenuCategory>
        </MenuCategories>
      </ShortcutMenuWrapper>
      <PageMenus>
        <PageMenu>아우터</PageMenu>
        <PageMenu>상의</PageMenu>
        <PageMenu>하의</PageMenu>
        <PageMenu>신발</PageMenu>
      </PageMenus>
    </HeaderWrapper>
  );
};

export default Header;
