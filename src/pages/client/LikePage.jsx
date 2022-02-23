import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PreviewItemList from "../../components/common/PreviewItemList/PreviewItemList";
import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";
import { userTokenState } from "../../store/common/user";

const LikePage = () => {
  const [items, setItems] = useState([]);
  const userToken = useRecoilValue(userTokenState);

  const getData = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/preference`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    setItems(data);
    return data;
  }, [userToken]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <LikePageWrapper>
      <HelmetProvider>
        <Helmet>
          <title>KUNA | 찜목록</title>
        </Helmet>
      </HelmetProvider>
      <PreviewTitle name="좋아요" />
      <PreviewItemList listType={"like"} items={items} />
    </LikePageWrapper>
  );
};

const LikePageWrapper = styled.div`
  text-align: center;
  margin: 4em;
  padding-bottom: 2em;
`;

export default LikePage;
