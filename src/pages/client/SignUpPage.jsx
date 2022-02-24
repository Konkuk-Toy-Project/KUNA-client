import React, { useCallback, useState } from "react";
import BirthSelectBox from "../../components/client/Login/BirthSelectBox";
import PhoneInput from "../../components/client/Login/PhoneInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import ReactHelmet from "../../components/common/ReactHelmet/ReactHelmet";

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
    if (!isProperInfo()) {
      if (Object.values(info).filter((val) => val === "").length > 0)
        alert("모든 정보를 입력해주세요.");
      else if (!isEmailDupChecked) alert("이메일 중복체크가 필요합니다.");
      else if (!isEmailUnique) alert("중복된 이메일입니다.");
      else if (!isProperPw()) alert("비밀번호 형식에 맞지 않습니다.");
      else if (info[PW] !== info["pwCheck"])
        alert("비밀번호와 비밀번호 확인이 불일치합니다.");
      else if (/\s/.test(info[NAME])) alert("이름에 공백이 없어야합니다.");
      else if (info[PH_MID].length !== 4 || info[PH_LAST].length !== 4)
        alert("전화번호 자리수를 확인해주세요(예시 : 010-1234-0000)");

      return;
    }
    // 서버로 전송
    SendInfos();
  };
  const SendInfos = async () => {
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
        response.data.hasOwnProperty("role")
      )
        navigate("/login/signUp/complete");
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        const errorCode = data.errorCode;
        switch (errorCode) {
          case "M009":
          case "M010":
          case "M011":
          case "M012":
          case "M013":
          case "M014":
            alert(data.message);
            setLoading(false);
            return;
        }
      }
      alert("오류가 발생하였습니다. 다시 시도해주세요");
      window.location.reload();
    }
  };

  const isProperInfo = useCallback(() => {
    return (
      isEmailDupChecked &&
      isEmailUnique &&
      isProperPw() &&
      info[PW] === info["pwCheck"] &&
      info[PH_MID].length === 4 &&
      info[PH_LAST].length === 4 &&
      !/\s/.test(info[NAME]) &&
      Object.values(info).filter((val) => val === "").length === 0
    );
  }, [info]);

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
      alert("오류가 발생하였습니다. 다시 시도해주세요");
      window.location.reload();
    }
    setEmailDupLoading(false);
  }, [isEmailDupChecked, info]);

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
  return (
    <SignUpWrapper>
      <ReactHelmet title={"회원가입"} />
      {/* 로딩중 샘플 */}
      {loading ? <div>로딩중</div> : null}
      <PageTitle title={"회원가입"} />
      <Ul id="info-container">
        <List id="id-container">
          <Label>아이디</Label>
          <Input name={ID} value={info[ID]} onChange={onChange} width={120} />
          @
          <Input
            name={EMAIL_ADDR}
            value={info[EMAIL_ADDR]}
            onChange={onChange}
            disabled={isEmailTypingMode ? false : true}
            width={120}
          />
          <AddrSelect onChange={onSelectEmail}>
            {emailArr.map((email, idx) => (
              <option key={idx}>{email}</option>
            ))}
          </AddrSelect>
          <DupCheckBtn onClick={onEmailDupClick} disabled={isEmailUnique}>
            중복확인
          </DupCheckBtn>
        </List>
        <li>
          <EmptyLabel />
          <Alert visibility={isEmailDupChecked}>
            {emailDupLoading
              ? "확인 중..."
              : isEmailUnique
              ? "사용가능한 이메일입니다✅"
              : "중복된 이메일입니다"}
          </Alert>
        </li>

        <List name="pw-container">
          <Label>비밀번호</Label>
          <Input
            name={PW}
            type="password"
            value={info[PW]}
            onChange={onChange}
            placeholder="8자이상, 영문자, 숫자, 특수문자 조합"
          />
        </List>
        <li>
          <EmptyLabel />
          <Alert visibility={info[PW] !== "" && !isProperPw()}>
            비밀번호는 8자 이상, 특수 문자, 영문자 숫자 조합이어야 합니다.
          </Alert>
        </li>

        <List name="pwCheck-container">
          <Label>비밀번호 확인</Label>
          <Input
            type="password"
            name={PW_CHECK}
            placeholder="비밀번호 확인"
            value={info[PW_CHECK]}
            onChange={onChange}
          />
          <span>
            {info[PW] !== "" && info[PW] === info[PW_CHECK] ? "🟢" : "🔴"}
          </span>
        </List>

        <List id="name-container">
          <Label>이름</Label>
          <Input
            type="text"
            name={NAME}
            placeholder="이름"
            onChange={onChange}
          />
        </List>
        <List id="phone-container">
          <Label>휴대전화</Label>
          <PhoneInput
            name={[PH_FIRST, PH_MID, PH_LAST]}
            data={info}
            onChange={onChange}
          />
        </List>
        <List id="birth-container">
          <Label id="birth-label">생년월일</Label>
          <BirthWrapper>
            <BirthSelectBox
              name={BIRTH_Y}
              start={YEAR_START}
              end={YEAR_END}
              onChange={onChange}
            />
            년
          </BirthWrapper>
          <BirthWrapper>
            <BirthSelectBox
              name={BIRTH_M}
              start={1}
              end={12}
              onChange={onChange}
            />
            월
          </BirthWrapper>
          <BirthWrapper>
            <BirthSelectBox
              name={BIRTH_D}
              start={1}
              end={31}
              onChange={onChange}
            />
            일{" "}
          </BirthWrapper>
        </List>
      </Ul>
      <AskAdminWrapper>
        <AskAdmin>관리자이신가요? </AskAdmin>
        <input type="checkbox" checked={isAdmin} onChange={onCheckAdmin} />
      </AskAdminWrapper>
      <div id="signInBtn-container">
        <SignUpBtn onClick={onSignIn}>가입하기</SignUpBtn>
      </div>
    </SignUpWrapper>
  );
};
const SignUpWrapper = styled.div`
  margin: 0 auto;
  width: 590px;
  padding: 30px 0 90px 0;
`;
const Ul = styled.ul`
  border-top: solid black 1.5px;
  border-bottom: solid black 1.5px;
  padding: 45px 0px;
  margin-top: 30px;
`;

