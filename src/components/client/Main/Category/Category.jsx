import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PreviewTitle from "../../../common/PreviewTitle/PreviewTitle";
import PreviewItemList from "../../../common/PreviewItemList/PreviewItemList";
import { itemState } from "../../../../store/client/home";
import { useRecoilValue } from "recoil";

const Category = ({ link, name, listType }) => {
  const items = useRecoilValue(itemState);

  const filteredData = (type) => {
    let filteredItems = [...items];
    filteredItems = filteredItems.filter((item) => item.categoryName === type);
    return filteredItems;
  };

  return (
    <CategoryWrapper>
      <CategoryLink to={link}>
        <PreviewTitle name={name} />
      </CategoryLink>
      <PreviewItemList listType={listType} items={filteredData(name)} />
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div``;

const CategoryLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default Category;
