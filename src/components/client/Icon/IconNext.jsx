import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const IconNext = ({ onClick, id }) => {
  return (
    <Span onClick={onClick}>
      <FontAwesomeIcon icon={faAngleRight} />
    </Span>
  );
};

const Span = styled.span`
  display: flex;
  height: 100%;
  align-items:center;
  border-radius: 10px;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    background: rgb(0,0,0);
background: linear-gradient(270deg, rgba(0,0,0,0.3510446414894083) 0%, rgba(255,255,255,0) 100%);
    );
  }
`;

export default IconNext;
