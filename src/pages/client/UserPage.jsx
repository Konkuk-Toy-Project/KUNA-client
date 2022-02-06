import React from "react";
import styled from "styled-components";
import ProfileBanner from "../../components/client/User/ProfileBanner/ProfileBanner";
import UserInfo from "../../components/client/User/UserInfo/UserInfo";

const UserPage = () => {
  return (
    <UserPageWrapper>
      <ProfileBanner />
      <UserInfo />
    </UserPageWrapper>
  );
};

const UserPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default UserPage;
