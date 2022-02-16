import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UsingPoint = ({ salePrice, couponSale, setUsePoint }) => {
  const [ownPoint, setOwnPoint] = useState(0);
  const [inputPoint, setInputPoint] = useState(0);
  const [availPoint, setAvailPoint] = useState(0);

  const onChange = (e) => {
    const value = e.target.value.toString().replace(/[^0-9]/gi, "");
    const point = value == "" ? 0 : parseInt(value);

    if (point > availPoint) setInputPoint(availPoint);
    // else if (point < 0) setInputPoint(0);
    else setInputPoint(point);
  };

  const onClick = () => setInputPoint(availPoint);

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:8080/member/point");
      const point = response.data.point;
      setOwnPoint(point);
      setAvailPoint(
        salePrice - couponSale >= point ? point : salePrice - couponSale
      );
    } catch (error) {
      const response = error.response;
      alert(
        response && response.errorCode !== undefined
          ? response.message
          : "오류가 발생하였습니다. 다시 시도해주세요"
      );
      // window.location.reload();
    }
  }, []);

  useEffect(() => {
    setUsePoint(parseInt(inputPoint)); // 주문페이지로 보내는 데이터
  }, [inputPoint]);

  console.log(inputPoint);
  console.log(availPoint);
  console.log(ownPoint);

  return (
    <div>
      <label>포인트</label>
      <input type="text" onChange={onChange} value={inputPoint}></input>
      <button onClick={onClick}>전액사용</button>
      <span>사용가능 포인트 {availPoint - parseInt(inputPoint)}원</span>
      <span>보유 포인트 {ownPoint - parseInt(inputPoint)}원</span>
    </div>
  );
};

UsingPoint.propTypes = { setUsePoint: PropTypes.func.isRequired };

export default UsingPoint;
