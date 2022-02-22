import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isClientState, userTokenState } from "../../../store/common/user";

const OwnerHeader = () => {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const setIsClient = useSetRecoilState(isClientState);
  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserToken([]);
    setIsClient(true);
    navigate("/");
    window.location.reload();
  };

  const isValidLogin = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/member/isLogin`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    if (!data) {
      setUserToken([]);
    }
  }, [setUserToken, userToken]);

  useEffect(() => {
    isValidLogin();
  }, [isValidLogin]);

  return (
    <HeaderWrapper>
      <ShortcutMenuWrapper>
        <div>
          <PageLink to="/">
            <HomeIcon
              src="https://img.sonyunara.com/2021/asset/pc/img/common/header/renual_logo_pc.png"
              alt="Home Icon"
            />
            <h1>관리자 페이지</h1>
          </PageLink>
        </div>
        <LogoutButton onClick={onClickLogout}>
          <img
            src="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon1.png"
            alt=""
          />
          로그아웃
        </LogoutButton>
      </ShortcutMenuWrapper>
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
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  text-align: center;
`;

const PageLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const HomeIcon = styled.img`
  cursor: pointer;
  width: 8em;
`;

const LogoutButton = styled.button`
  width: 6em;
  height: 6em;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 2px solid black;
  padding: 1em;
  outline: none;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  img {
    width: 3em;
  }
  &:hover {
    background-color: black;
    transition: all 0.3s ease-in;
    color: white;
  }
`;

export default OwnerHeader;
