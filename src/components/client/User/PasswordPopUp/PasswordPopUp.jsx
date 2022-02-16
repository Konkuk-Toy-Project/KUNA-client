import axios from "axios";
import React from "react";
import { useState } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { passwordPopUpState } from "../../../../store/client/user";
import { currentY, userTokenState } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const PasswordPopUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setEditPassword = useSetRecoilState(passwordPopUpState);
  const scrollY = useRecoilValue(currentY);
  const userToken = useRecoilValue(userTokenState);

  const onChange = (handleState) => (event) => {
    handleState(event.target.value);
  };

  const inValidPassword = (inputValue) => {
    if (inputValue === "") return true;
    return (
      inputValue !== "" &&
      (inputValue.match(/[a-z]+?/) === null ||
        inputValue.match(/[0-9]+?/) === null ||
        inputValue.match(/[`~!@#$%^&*|\\;:?]+?/) === null)
    );
  };

  const changePassword = async () => {
    await axios
      .post("http://localhost:8080/member/change/password", {
        headers: { Authorization: `Bearer ${userToken}` },
        newPassword: password,
      })
      .then((response) => response.data);
  };

  const onClickChangePassword = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요");
    }
    if (inValidPassword(password)) {
      return alert(
        "비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다."
      );
    }
    if (window.confirm("비밀번호를 등록하시겠습니까?")) {
      changePassword();
      setEditPassword(false);
      alert("변경 되었습니다.");
    }
  };

  return (
    <PasswordPopUpWrapper top={scrollY}>
      <CloseButton onClick={setEditPassword} />
      <h1>변경할 비밀번호</h1>
      <input onChange={onChange(setPassword)} type="password" />
      <h1>변경할 비밀번호 확인</h1>
      <input onChange={onChange(setConfirmPassword)} type="password" />
      <button onClick={onClickChangePassword}>변경하기</button>
    </PasswordPopUpWrapper>
  );
};

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

export default PasswordPopUp;
