import React from "react";
import PropTypes from "prop-types";
import OrderLabel from "./OrderLabel";
import { OrderList } from "./OrderList";
import styled from "styled-components";

const CARD = "card";
const BANK_BOOK = "bankbook";
const PAY_METHOD = "payMethod";

const PayMthdSelector = ({ setPayMethod, setIsChecked }) => {
  const onPayMthdClick = (e) => {
    setPayMethod(e.target.value);
    setIsChecked(true);
  };
  return (
    <>
      <OrderLabel text="결제 방식" />
      <ul>
        <RadioLi>
          <RadioBtn
            type="radio"
            id={CARD}
            name={PAY_METHOD}
            value={CARD}
            onClick={onPayMthdClick}
          />
          <RadioLabel htmlFor={CARD}>신용카드</RadioLabel>
        </RadioLi>
        <RadioLi>
          <RadioBtn
            type="radio"
            id={BANK_BOOK}
            name={PAY_METHOD}
            value={BANK_BOOK}
            onClick={onPayMthdClick}
          />
          <RadioLabel htmlFor={BANK_BOOK}>계좌이체</RadioLabel>
        </RadioLi>
      </ul>
    </>
  );
};

PayMthdSelector.propTypes = {
  setPayMethod: PropTypes.func.isRequired,
  setIsChecked: PropTypes.func.isRequired,
};

const RadioLi = styled.li`
  display: inline-block;
  margin: 0px 5px;
  font-sizw: 18px;
`;

const RadioLabel = styled.label`
  margin: 3px 0;
`;

const RadioBtn = styled.input`
  font-size: 22px;
  &:checked {
    background-color: #ab47bc;
  }
`;
export default PayMthdSelector;
