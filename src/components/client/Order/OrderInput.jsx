import React from "react";
import PropTypes from "prop-types";

const OrderInput = ({ label, info, key, onChange }) => {
  return (
    <li>
      <label>{label}</label>
      <input type="text" name={key} value={info[key]} onChange={onChange} />
    </li>
  );
};

OrderInput.propTypes = {
  label: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrderInput;
