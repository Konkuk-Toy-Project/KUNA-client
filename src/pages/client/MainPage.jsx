import React from "react";
import styled from "styled-components";
import Category from "../../components/client/Main/Category/Category";
import { Suspense } from "react";
//import axios from "axios";
//import { useSetRecoilState } from "recoil";
//import { isClientState, userTokenState } from "../../store/common/user";

const MainPage = () => {
  //const setUserToken = useSetRecoilState(userTokenState);
  //const setIsClient = useSetRecoilState(isClientState);

  // 임시 로그인 기능
  // useEffect(() => {
  //   async function getData() {
  //     const data = await axios({
  //       method: "post",
  //       url: "http://localhost:8080/member/login",
  //       data: {
  //         email: "asdf@asdf.com",
  //         password: "asdfasdf@1",
  //       },
  //     }).then((response) => response.data);
  //     setUserToken(data);
  //     if (data.role !== "user") {
  //       setIsClient(false);
  //     }
  //   }
  //   getData();
  // }, [setUserToken, setIsClient]);

  return (
    <MainPageWrapper>
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
  margin: 2em 0;
  text-align: center;
`;

export default MainPage;
