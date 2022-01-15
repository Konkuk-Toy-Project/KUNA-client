import React, { useState } from "react";
import BirthSelectBox from "./BirthSelectBox";

const TYPE_MANUALLY = "직접입력";
const emailArr = [TYPE_MANUALLY, "naver.com", "gmail.com", "daum.net"];
const phoneFirstArr = ["010", "011", "016"];
const YEAR_START = 1920;
const YEAR_END = 2022;

const SignIn = () => {
  const [info, setInfo] = useState({
    id: "",
    emailAddr: "",
    pw: "",
    pwCheck: "",
    name: "",
    phone_first: "",
    phone_mid: "",
    phone_last: "",
    birth_year: "",
    birth_month: "",
    birth_day: "",
  });

  const [isEmailTypingMode, setIsEmailTypingMode] = useState(true);

  const onSignIn = () => {};
  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  };

  const onSelectEmail = (e) => {
    const value = e.target.value;
    if (value !== TYPE_MANUALLY) {
      setIsEmailTypingMode(false);
      setInfo({ ...info, ["emailAddr"]: value });
    } else {
      setIsEmailTypingMode(true);
      setInfo({ ...info, ["emailAddr"]: "" });
    }
  };

  return (
    <div>
      <div id="id-container">
        <label id="id-label">
          <span>아이디(이메일)</span>
          <input
            type="text"
            id="id"
            name="id"
            value={info.id}
            onChange={onChange}
          />
          @
          <input
            type="text"
            name="emailAddr"
            value={info.emailAddr}
            onChange={onChange}
            disabled={isEmailTypingMode ? false : true}
          />
          <select onChange={onSelectEmail}>
            {emailArr.map((email, idx) => (
              <option key={idx}>{email}</option>
            ))}
          </select>
          <button id="idDupCheck">중복확인</button>
        </label>
      </div>

      <div name="pw-container">
        <span>비밀번호</span>
        <label>
          <input
            name="pw"
            type="password"
            value={info.pw}
            onChange={onChange}
            placeholder="8자이상, 영문자, 숫자, 특수문자 조합"
          />
        </label>
        {info.pw !== "" &&
        (info.pw.match(/[a-z]+?/) === null ||
          info.pw.match(/[0-9]+?/) === null ||
          info.pw.match(/[`~!@#$%^&*|\\\'\";:\/?]+?/) === null) ? (
          <div id="warningPw">
            비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다.
          </div>
        ) : null}
      </div>

      <div name="pwCheck-container">
        <span>비밀번호 확인</span>
        <label>
          <input
            type="password"
            name="pwCheck"
            placeholder="비밀번호 확인"
            value={info.pwCheck}
            onChange={onChange}
          />
          <span>
            {info.pw !== "" && info.pw === info.pwCheck ? "🟢" : "🔴"}
          </span>
        </label>
      </div>

      <div id="name-container">
        <label id="name-label">
          <span>이름</span>
          <input
            type="text"
            name="name"
            placeholder="이름"
            onChange={onChange}
          />
        </label>
      </div>
      <div id="phone-container">
        <select name="phone_first" id="phone-first" onChange={onChange}>
          {phoneFirstArr.map((phoneFirst) => (
            <option key={"p_" + phoneFirst}>{phoneFirst}</option>
          ))}
        </select>
        -
        <input
          id="phoneMiddle"
          name="phone_mid"
          onChange={onChange}
          type="text"
          maxLength={4}
        />
        -
        <input
          id="phoneLast"
          name="phone_last"
          onChange={onChange}
          type="text"
          maxLength={4}
        />
      </div>
      <div id="birth-container">
        <label id="birth-label">
          <BirthSelectBox
            name="birth_year"
            start={YEAR_START}
            end={YEAR_END}
            onChange={onChange}
          />
          년
          <BirthSelectBox
            name="birth_month"
            start={1}
            end={12}
            onChange={onChange}
          />
          월
          <BirthSelectBox
            name="birth_day"
            start={1}
            end={31}
            onChange={onChange}
          />
          일
        </label>
      </div>
      <div id="signInBtn-container">
        <button id="signIn" onSubmit={onSignIn}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignIn;
