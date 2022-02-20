import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const UpDownBtn = ({ onUpBtnClick, onDownBtnClick, idx, width }) => {
  return (
    <UpDownWrapper width={width}>
      <Button name={idx} type="up" onClick={onUpBtnClick}>
        ▲
      </Button>
      <Button name={idx} type="down" onClick={onDownBtnClick}>
        ▼
      </Button>
    </UpDownWrapper>
  );
};

UpDownBtn.propTypes = {};
const UpDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${({ width }) => width || "10%"};
  margin: 0px 3px;
`;

const Button = styled.button`
  display: inline-block;
  height: 50%;
  border: none;
  &:hover {
    background-color: #424242;
    color: white;
  }
  ${({ type }) =>
    type === "up"
      ? "{border-radius : 3px 3px 0 0 ; border-bottom: 0.1px solid #707070}"
      : "{border-radius :  0 0 3px 3px;"}
`;

export default UpDownBtn;
