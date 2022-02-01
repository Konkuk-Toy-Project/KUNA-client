import React from "react";
import styled from "styled-components";

const UserCertainInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80vw;
  padding: 2em;
  border: 1px solid black;
  margin-top: 1em;
  border-radius: 10px;
`;

const UserInfoTitle = styled.p`
  font-size: 1.5em;
  padding: 0.5em;
  padding-left: 8em;
  width: 5em;
`;

const UserInfo = styled.p`
  border-style: none;
  border: 1px solid black;
  padding: 1em;
  width: 20em;
  border-radius: 10px;
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
