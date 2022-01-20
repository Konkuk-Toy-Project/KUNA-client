import React from "react";
import styled from "styled-components";

import ProfileBanner from "../components/User/ProfileBanner/ProfileBanner";

const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserPage = () => {
  return (
    <div>
      <UserMenuWrapper>
        <ProfileBanner />
      </UserMenuWrapper>
    </div>
  );
};

export default UserPage;
