import React from "react";
import PropTypes from "prop-types";

const phoneFirstArr = ["010", "011", "016", "017"];

const PhoneInput = ({ name, onChange, data }) => {
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
        type="number"
        maxLength={4}
        value={data[name[1]]}
      />
      -
      <input
        id={name[2]}
        name={name[2]}
        onChange={onChange}
        type="number"
        value={data[name[2]]}
        maxLength={4}
      />
    </>
  );
};
PhoneInput.propTypes = {
  name: PropTypes.arrayOf(String).isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default PhoneInput;
