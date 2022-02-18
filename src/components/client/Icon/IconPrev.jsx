import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const IconNext = ({ onClick }) => {
  return (
    <Span onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </Span>
  );
};

const Span = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 10px;
  border-radius: 10px;
  &:hover {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.3510446414894083) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export default IconNext;
