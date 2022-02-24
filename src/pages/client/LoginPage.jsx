import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isClientState, userTokenState } from "../../store/common/user";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import ReactHelmet from "../../components/common/ReactHelmet/ReactHelmet";

const INPUT_TYPE_PW = "password";
const INPUT_TYPE_TEXT = "text";
const ID = "email";
const PW = "password";

// 추가할 사항
// 1. 사용자 계정이 아닌 경우 처리

const LoginPage = () => {
  const [account, setAccount] = useState({ [ID]: "", [PW]: "" });
  const [isWrong, setIsWrong] = useState(false); // when user fail to login
  const setUserToken = useSetRecoilState(userTokenState);
  const setIsClientState = useSetRecoilState(isClientState);
  const navigate = useNavigate();

  // changing input about id & pw
  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
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
      const data = await response.data;
      setUserToken(data.token);

      if (data.role === "admin") setIsClientState(false);
      else navigate("/");
    } catch (error) {
      if (error.response) {
        switch (error.response.data.errorCode) {
          case "M003":
          case "M003":
          case "M004":
          case "M005":
            setIsWrong(true);
            return;
        }
      }

      alert("오류가 발생하였습니다. 다시 시도해주세요");
      window.location.reload();
    }
  };
  useEffect(() => setIsWrong(false), [account]);
  return (
    <LoginWrapper>
      <ReactHelmet title={"로그인"} />
      <div>
        <PageTitle title={"로그인"} />

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
            <WrongAlertP style={{ whiteSpace: "pre-line" }}>
              {
                " 아이디 또는 비밀번호가 잘못 입력 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
              }
            </WrongAlertP>
          </div>
        ) : null}
        <Button
          type="submit"
          onClick={onSubmit}
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

const InputLi = styled.li`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #212b16;
  margin: 8px auto;
  font-size: 17px;
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
  font-size: 20px;
  margin: 3px auto;
  background-color: #b44bd1;
  color: #e7e8e6;
  font-weight: bold;
  &:disabled {
    background-color: #d8d5dc;
    color: #a5a3a8;
  }
  &:hover {
    background-color: #790e8b;
    &:disabled {
      background-color: #d8d5dc;
      color: #a5a3a8;
    }
  }
  cursor: pointer;
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
const WrongAlertP = styled.p`
  padding: 10px 5px;
  line-height: 150%;
  font-size: 13px;
  color: #494949;
`;

export default LoginPage;
