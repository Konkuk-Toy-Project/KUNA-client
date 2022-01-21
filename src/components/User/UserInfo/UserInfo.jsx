import React from "react";
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

const UserCertainInfoInput = styled.input`
  border-style: none;
  border: 1px solid black;
  padding: 1em;
  width: 20em;
  border-radius: 10px;
`;

const UserInfo = () => {
  const user = useRecoilValue(userState);

  return (
    <UserInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>이름</UserCertainInfo>
        <UserInputWrapper>
          <UserCertainInfoInput type="text" value={user.name} />
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>이메일</UserCertainInfo>
        <UserInputWrapper>
          <UserCertainInfoInput type="text" value={user.email} />
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>핸드폰</UserCertainInfo>
        <UserInputWrapper>
          <UserCertainInfoInput type="text" value={user.phone} />
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <UserCertainInfoWrapper>
        <UserCertainInfo>생년월일</UserCertainInfo>
        <UserInputWrapper>
          <UserCertainInfoInput type="text" value={user.birth} />
        </UserInputWrapper>
      </UserCertainInfoWrapper>
      <button>수정 완료</button>
    </UserInfoWrapper>
  );
};

export default UserInfo;
