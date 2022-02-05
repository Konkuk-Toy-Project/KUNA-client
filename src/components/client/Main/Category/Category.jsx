import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PreviewTitle from "../../../common/PreviewTitle/PreviewTitle";
import PreviewItemList from "../PreviewItemList/PreviewItemList";

const Category = ({ link, name, listType, items }) => {
  return (
    <CategoryWrapper>
      <CategoryLink to={link}>
        <PreviewTitle name={name} />
      </CategoryLink>
      <PreviewItemList listType={listType} items={items} />
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div``;

const CategoryLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default Category;
