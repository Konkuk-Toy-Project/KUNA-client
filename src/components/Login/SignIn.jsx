import React, { useState } from "react";
import BirthSelectBox from "./BirthSelectBox";
import PhoneInput from "./PhoneInput";

const TYPE_MANUALLY = "직접입력";
const emailArr = [TYPE_MANUALLY, "naver.com", "gmail.com", "daum.net"];

const YEAR_START = 1920;
const YEAR_END = 2022;

const ID = "id";
const EMAIL_ADDR = "emailAddr";
const PW = "pw";
const PW_CHECK = "pwCheck";
const NAME = "name";
const PH_FIRST = "phone_first";
const PH_MID = "phone_mid";
const PH_LAST = "phone_last";
const BIRTH_Y = "birth_year";
const BIRTH_M = "birth_month";
const BIRTH_D = "birth_day";

const SignIn = () => {
  const [info, setInfo] = useState({
    [ID]: "",
    [EMAIL_ADDR]: "",
    [PW]: "",
    [PW_CHECK]: "",
    [NAME]: "",
    [PH_FIRST]: "010",
    [PH_MID]: "",
    [PH_LAST]: "",
    [BIRTH_Y]: "",
    [BIRTH_M]: "",
    [BIRTH_D]: "",
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
      setInfo({ ...info, [EMAIL_ADDR]: value });
    } else {
      setIsEmailTypingMode(true);
      setInfo({ ...info, [EMAIL_ADDR]: "" });
    }
  };

  return (
    <div>
      <ul id="info-container">
        <li id="id-container">
          <p>아이디(이메일)</p>
          <input
            type="text"
            id={ID}
            name={ID}
            value={info[ID]}
            onChange={onChange}
          />
          @
          <input
            type="text"
            name={EMAIL_ADDR}
            value={info[EMAIL_ADDR]}
            onChange={onChange}
            disabled={isEmailTypingMode ? false : true}
          />
          <select onChange={onSelectEmail}>
            {emailArr.map((email, idx) => (
              <option key={idx}>{email}</option>
            ))}
          </select>
          <button id="idDupCheck">중복확인</button>
        </li>

        <li name="pw-container">
          <p>비밀번호</p>
          <input
            name={PW}
            type="password"
            value={info[PW]}
            onChange={onChange}
            placeholder="8자이상, 영문자, 숫자, 특수문자 조합"
          />

          {info[PW] !== "" &&
          (info[PW].match(/[a-z]+?/) === null ||
            info[PW].match(/[0-9]+?/) === null ||
            info[PW].match(/[`~!@#$%^&*|\\\'\";:\/?]+?/) === null) ? (
            <div id="warningPw">
              비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다.
            </div>
          ) : null}
        </li>

        <li name="pwCheck-container">
          <p>비밀번호 확인</p>
          <input
            type="password"
            name={PW_CHECK}
            placeholder="비밀번호 확인"
            value={info[PW_CHECK]}
            onChange={onChange}
          />
          <span>
            {info[PW] !== "" && info[PW] === info[PW_CHECK] ? "🟢" : "🔴"}
          </span>
        </li>

        <li id="name-container">
          <p>이름</p>
          <input
            type="text"
            name={NAME}
            placeholder="이름"
            onChange={onChange}
          />
        </li>
        <li id="phone-container">
          <p>휴대전화</p>
          <PhoneInput name={[PH_FIRST, PH_MID, PH_LAST]} onChange={onChange} />
        </li>
        <li id="birth-container">
          <label id="birth-label">생년월일</label>
          <BirthSelectBox
            name={BIRTH_Y}
            start={YEAR_START}
            end={YEAR_END}
            onChange={onChange}
          />
          년
          <BirthSelectBox
            name={BIRTH_M}
            start={1}
            end={12}
            onChange={onChange}
          />
          월
          <BirthSelectBox
            name={BIRTH_D}
            start={1}
            end={31}
            onChange={onChange}
          />
          일
        </li>
      </ul>
      <div id="signInBtn-container">
        <button id="signIn" onSubmit={onSignIn}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignIn;
