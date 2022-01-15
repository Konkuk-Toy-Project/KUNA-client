import React from "react";
import styled from "styled-components";

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1em;
`;

const ItemTitle = ({ name }) => {
  return <Title>{name}</Title>;
};

export default ItemTitle;
