import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const INPUT_TYPE_PW = "password";
const INPUT_TYPE_TEXT = "text";
const ID = "email";
const PW = "password";

const LoginPage = () => {
  const [account, setAccount] = useState({ [ID]: "", [PW]: "" });
  const [isWrong, setIsWrong] = useState(false); // when user fail to login

  // changing input about id & pw
  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
    console.log(account);
  };

  const [pwInputType, setPwInputType] = useState(INPUT_TYPE_PW);

  // toogle - show/hide pw
  const showPw = () => {
    if (pwInputType === INPUT_TYPE_PW) setPwInputType(INPUT_TYPE_TEXT);
    else setPwInputType(INPUT_TYPE_PW);
  };

  // login btn click event
  const onSubmit = () => {
    sendAccount();
  };

  const sendAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/member/login",
        account
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginWrapper>
      <div>
        <Title>로그인</Title>

        <ul>
          <InputLi name="id_container">
            <Input
              type="text"
              id={ID}
              name={ID}
              placeholder="이메일"
              value={account[ID]}
              onChange={onChange}
            />
          </InputLi>
          <InputLi name="pw-container">
            <Input
              type={pwInputType}
              name={PW}
              placeholder="비밀번호"
              value={account[PW]}
              onChange={onChange}
            />
            <IconWrapper>
              <i onClick={showPw}>
                {pwInputType === INPUT_TYPE_PW ? "👀" : "🔒"}{" "}
              </i>
            </IconWrapper>
          </InputLi>
        </ul>
        {isWrong ? (
          <div id="warningStr">
            아이디 또는 비밀번호가 잘못 입력 되었습니다. 아이디와 비밀번호를
            정확히 입력해 주세요.
          </div>
        ) : null}
        <Button
          type="submit"
          onSubmit={onSubmit}
          disabled={account[ID] === "" || account[PW].length < 8}
        >
          로그인
        </Button>
      </div>

      <LinkUl>
        <LinkLi name="subPageLink">
          <Link to="/login/signUp" style={{ textDecoration: "none" }}>
            <LinkSpan id="signUp">회원가입 하기</LinkSpan>
          </Link>
        </LinkLi>
        <LinkLi>
          <Link to="/login/findAccount" style={{ textDecoration: "none" }}>
            <LinkSpan id="findIdPw">아이디·비밀번호 찾기</LinkSpan>
          </Link>
        </LinkLi>
      </LinkUl>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  margin: 0 auto;
  width: 590px;
  padding: 30px 0 90px 0;
`;

const Title = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin: 30px;
`;
const InputLi = styled.li`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #212b16;
  margin: 8px auto;
`;
const Input = styled.input`
  box-sizing: border-box;
  display: inline-block;
  width: 95%;
  height: 100%;
  font-size: 15px;
  padding-left: 5%;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  font-size: 17px;
  margin: 3px auto;
  background-color: #c76fd6;
  color: #192111;
  &:disabled {
    background-color: #d8d5dc;
    color: #a5a3a8;
  }
`;
const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
  height: 100%;
  margin: auto 3px;
`;

const LinkUl = styled.ul`
  padding: 12px 0px;
  text-align: center;
`;

const LinkLi = styled.li`
  display: inline;
  padding: 10px;
`;

const LinkSpan = styled.span`
  font-size: 14px;
  color: #6a6d75;
  text-decoration: underline;
`;

export default LoginPage;
