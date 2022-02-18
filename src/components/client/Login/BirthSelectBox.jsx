import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BirthSelectBox = ({ name, start, end, onChange }) => {
  const [dateData, setDateData] = useState([]);
  useEffect(() => {
    setDateData(makeNumArr(start, end));
  }, []);

  const makeNumArr = useCallback((start, end) => {
    const arr = [];
    var i;
    for (i = start; i <= end; i++) {
      if (i === start) arr.push("   ");
      i < 10 ? arr.push("0" + i) : arr.push(String(i));
    }
    return arr;
  }, []);

  return (
    <Select id={name} name={name} onChange={onChange}>
      {dateData.map((data) => (
        <option key={name + "_" + data}>{data}</option>
      ))}
    </Select>
  );
};

BirthSelectBox.propTypes = {
  name: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  onChange: PropTypes.func,
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
export default BirthSelectBox;
