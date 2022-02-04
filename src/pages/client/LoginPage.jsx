import React, { useState } from "react";
import { Link } from "react-router-dom";

const INPUT_TYPE_PW = "password";
const INPUT_TYPE_TEXT = "text";
const ID = "id";
const PW = "pw";

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
  const onSubmit = () => {};

  const { id, pw } = account;

  return (
    <div>
      <div name="id_container">
        <label>
          <input
            type="text"
            id={ID}
            name={ID}
            placeholder="이메일"
            value={account[ID]}
            onChange={onChange}
          />
        </label>
      </div>
      <div name="pw-container">
        <label>
          <input
            type={pwInputType}
            name={PW}
            placeholder="비밀번호"
            value={account[PW]}
            onChange={onChange}
          />
          <i onClick={showPw}>{pwInputType === INPUT_TYPE_PW ? "👀" : "🔒"} </i>
        </label>
      </div>
      {isWrong ? (
        <div id="warningStr">
          아이디 또는 비밀번호가 잘못 입력 되었습니다. 아이디와 비밀번호를
          정확히 입력해 주세요.
        </div>
      ) : null}
      <button
        id="loginBtn"
        type="submit"
        onSubmit={onSubmit}
        disabled={id === "" || pw.length < 8}
      >
        로그인
      </button>
      <div id="subPageLink-containter">
        <Link to="/signIn">
          <span id="signIn">회원가입하기</span>
        </Link>
        <Link to="/findIdPw">
          <span id="findIdPw">아이디/비밀번호 찾기</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
