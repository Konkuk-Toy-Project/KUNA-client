import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactHelmet from "../../components/common/ReactHelmet/ReactHelmet";

const SignUpFinPage = () => {
  const navigate = useNavigate();
  const onClickToMain = () => navigate("/");
  const onClickToLogin = () => navigate("/login");
  return (
    <SignUpFinPageWrapper>
      <ReactHelmet title={"회원가입 완료"} />
      <IconWrapper>
        <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 100 }} />
      </IconWrapper>
      <Ptag>회원가입이 완료되었습니다.</Ptag>
      <BtnWrapper>
        <li>
          <Button onClick={onClickToMain}>메인페이지</Button>
        </li>
        <li>
          <Button onClick={onClickToLogin}>로그인하기</Button>
        </li>
      </BtnWrapper>
    </SignUpFinPageWrapper>
  );
};

const SignUpFinPageWrapper = styled.div`
  display: flex;
  width: 590px;
  margin: 60px auto;
  height: 380px;
  border-top: 1.4px solid black;
  border-bottom: 1.4px solid black;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Ptag = styled.p`
  margin-top: 20px;
`;

const IconWrapper = styled.div`
  margin: 55px 0 30px 0;
`;

const BtnWrapper = styled.ul`
  display: flex;
  margin: 30px 0px 40px 0px;
`;

const Button = styled.button`
  height: 40px;
  width: 100px;
  background-color: #424242;
  color: white;
  border: none;
  outline: 0;
  border-radius: 6px;
  margin: 0 3px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

export default SignUpFinPage;
