import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import Category from "../../components/client/Main/Category/Category";
import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userTokenState } from "../../store/common/user";
import { useNavigate } from "react-router";

const MainPage = () => {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const navigate = useNavigate();

  const isValidLogin = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/member/isLogin`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    if (!data) {
      setUserToken([]);
      alert("토큰이 만료되어 로그아웃 되었습니다.");
      navigate("/");
    }
  }, [setUserToken, userToken]);

  useEffect(() => {
    isValidLogin();
  }, [isValidLogin]);

  return (
    <MainPageWrapper>
      <HelmetProvider>
        <Helmet>
          <title>KUNA</title>
        </Helmet>
      </HelmetProvider>
      <MainImageWrapper>
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1644914647_0.jpg.webp"
          alt=""
        />
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1645162224_1.jpg.webp"
          alt=""
        />
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1645162627_0.jpg.webp"
          alt=""
        />
        <MainImage
          src="https://img.sonyunara.com/files/new_banner/1645162680_0.jpg.webp"
          alt=""
        />
      </MainImageWrapper>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category link="top" name="상의" listType="main" />
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category link="pants" name="하의" listType="main" />
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Category link="shoes" name="신발" listType="main" />
      </Suspense>
    </MainPageWrapper>
  );
};

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
`;

const MainImageWrapper = styled.div`
  display: flex;
  margin: 4em 0;
`;

const MainImage = styled.img`
  width: 40em;
  height: 45em;
  border-radius: 20px;
  margin: 0 1em;
`;

export default MainPage;
