import React from "react";
import styled from "styled-components";

const ProductButton = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

const Wrapper = styled.button`
  outline: none;
  color: black;
  background-color: transparent;
  border: 1px solid black;
  font-size: 14px;
  padding: 0.5em;
  border-radius: 10px;
  cursor: pointer;
  margin: 0.2em;
  &:hover {
    color: white;
    background-color: black;
    border: 1px solid black;
    transition: all 0.3s ease-in;
  }
`;

export default ProductButton;
