import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuCategory = ({ link, imageUrl, title }) => {
  return (
    <MenuCategoryWrapper>
      <PageLink to={link}>
        <Image src={imageUrl} alt="Category" />
        <Title>{title}</Title>
      </PageLink>
    </MenuCategoryWrapper>
  );
};

const MenuCategoryWrapper = styled.div`
  width: 15em;
  height: 15em;
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0em 0.2em;
  &:hover {
    transition: all 0.3s ease-in;
    background-color: black;
    color: white;
  }
`;

const PageLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Image = styled.img`
  width: 6em;
  margin-bottom: 0.4em;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

export default MenuCategory;