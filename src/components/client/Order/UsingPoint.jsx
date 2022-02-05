import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UsingPoint = ({ setUsePoint }) => {
  const [ownPoint, setOwnPoint] = useState(1000);
  const [leftPoint, setLeftPoint] = useState(0);
  const [inputPoint, setInputPoint] = useState(0);

  const onChange = (e) => {
    const value = e.target.value;
    if (value > ownPoint) setInputPoint(ownPoint);
    else if (value < 0) setInputPoint(0);
    else setInputPoint(value);
  };

  const onClick = () => setInputPoint(ownPoint);

  useEffect(() => {
    console.log("보유포인트 받아오기");
  }, []);

  useEffect(() => {
    setLeftPoint(ownPoint - inputPoint);
    setUsePoint({ ["usePoint"]: inputPoint }); // 주문페이지로 보내는 데이터
  }, [inputPoint]);

  return (
    <div>
      <label>적립금</label>
      <input type="number" onChange={onChange} value={inputPoint}></input>
      <button onClick={onClick}>전액사용</button>
      <span>보유 적립금 {leftPoint}원</span>
    </div>
  );
};

UsingPoint.propTypes = { setUsePoint: PropTypes.func.isRequired };

export default UsingPoint;
