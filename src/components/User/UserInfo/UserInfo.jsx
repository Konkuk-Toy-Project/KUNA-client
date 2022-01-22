import React from "react";
import { useState } from "react/cjs/react.development";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../../store/like";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 90vw;
  border: 1px solid black;
  margin: 1em;
  border-radius: 20px;
`;

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

const UserCertainInfo = styled.p`
  font-size: 1.5em;
  padding: 0.5em;
  padding-left: 8em;
  width: 5em;
`;

const UserInputWrapper = styled.div``;

const UserUnchangeableInfo = styled.p`
  border-style: none;
  border: 1px solid black;
  padding: 1em;
  width: 20em;
  border-radius: 10px;
`;

const UserInfoEditWrapper = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfoEditButton = styled.button`
  border: none;
  width: 8em;
  height: 4em;
  margin: 0 0.5em;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    transition: all 0.3s linear;
  }
`;

const UserInfo = () => {
  const user = useRecoilValue(userState);
  const [editPassword, setEditPassword] = useState(false);

  const onClickEditPassword = () => {
    setEditPassword(true);
  };

  const onClickEditButton = () => {
    alert("내용이 변경되었습니다.");
  };

  return (
    <UserInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>이름</UserCertainInfo>
        <UserInputWrapper>
          <UserUnchangeableInfo>{user.name}</UserUnchangeableInfo>
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>이메일</UserCertainInfo>
        <UserInputWrapper>
          <UserUnchangeableInfo>{user.email}</UserUnchangeableInfo>
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>핸드폰</UserCertainInfo>
        <UserInputWrapper>
          <UserUnchangeableInfo>{user.phone}</UserUnchangeableInfo>
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>생년월일</UserCertainInfo>
        <UserInputWrapper>
          <UserUnchangeableInfo>{user.birth}</UserUnchangeableInfo>
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserInfoEditWrapper>
        <UserInfoEditButton onClick={onClickEditPassword}>
          비밀번호 변경
        </UserInfoEditButton>
        <UserInfoEditButton onClick={onClickEditButton}>
          수정 완료
        </UserInfoEditButton>
      </UserInfoEditWrapper>
      {editPassword && <h1>Password</h1>}
    </UserInfoWrapper>
  );
};

export default UserInfo;
