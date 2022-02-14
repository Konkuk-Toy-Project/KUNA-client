import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileBanner from "../../components/client/User/ProfileBanner/ProfileBanner";
import UserInfo from "../../components/client/User/UserInfo/UserInfo";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    const data = await axios
      .get("http://localhost:8080/member/info")
      .then((response) => response.data);
    setUserInfo(data);
    console.log(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserPageWrapper>
      <ProfileBanner userInfo={userInfo} />
      <UserInfo user={userInfo} />
    </UserPageWrapper>
  );
};

const UserPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default UserPage;
