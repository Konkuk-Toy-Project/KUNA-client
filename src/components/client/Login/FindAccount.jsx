import React, { useState } from "react";
import PhoneInput from "./PhoneInput";

const FIND_ID = "findId";
const FIND_PW = "findPw";
const ID = "id";
const NAME = "name";
const PH_FIRST = "phone_first";
const PH_MID = "phone_mid";
const PH_LAST = "phone_last";

const FindAccount = () => {
  const [isFindIdTab, setIsFindIdTab] = useState(true);
  const [info, setInfo] = useState({
    [ID]: "",
    [NAME]: "",
    [PH_FIRST]: "010",
    [PH_MID]: "",
    [PH_LAST]: "",
  });
  const onChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  console.log(info);
  const onTabClick = (e) => {
    const targetName = e.target.id;
    targetName === FIND_ID ? setIsFindIdTab(true) : setIsFindIdTab(false);
  };

  return (
    <div>
      <div id="tab-container"></div>
      <ul>
        <li id={FIND_ID} onClick={onTabClick}>
          아이디 찾기
        </li>
        <li id={FIND_PW} onClick={onTabClick}>
          비밀번호 찾기
        </li>
      </ul>

      <ul id="input-container">
        <li name="name">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name={NAME} onChange={onChange}></input>
        </li>
        {isFindIdTab ? null : (
          <li>
            <label htmlFor="id">아이디(이메일)</label>
            <input type="text" id="id" name={ID} onChange={onChange}></input>
          </li>
        )}
        <li name="phone">
          <PhoneInput name={[PH_FIRST, PH_MID, PH_LAST]} onChange={onChange} />
        </li>
        <li id="btn-container">
          <button type="submit">
            {isFindIdTab ? "아이디 찾기" : "비밀번호 찾기"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FindAccount;
