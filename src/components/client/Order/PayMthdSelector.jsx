import React from "react";
import PropTypes from "prop-types";

const CARD = "card";
const BANK_BOOK = "bankbook";
const PAY_METHOD = "payMethod";

const PayMthdSelector = ({ setPayMethod, setIsChecked }) => {
  const onPayMthdClick = (e) => {
    setPayMethod(e.target.value);
    setIsChecked(true);
  };
  return (
    <div>
      <label>결제 방식</label>
      <ul>
        <li>
          <input
            type="radio"
            id={CARD}
            name={PAY_METHOD}
            value={CARD}
            onClick={onPayMthdClick}
          />
          <label htmlFor={CARD}>신용카드</label>
        </li>
        <li>
          <input
            type="radio"
            id={BANK_BOOK}
            name={PAY_METHOD}
            value={BANK_BOOK}
            onClick={onPayMthdClick}
          />
          <label htmlFor={BANK_BOOK}>계좌이체</label>
        </li>
      </ul>
    </div>
  );
};

PayMthdSelector.propTypes = {
  setPayMethod: PropTypes.func.isRequired,
  setIsChecked: PropTypes.func.isRequired,
};

export default PayMthdSelector;
