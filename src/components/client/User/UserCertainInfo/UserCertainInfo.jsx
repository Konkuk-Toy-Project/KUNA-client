import React from "react";
import styled from "styled-components";

const UserCertainInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const UserInfoTitle = styled.p`
  font-size: 1.5em;
  padding: 0.5em;
  text-align: end;
  width: 4em;
  font-size: 32px;
`;

const UserInfo = styled.p`
  border-style: none;
  border-bottom: 1px solid black;
  padding: 0.5em;
  margin: 0.2em 0;
  width: 15em;
  text-align: center;
  font-size: 36px;
  font-weight: 400;
`;

const UserCertainInfo = ({ title, info }) => {
  return (
    <UserCertainInfoWrapper>
      <UserInfoTitle>{title}</UserInfoTitle>
      <UserInfo>{info}</UserInfo>
    </UserCertainInfoWrapper>
  );
};

export default UserCertainInfo;
