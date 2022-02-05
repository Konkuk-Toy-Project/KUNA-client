import React from "react";
import styled from "styled-components";

const ItemTitle = ({ name }) => {
  return <Title>{name}</Title>;
};

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1em;
`;

export default ItemTitle;
