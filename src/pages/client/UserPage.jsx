import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileBanner from "../../components/client/User/ProfileBanner/ProfileBanner";
import UserInfo from "../../components/client/User/UserInfo/UserInfo";
import { userTokenState } from "../../store/common/user";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const userToken = useRecoilValue(userTokenState);

  const getUserInfo = useCallback(async () => {
    const data = await axios
      .get("http://localhost:8080/member/info", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    setUserInfo(data);
  }, [userToken]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <UserPageWrapper>
      <HelmetProvider>
        <Helmet>
          <title>KUNA | 프로필</title>
        </Helmet>
      </HelmetProvider>
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
