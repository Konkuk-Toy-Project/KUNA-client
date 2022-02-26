import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userTokenState } from "../../../store/common/user";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserToken([]);
    navigate("/");
    window.location.reload();
  };

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickSearch = () => {
    navigate(`/search/${searchValue}`);
  };

  const onClickCategory = (choice) => {
    if (userToken.length > 0) {
      return navigate(`/${choice}`);
    }
    if (
      window.confirm(
        "로그인을 해야 사용할 수 있는 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
      )
    ) {
      navigate("/login");
    }
  };

  return (
    <HeaderWrapper>
      <ShortcutMenuWrapper>
        <PageLink to="/">
          <HomeIcon
            src="https://user-images.githubusercontent.com/72953316/155157249-3beecbf4-d257-4070-8035-91bc65afd18f.png"
            alt="Home Icon"
          />
        </PageLink>
        <SearchBar>
          <SearchBarInput onChange={onChangeSearch} type="text" />
          <SearchIcon onClick={onClickSearch} type="button">
            🔎
          </SearchIcon>
        </SearchBar>
        <MenuCategories>
          <MenuIcon onClick={() => onClickCategory("basket")}>
            <MenuCategory>
              <img
                src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon3.png"
                alt=""
              />
              <p>장바구니</p>
            </MenuCategory>
          </MenuIcon>
          <MenuIcon onClick={() => onClickCategory("like")}>
            <MenuCategory>
              <img
                src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon2.png"
                alt=""
              />
              <p>찜목록</p>
            </MenuCategory>
          </MenuIcon>
          {!userToken.length ? (
            <MenuIcon onClick={() => navigate("/login")}>
              <MenuCategory>
                <img
                  src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon1.png"
                  alt=""
                />
                <p>로그인</p>
              </MenuCategory>
            </MenuIcon>
          ) : (
            <MenuIcon onClick={onClickLogout}>
              <MenuCategory>
                <img
                  src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon1.png"
                  alt=""
                />
                <p>로그아웃</p>
              </MenuCategory>
            </MenuIcon>
          )}
          <MenuIcon onClick={() => onClickCategory("user")}>
            <MenuCategory>
              <img
                src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon5.png"
                alt=""
              />
              <p>프로필</p>
            </MenuCategory>
          </MenuIcon>
        </MenuCategories>
      </ShortcutMenuWrapper>
      <PageMenus>
        <PageLink to="category/top">
          <PageMenu>상의</PageMenu>
        </PageLink>
        <PageLink to="category/pants">
          <PageMenu>하의</PageMenu>
        </PageLink>
        <PageLink to="category/shoes">
          <PageMenu>신발</PageMenu>
        </PageLink>
      </PageMenus>
    </HeaderWrapper>
  );
};

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

const PageLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const MenuIcon = styled.div`
  color: black;
  text-decoration: none;
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

export default Header;
