import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ItemList from "../ItemList/ItemList";
import Title from "../Title/Title";

const Category = ({ link, name, listType, items }) => {
  return (
    <CategoryWrapper>
      <CategoryLink to={link}>
        <Title name={name} />
      </CategoryLink>
      <ItemList listType={listType} items={items} />
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div``;

const CategoryLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default Category;
