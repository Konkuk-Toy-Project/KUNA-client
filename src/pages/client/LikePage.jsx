import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PreviewItemList from "../../components/common/PreviewItemList/PreviewItemList";
import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";

const LikePage = () => {
  const [items, setItems] = useState([]);

  const getData = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/preference`)
      .then((response) => response.data);
    setItems(data);
    return data;
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClickDeleteAll = () => {
    setItems([]);
  };

  console.log(items);

  return (
    <LikePageWrapper>
      <PreviewTitle name="좋아요" />
      <PreviewItemList listType={"like"} items={items} />
      <button onClick={onClickDeleteAll}>전체 삭제</button>
    </LikePageWrapper>
  );
};

const LikePageWrapper = styled.div`
  text-align: center;
  margin: 2em 0;
  padding-bottom: 2em;
  border-bottom: 2px solid black;
`;

export default LikePage;
