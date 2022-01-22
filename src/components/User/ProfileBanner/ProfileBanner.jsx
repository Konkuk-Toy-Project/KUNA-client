import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/atoms";

const ProfileBannerWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90vw;
  height: 20vh;
  border: 1px solid black;
  margin: 1em;
  border-radius: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  width: 10em;
  height: 10em;
  border-radius: 50%;
  border: 1px solid black;
`;

const NameAndRankWrapper = styled.div`
  margin-left: 1em;
`;

const Name = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const Rank = styled.p`
  font-size: 24px;
`;

const UserMenus = styled.ul`
  width: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const UserMenu = styled.li`
  width: 6em;
  height: 6em;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
  line-height: 6em;
  margin: 0 1em;
`;

const ProfileBanner = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <ProfileBannerWrapper>
      <UserInfo>
        <UserImage src={userInfo.image} alt="User Image" />
        <NameAndRankWrapper>
          <Name>{userInfo.name}님</Name>
          <Rank>등급 : {userInfo.role}</Rank>
        </NameAndRankWrapper>
      </UserInfo>
      <UserMenus>
        <UserMenu>포인트</UserMenu>
        <UserMenu>쿠폰</UserMenu>
        <UserMenu>주문한 상품</UserMenu>
      </UserMenus>
    </ProfileBannerWrapper>
  );
};

export default ProfileBanner;
