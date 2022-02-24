import React, { useState } from "react";
import PhoneInput from "../../components/client/Login/PhoneInput";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import IconX from "../../components/client/Icon/IconX";
import axios from "axios";
import styled from "styled-components";
import ReactHelmet from "../../components/common/ReactHelmet/ReactHelmet";

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
            setLoading(false);
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
    <FindAccountWrapper>
      <ReactHelmet title={"아이디·비밀번호 찾기"} />
      <PageTitle title={"아이디·비밀번호 찾기"} />
      {loading ? <div>Loading...</div> : null}
      {/* <div id="tab-container"></div> */}
      <TabUl>
        <TabLi
          id={FIND_ID}
          onClick={onTabClick}
          clicked={isFindIdTab ? "true" : "false"}
        >
          <TabSpan>아이디 찾기</TabSpan>
        </TabLi>
        <TabLi
          id={FIND_PW}
          onClick={onTabClick}
          clicked={isFindIdTab ? "false" : "true"}
        >
          <TabSpan>비밀번호 찾기</TabSpan>
        </TabLi>
      </TabUl>

      <ContentUl>
        <ContentLi name="name">
          <Label htmlFor="name">이름</Label>
          <Input type="text" id="name" name={NAME} onChange={onChange} />
        </ContentLi>
        {isFindIdTab ? null : (
          <ContentLi>
            <Label htmlFor="id">아이디(이메일)</Label>
            <Input type="text" id="id" name={ID} onChange={onChange} />
          </ContentLi>
        )}
        <ContentLi name="phone">
          <Label>전화번호</Label>
          <PhoneInput
            name={[PH_FIRST, PH_MID, PH_LAST]}
            data={info}
            onChange={onChange}
          />
        </ContentLi>
        <BtnWrapper id="btn-container">
          <SubmitBtn type="submit" onClick={onSubmit}>
            {isFindIdTab ? "아이디 찾기" : "비밀번호 찾기"}
          </SubmitBtn>
        </BtnWrapper>
      </ContentUl>
      {showPopup ? (
        <PopupWrapper>
          <PopupContentWrapper>
            <IconWrapper>
              <IconX onClick={onClosePopupClick} />
            </IconWrapper>
            <PopupContent>
              <span>
                {isFindIdTab && email !== ""
                  ? `${info[NAME]}님의 아이디는 ${email}입니다.`
                  : !isFindIdTab && tempPW !== ""
                  ? "임시비밀번호가 이메일로 발송되었습니다."
                  : ""}
              </span>
            </PopupContent>
          </PopupContentWrapper>
        </PopupWrapper>
      ) : null}
    </FindAccountWrapper>
  );
};

const FindAccountWrapper = styled.div`
  width: 590px;
  margin: 50px auto;
`;

const TabUl = styled.ul`
  width: 100%;
  height: 50px;
  margin-top: 65px;
`;

const TabLi = styled.li`
  display: inline-block;
  width: 49.5%;
  height: 100%;
  text-align: center;
  border-radius: 7px 7px 0 0;
  color: ${({ clicked }) => (clicked === "true" ? "#f0fbfd" : "#757575")};
  background-color: ${({ clicked }) =>
    clicked === "true" ? "#1c101f" : "#eeeeee"};

  border-bottom: solid 1px #1c101f;
`;

const TabSpan = styled.span`
  position: relative;
  display: inline-block;
  top: 50%;
  transform: translate(0%, -50%);
`;

const ContentUl = styled.ul`
  width: 100%;
  height: auto;
`;

const ContentLi = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const Label = styled.label`
  display: inline-block;
  width: 120px;
  font-weight: bold;
  padding: 10px 10px;
  text-align: center;
`;

const Input = styled.input`
  display: inline-block;
  height: 60%;
  width: ${({ width }) => (width !== undefined ? `${width}px` : "68%")};
  border: none;
  border-bottom: solid black 1px;
  padding-left: 5px;
  font-size: 14.5px;
  &:focus {
    outline: none;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  margin: 20px 0 100px 0;
`;

const SubmitBtn = styled.button`
  display: inline-block;
  width: 100%;
  height: 40px;
  margin: 0px auto;
  font-size: 15px;
  border-radius: 5px;
  outline: 0;
  font-weight: bold;
  border: none;
  background-color: #1c101f;
  color: #f0fbfd;
  cursor: pointer;
`;

const PopupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;
const IconWrapper = styled.div`
  text-align: right;
`;

const PopupContentWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  height: 30%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;
const PopupContent = styled.div`
  display: inline-block;
  text-align: center;
  align-self: center;
`;

const PopupSpan = styled.span``;
export default FindAccountPage;
