import React from "react";
import PropTypes from "prop-types";

const OrderInput = ({ label, info, name, onChange }) => {
  return (
    <li>
      <label>{label}</label>
      <input type="text" name={name} value={info[name]} onChange={onChange} />
    </li>
  );
};

OrderInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrderInput;
