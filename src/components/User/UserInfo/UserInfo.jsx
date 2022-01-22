import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { passwordPopUpState, userState } from "../../../store/atoms";
import PasswordPopUp from "../PasswordPopUp/PasswordPopUp";
import UserCertainInfo from "../UserCertainInfo/UserCertainInfo";

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
  const [editPassword, setEditPassword] = useRecoilState(passwordPopUpState);

  const onClickEditPassword = () => {
    setEditPassword(true);
  };

  return (
    <UserInfoWrapper>
      <UserCertainInfo title="이름" info={user.name} />
      <UserCertainInfo title="이메일" info={user.email} />
      <UserCertainInfo title="핸드폰" info={user.phone} />
      <UserCertainInfo title="생년월일" info={user.birth} />
      <UserInfoEditWrapper>
        <UserInfoEditButton onClick={onClickEditPassword}>
          비밀번호 변경
        </UserInfoEditButton>
      </UserInfoEditWrapper>
      {editPassword && <PasswordPopUp />}
    </UserInfoWrapper>
  );
};

export default UserInfo;
