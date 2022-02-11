import React, { useState } from "react";
import PhoneInput from "../../components/client/Login/PhoneInput";
import axios from "axios";
import IconX from "../../components/client/Icon/IconX";

const FIND_ID = "findId";
const FIND_PW = "findPw";
const ID = "id";
const NAME = "name";
const PH_FIRST = "phone_first";
const PH_MID = "phone_mid";
const PH_LAST = "phone_last";

const FindAccountPage = () => {
  const [isFindIdTab, setIsFindIdTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [tempPW, setTempPW] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [info, setInfo] = useState({
    [ID]: "",
    [NAME]: "",
    [PH_FIRST]: "010",
    [PH_MID]: "",
    [PH_LAST]: "",
  });
  const onChange = (e) => {
    const id = e.target.id;
    let value = e.target.value;
    if (id === PH_MID || id === PH_LAST)
      value = value.toString().replace(/[^0-9]/gi, "");
    setInfo({ ...info, [id]: value });
  };

  const onTabClick = (e) => {
    const targetName = e.target.id;
    targetName === FIND_ID ? setIsFindIdTab(true) : setIsFindIdTab(false);
  };

  const onSubmit = () => {
    if (
      info[NAME] === "" ||
      info[PH_MID].length !== 4 ||
      info[PH_LAST].length !== 4 ||
      (!isFindIdTab && info[ID] === "")
    ) {
      alert("모든 정보를 정확히 입력해주세요.");
      return;
    }
    postInfos();
  };

  const onClosePopupClick = () => {
    setShowPopup(false);
    setEmail("");
    setTempPW("");
  };

  const postInfos = async () => {
    setLoading(true);
    let response;
    try {
      if (isFindIdTab) {
        response = await axios.post("http://localhost:8080/member/find/email", {
          name: info[NAME],
          phone: info[PH_FIRST] + info[PH_MID] + info[PH_LAST],
        });
      } else {
        response = await axios.post(
          "http://localhost:8080/member/find/password",
          {
            email: info[ID],
            name: info[NAME],
            phone: info[PH_FIRST] + info[PH_MID] + info[PH_LAST],
          }
        );
      }

      if (response.data.hasOwnProperty("email")) {
        setEmail(response.data.email);
        setShowPopup(true);
      } else if (response.data.hasOwnProperty("tempPassword")) {
        setTempPW(response.data.tempPassword);
        setShowPopup(true);
      }
      setLoading(false);
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        switch (data.errorCode) {
          case "M005":
            alert(data.message);
            return;
        }
      }
      alert("오류가 발생하였습니다. 다시 시도해주세요");
      window.location.reload();
    }
  };
  console.log(info);
  console.log(email);
  console.log(tempPW);

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
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
          <PhoneInput
            name={[PH_FIRST, PH_MID, PH_LAST]}
            data={info}
            onChange={onChange}
          />
        </li>
        <li id="btn-container">
          <button type="submit" onClick={onSubmit}>
            {isFindIdTab ? "아이디 찾기" : "비밀번호 찾기"}
          </button>
        </li>
      </ul>
      {showPopup ? (
        <div>
          <IconX onClick={onClosePopupClick} />
          <div>
            {isFindIdTab && email !== ""
              ? `${info[NAME]}님의 아이디는 ${email}입니다.`
              : !isFindIdTab && tempPW !== ""
              ? "임시비밀번호가 이메일로 발송되었습니다."
              : ""}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FindAccountPage;
