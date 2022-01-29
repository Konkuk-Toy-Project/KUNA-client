import React from "react";
import PropTypes from "prop-types";

const phoneFirstArr = ["010", "011", "016", "017"];

const PhoneInput = ({ name, onChange, size }) => {
  return (
    <>
      <select name={name[0]} id={name[0]} onChange={onChange}>
        {phoneFirstArr.map((phoneFirst) => (
          <option key={"p_" + phoneFirst}>{phoneFirst}</option>
        ))}
      </select>
      -
      <input
        id={name[1]}
        name={name[1]}
        onChange={onChange}
        type="text"
        maxLength={4}
      />
      -
      <input
        id={name[2]}
        name={name[2]}
        onChange={onChange}
        type="text"
        maxLength={4}
      />
    </>
  );
};
PhoneInput.propTypes = {
  name: PropTypes.arrayOf(String).isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
};
export default PhoneInput;
