import React, { Component, useEffect, useState } from "react";
import Password from "./Password";

const emailArr = ["선택", "naver.com", "gmail.com", "daum.net", "직접입력"];
const phoneFirstArr = ["010", "011", "016"];
const YEAR_START = 1920;
const YEAR_END = 2022;
const years = [];
const months = [];
const days = [];
var i = 0;
const makeNumArr = (arr, start, end) => {
  for (i = start; i <= end; i++) {
    if (i === start) arr.push("   ");
    i < 10 ? arr.push("0" + i) : arr.push(String(i));
  }
};

const makeDateArr = () => {
  makeNumArr(years, YEAR_START, YEAR_END);
  makeNumArr(months, 1, 12);
  makeNumArr(days, 1, 31);
};

const SignIn = () => {
  const [info, setInfo] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    name: "",
    phone: "",
    birth: "",
  });
  const [dateArr, setDateArr] = useState([[], [], []]);
  useEffect(() => {
    makeDateArr();
    setDateArr([years, months, days]);
  }, []);
  const onSignIn = () => {};
  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  };

  return (
    <div>
      <div id="id-container">
        <label id="id-label">
          <span>아이디(이메일)</span>
          <input type="text" id="id" value={info.id} onChange={onChange} />@
          <input type="text" id="emailAddr" />
          <select>
            {emailArr.map((email) => (
              <option>{email}</option>
            ))}
          </select>
          <button id="idDupCheck">중복확인</button>
        </label>
      </div>
      <div id="pw-container">
        <Password
          type={2}
          name={Object.keys(info)[1]}
          data={info}
          onChange={onChange}
        />
      </div>
      <div id="pwCheck-container">
        <Password
          type={3}
          name={Object.keys(info)[2]}
          data={info}
          onChange={onChange}
        />
      </div>
      <div id="name-container">
        <label id="name-label">
          <span>이름</span>
          <input type="text" placeholder="이름" />
        </label>
      </div>
      <div id="phone-container">
        <select name="phone-first" id="phone-first">
          {phoneFirstArr.map((phoneFirst) => (
            <option key={"p_" + phoneFirst}>{phoneFirst}</option>
          ))}
        </select>
        -
        <input id="phoneMiddle" type="text" maxLength={4} />
        -
        <input id="phoneEnd" type="text" maxLength={4} />
      </div>
      <div id="birth-container">
        <label id="birth-label">
          {/* 컴포넌트화 하기  */}
          <select id="year">
            {dateArr[0].map((year) => (
              <option key={"y_" + year}>{year}</option>
            ))}
          </select>
          년
          <select id="month">
            {dateArr[1].map((mon) => (
              <option key={"m_" + mon}>{mon}</option>
            ))}
          </select>
          월
          <select id="day">
            {dateArr[2].map((day) => (
              <option key={"d_" + day}>{day}</option>
            ))}
          </select>
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
