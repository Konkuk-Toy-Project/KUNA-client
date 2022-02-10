import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const SignUpFinPage = () => {
  const navigate = useNavigate();
  const onClickToMain = () => navigate("/");
  const onClickToLogin = () => navigate("/login");
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 80 }} />
      </div>
      <p>회원가입이 완료되었습니다.</p>
      <ul>
        <li>
          <button onClick={onClickToMain}>메인페이지</button>
        </li>
        <li>
          <button onClick={onClickToLogin}>로그인하기</button>
        </li>
      </ul>
    </div>
  );
};

export default SignUpFinPage;
