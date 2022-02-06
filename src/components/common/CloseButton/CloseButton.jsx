import React from "react";
import styled from "styled-components";

const CloseButton = ({ onClick }) => {
  return (
    <CloseButtonWrapper onClick={() => onClick(false)}>✕</CloseButtonWrapper>
  );
};

const CloseButtonWrapper = styled.p`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
  font-size: 30px;
  text-align: center;
  line-height: 40px;
  &:hover {
    transform: scale(1.1);
  }
`;

export default CloseButton;
