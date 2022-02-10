import React, { useCallback, useState } from "react";
import BirthSelectBox from "../../components/client/Login/BirthSelectBox";
import PhoneInput from "../../components/client/Login/PhoneInput";
import { useNavigate } from "react-router-dom";

import axios from "axios";

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

// 추후 리팩토링 필요 - 기능 컴포넌트 화

const SignUpPage = () => {
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
  const [loading, setLoading] = useState(false);
  const [emailDupLoading, setEmailDupLoading] = useState(false);
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [isEmailDupChecked, setIsEmailDupChecked] = useState(false);
  const [isEmailTypingMode, setIsEmailTypingMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const onSignIn = () => {
    if (!isProperInfo) {
      if (Object.values(info).filter((val) => val === "").length > 0)
        alert("모든 정보를 입력해주세요.");
      else if (!isEmailDupChecked) alert("이메일 중복체크가 필요합니다.");
      else if (!isEmailUnique) alert("중복된 이메일입니다.");
      else if (!isProperPw()) alert("비밀번호 형식에 맞지 않습니다.");
      else if (info[PW] !== info["pwCheck"])
        alert("비밀번호와 비밀번호 확인이 불일치합니다.");
      else if (info[PH_MID].length !== 4 || info[PH_LAST].length !== 4)
        alert("전화번호 자리수를 확인해주세요(예시 : 010-1234-0000)");

      return;
    }
    // 서버로 전송
    SendInfos();
  };
  const SendInfos = async () => {
    console.log({
      email: info[ID] + "@" + info[EMAIL_ADDR],
      password: info[PW],
      name: info[NAME],
      phone: info[PH_FIRST] + info[PH_MID] + info[PH_LAST],
      birth: info[BIRTH_Y] + info[BIRTH_M] + info[BIRTH_D],
      role: isAdmin ? "admin" : "user",
    });
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/member/signup", {
        email: info[ID] + "@" + info[EMAIL_ADDR],
        password: info[PW],
        name: info[NAME],
        phone: info[PH_FIRST] + info[PH_MID] + info[PH_LAST],
        birth: info[BIRTH_Y] + info[BIRTH_M] + info[BIRTH_D],
        role: isAdmin ? "admin" : "user",
      });
      setLoading(false);

      if (
        response.data.hasOwnProperty("memberId") &&
        response.data.hasOwnProperty("role") &&
        response.data.role === "user"
      )
        navigate("/login/signUp/complete");
      // 관리자의 경우는?
    } catch (err) {
      alert("오류가 발생하였습니다. 다시 시도해주세요");
      window.location.reload();
    }
  };

  const isProperInfo = () => {
    return (
      isEmailDupChecked ||
      isEmailUnique ||
      isProperPw ||
      info[PW] === info["pwCheck"] ||
      info[PH_MID].length === 4 ||
      info[PH_LAST].length === 4 ||
      Object.values(info).filter((val) => val === "").length === 0
    );
  };

  //아이디 중복체크 했는지, 비밀번호 부합하는지, 칸 다 채웠는지 };
  const onChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === PH_MID || name === PH_LAST)
      value = value.toString().replace(/[^0-9]/gi, "");

    if ((name === ID || name === EMAIL_ADDR) && isEmailDupChecked) {
      setIsEmailDupChecked(false);
      setIsEmailUnique(false);
    }

    setInfo({ ...info, [name]: value });
  };

  // 이메일 관련
  const onSelectEmail = (e) => {
    if (isEmailDupChecked) {
      setIsEmailDupChecked(false);
      setIsEmailUnique(false);
    }
    const value = e.target.value;
    if (value !== TYPE_MANUALLY) {
      setIsEmailTypingMode(false);
      setInfo({ ...info, [EMAIL_ADDR]: value });
    } else {
      setIsEmailTypingMode(true);
      setInfo({ ...info, [EMAIL_ADDR]: "" });
    }
  };

  const onEmailDupClick = () => {
    if (info[ID] === "" || info[EMAIL_ADDR] === "") {
      alert(`${info[ID] === "" ? "아이디" : "이메일 주소"}를 입력해주세요`);
      return;
    }
    setIsEmailDupChecked(true);
    CheckEmailDup();
  };

  const onCheckAdmin = () => {
    setIsAdmin((cur) => !cur);
  };

  const CheckEmailDup = useCallback(async () => {
    setEmailDupLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/member/duplication/email",
        { email: info[ID] + "@" + info[EMAIL_ADDR] }
      );
      setIsEmailUnique(!response.data.isDuplication);
    } catch (err) {
      console.log(err);
      alert("오류가 발생하였습니다. 다시 시도해주세요");
      window.location.reload();
    }
    setEmailDupLoading(false);
  }, [isEmailDupChecked]);

  // 비밀번호 관련
  const isProperPw = useCallback(() => {
    return (
      !(
        info[PW].match(/[a-z]+?/) === null ||
        info[PW].match(/[0-9]+?/) === null ||
        info[PW].match(/[`~!@#$%^&*|\\\'\";:\/?]+?/) === null
      ) && info[PW].length >= 8
    );
  }, [info]);
  console.log(isAdmin);
  return (
    <div>
      {/* 로딩중 샘플 */}
      {loading ? <div>로딩중</div> : null}
      <ul id="info-container">
        <li id="id-container">
          <label>아이디(이메일)</label>
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
          <button onClick={onEmailDupClick} disabled={isEmailUnique}>
            중복확인
          </button>
          {/* 로딩상태 추가해주기---------------------------------------------------- */}
          <p>
            {!isEmailDupChecked
              ? "   "
              : emailDupLoading
              ? "확인 중..."
              : isEmailUnique
              ? "사용가능한 이메일입니다✅"
              : "중복된 이메일입니다"}
          </p>
        </li>

        <li name="pw-container">
          <label>비밀번호</label>
          <input
            name={PW}
            type="password"
            value={info[PW]}
            onChange={onChange}
            placeholder="8자이상, 영문자, 숫자, 특수문자 조합"
          />

          {info[PW] !== "" && !isProperPw() ? (
            <div id="warningPw">
              비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다.
            </div>
          ) : null}
        </li>

        <li name="pwCheck-container">
          <label>비밀번호 확인</label>
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
          <label>이름</label>
          <input
            type="text"
            name={NAME}
            placeholder="이름"
            onChange={onChange}
          />
        </li>
        <li id="phone-container">
          <label>휴대전화</label>
          <PhoneInput
            name={[PH_FIRST, PH_MID, PH_LAST]}
            data={info}
            onChange={onChange}
          />
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
      <div>
        <p>관리자이신가요? </p>
        <input type="checkbox" checked={isAdmin} onChange={onCheckAdmin} />
      </div>
      <div id="signInBtn-container">
        <button id="signIn" onClick={onSignIn}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
