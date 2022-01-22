import React from "react";
import { useState } from "react/cjs/react.development";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { passwordPopUpState } from "../../../store/atoms";

const PasswordPopUpWrapper = styled.form`
  width: 80vw;
  height: 60vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PasswordPopUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setEditPassword = useSetRecoilState(passwordPopUpState);

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onClickCancel = () => {
    setEditPassword(false);
  };

  const onClickChangePassword = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setEditPassword(false);
      return alert("변경 되었습니다.");
    }
    alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요");
  };

  return (
    <PasswordPopUpWrapper>
      <h1>변경할 비밀번호</h1>
      <input onChange={onChangePassword} type="password" />
      <h1>변경할 비밀번호 확인</h1>
      <input onChange={onChangeConfirmPassword} type="password" />
      <button onClick={onClickCancel}>취소하기</button>
      <button onClick={onClickChangePassword}>변경하기</button>
    </PasswordPopUpWrapper>
  );
};

export default PasswordPopUp;
