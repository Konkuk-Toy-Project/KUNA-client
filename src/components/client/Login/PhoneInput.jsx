import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const phoneFirstArr = ["010", "011", "016", "017"];

const PhoneInput = ({ name, onChange, data }) => {
  return (
    <>
      <Select name={name[0]} id={name[0]} onChange={onChange}>
        {phoneFirstArr.map((phoneFirst) => (
          <option key={"p_" + phoneFirst}>{phoneFirst}</option>
        ))}
      </Select>
      -
      <Input
        id={name[1]}
        name={name[1]}
        onChange={onChange}
        type="text"
        maxLength={4}
        value={data[name[1]]}
      />
      -
      <Input
        id={name[2]}
        name={name[2]}
        onChange={onChange}
        type="text"
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
const Select = styled.select`
  display: inline-block;
  width: 100px;
  height: 50%;
  padding-left: 10px;
  border: none;
  border-bottom: solid black 1px;
  &:focus {
    outline: none;
  }
`;
const Input = styled.input`
  display: inline-block;
  width: 100px;
  height: 50%;
  border: none;
  border-bottom: solid black 1px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;
export default PhoneInput;
