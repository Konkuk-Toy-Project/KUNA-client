import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import PreviewItemList from "../../components/common/PreviewItemList/PreviewItemList";
import styled from "styled-components";
import PreviewTitle from "../../components/common/PreviewTitle/PreviewTitle";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const { content } = useParams();

  const getData = useCallback(async () => {
    const data = await axios
      .get(`http://localhost:8080/item/search/${content}`)
      .then((response) => response.data);
    setItems(data);
    return data;
  }, [content]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SearchPageWrapper>
      <HelmetProvider>
        <Helmet>
          <title>{`KUNA | ${content}`}</title>
        </Helmet>
      </HelmetProvider>
      <PreviewTitle name={`검색 키워드 : ${content}`} />
      <PreviewItemList listType={"main"} items={items} />
    </SearchPageWrapper>
  );
};

const SearchPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  text-align: center;
`;

export default SearchPage;
