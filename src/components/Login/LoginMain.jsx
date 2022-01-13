import React, { useState } from "react";

const LoginMain = () => {
  const [account, setAccount] = useState({ id: "", pw: "" });
  const [isWrong, setIsWrong] = useState(false);
  const onAccontChange = (e) => {
    setAccount({ ...account, [e.target.id]: e.target.value });
    console.log(account);
  };
  const onSubmit = () => {};
  const showPw = () => {};

  const { id, pw } = account;

  return (
    <div>
      <div name="id_container">
        <label>
          <input
            type="text"
            id="id"
            placeholder="이메일"
            value={account.id}
            onChange={onAccontChange}
          />
        </label>
      </div>

      <div name="pw_container">
        <label>
          <input
            type="password"
            id="pw"
            placeholder="비밀번호"
            value={account.pw}
            onChange={onAccontChange}
          />
          <i onClick={showPw}>👀</i>
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
        disabled={id == "" || pw.length < 8}
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
