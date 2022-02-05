import React from "react";
import PropTypes from "prop-types";

const CREDIT = "credit";
const BANK_BOOK = "bankbook";
const PAY_METHOD = "payMethod";

const PayMthdSelector = ({ setPayMethod, setIsChecked }) => {
  const onPayMthdClick = (e) => {
    setPayMethod({ [PAY_METHOD]: e.target.value });
    setIsChecked(true);
  };
  return (
    <div>
      <label>결제 방식</label>
      <ul>
        <li>
          <input
            type="radio"
            id={CREDIT}
            name={PAY_METHOD}
            value={CREDIT}
            onClick={onPayMthdClick}
          />
          <label htmlFor={CREDIT}>신용카드</label>
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
