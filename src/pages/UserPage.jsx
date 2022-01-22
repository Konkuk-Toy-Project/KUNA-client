import React from "react";
import styled from "styled-components";

import ProfileBanner from "../components/User/ProfileBanner/ProfileBanner";
import UserInfo from "../components/User/UserInfo/UserInfo";

const UserPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPage = () => {
  return (
    <UserPageWrapper>
      <ProfileBanner />
      <UserInfo />
    </UserPageWrapper>
  );
};

export default UserPage;
