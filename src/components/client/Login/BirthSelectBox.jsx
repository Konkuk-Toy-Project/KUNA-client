import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

var i;
const makeNumArr = (start, end) => {
  const arr = [];
  for (i = start; i <= end; i++) {
    if (i === start) arr.push("   ");
    i < 10 ? arr.push("0" + i) : arr.push(String(i));
  }
  return arr;
};

const BirthSelectBox = ({ name, start, end, onChange }) => {
  const [dateData, setDateData] = useState([]);
  useEffect(() => {
    setDateData(makeNumArr(start, end));
  }, []);

  return (
    <select id={name} name={name} onChange={onChange}>
      {dateData.map((data) => (
        <option key={name + "_" + data}>{data}</option>
      ))}
    </select>
  );
};

BirthSelectBox.propTypes = {
  name: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  onChange: PropTypes.func,
};

export default BirthSelectBox;
