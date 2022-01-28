import React from "react";
import { useState } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY, passwordPopUpState } from "../../../store/atoms";
import CloseButton from "../CloseButton/CloseButton";

const PasswordPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 10vw;
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
  const scrollY = useRecoilValue(currentY);

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onClickCancel = () => {
    setEditPassword(false);
  };

  const isValidPassword = (inputValue) => {
    return (
      inputValue !== "" &&
      (inputValue.match(/[a-z]+?/) === null ||
        inputValue.match(/[0-9]+?/) === null ||
        inputValue.match(/[`~!@#$%^&*|\\;:?]+?/) === null)
    );
  };

  const onClickChangePassword = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요");
    }
    if (isValidPassword(password)) {
      return alert(
        "비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다."
      );
    }
    setEditPassword(false);
    return alert("변경 되었습니다.");
  };

  return (
    <PasswordPopUpWrapper top={scrollY}>
      <CloseButton onClick={onClickCancel} />
      <h1>변경할 비밀번호</h1>
      <input onChange={onChangePassword} type="password" />
      <h1>변경할 비밀번호 확인</h1>
      <input onChange={onChangeConfirmPassword} type="password" />
      <button onClick={onClickChangePassword}>변경하기</button>
    </PasswordPopUpWrapper>
  );
};

export default PasswordPopUp;
