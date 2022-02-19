import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { passwordPopUpState } from "../../../../store/client/user";
import { currentY } from "../../../../store/common/user";
import PasswordPopUp from "../PasswordPopUp/PasswordPopUp";
import UserCertainInfo from "../UserCertainInfo/UserCertainInfo";

const UserInfo = ({ user }) => {
  const [editPassword, setEditPassword] = useRecoilState(passwordPopUpState);
  const setCurrentY = useSetRecoilState(currentY);

  const calculatePopUpHeight = () => {
    setCurrentY(window.scrollY + window.innerHeight * 0.15);
  };

  const onClickEditPassword = () => {
    calculatePopUpHeight();
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

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 60em;
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
  width: 12em;
  font-size: 16px;
  height: 4em;
  margin: 3em 0 1em 0;
  background-color: #ab46bc;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #d85aee;
    transform: scale(1.1);
    transition: all 0.3s linear;
  }
`;

export default UserInfo;
