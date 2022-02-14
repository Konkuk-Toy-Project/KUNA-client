import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OwnerHeader = () => {
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
        <button onClick={() => window.location.reload()}>로그아웃</button>
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

export default OwnerHeader;