const List = styled.li`
  height: 80px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: inline-block;
  width: 120px;
  font-weight: bold;
  padding: 10px 10px;
`;
const EmptyLabel = styled.div`
  display: inline-block;
  width: 140px;
  height: 13px;
  font-weight: bold;
`;

const Input = styled.input`
  display: inline-block;
  height: 60%;
  width: ${({ width }) => (width !== undefined ? `${width}px` : "68%")};
  border: none;
  border-bottom: solid black 1px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;
const AddrSelect = styled.select`
  display: inline-block;
  padding: 1px 2px;
  height: 64%;
  border: none;
  border-left: dashed black 1px;
  border-bottom: solid black 1px;
`;

const DupCheckBtn = styled.button`
  display: inline-block;
  padding: 1px 2px;
  height: 57%;
  margin-left: 6px;
`;
const Alert = styled.p`
  display: inline-block;
  margin: 0 0 10px 0;
  font-size: 13px;
  height: 15px;
  visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
  color: #4d3c4b;
`;

const BirthWrapper = styled.div`
  display: inline-block;
  margin-right: 15px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const AskAdminWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 10px;
`;
const AskAdmin = styled.p`
  display: inline-block;
  margin: 0 10px;
`;

const SignUpBtn = styled.button`
  display: inline-block;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 0;
  outline: 0;
  background-color: #1c101f;
  color: #f0fbfd;
  font-size: 15px;
  font-weight: bold;
`;

export default SignUpPage;
