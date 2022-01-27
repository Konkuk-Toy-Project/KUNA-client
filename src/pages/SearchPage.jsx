import React from "react";
import { useParams } from "react-router";

const SearchPage = () => {
  const { content } = useParams();
  return (
    <div>
      <h1>검색 결과 : {content}</h1>
    </div>
  );
};

export default SearchPage;
