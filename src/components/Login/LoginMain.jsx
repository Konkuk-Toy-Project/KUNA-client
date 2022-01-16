import React, { useState } from "react";

const INPUT_TYPE_PW = "password";
const INPUT_TYPE_TEXT = "text";

const LoginMain = () => {
  const [account, setAccount] = useState({ id: "", pw: "" });
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
            id="id"
            name="id"
            placeholder="이메일"
            value={account.id}
            onChange={onChange}
          />
        </label>
      </div>
      <div name="pw-container">
        <label>
          <input
            type={pwInputType}
            name="pw"
            placeholder="비밀번호"
            value={account.pw}
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
        <span id="signIn">회원가입하기</span>
        <span id="findIdPw">아이디/비밀번호 찾기</span>
      </div>
    </div>
  );
};

export default LoginMain;
