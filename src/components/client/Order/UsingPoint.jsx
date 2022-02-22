import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../store/common/user";
import OrderLabel from "./OrderLabel";
import styled from "styled-components";

const UsingPoint = ({ salePrice, couponSale, setUsePoint }) => {
  const [ownPoint, setOwnPoint] = useState(0);
  const [inputPoint, setInputPoint] = useState(0);
  const [availPoint, setAvailPoint] = useState(0);
  const userToken = useRecoilValue(userTokenState);

  const onChange = (e) => {
    const value = e.target.value.toString().replace(/[^0-9]/gi, "");
    const point = value == "" ? 0 : parseInt(value);

    if (point > availPoint) setInputPoint(availPoint);
    else if (point < 0) setInputPoint(0);
    else setInputPoint(point);
  };

  const onClick = () => setInputPoint(availPoint);

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:8080/member/point", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
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

  return (
    <>
      <OrderLabel text="포인트" />
      <Input type="text" onChange={onChange} value={inputPoint}></Input>
      <Button onClick={onClick}>전액사용</Button>
      <HavingPointWrapper>
        <PointSpan color="plum">
          사용가능 : {(availPoint - parseInt(inputPoint)).toLocaleString()}원
        </PointSpan>
        │
        <PointSpan>
          보유 : {(ownPoint - parseInt(inputPoint)).toLocaleString()}원
        </PointSpan>
      </HavingPointWrapper>
    </>
  );
};

UsingPoint.propTypes = { setUsePoint: PropTypes.func.isRequired };

const Input = styled.input`
  display: inline-block;
  box-sizing: border-box;
  width: 13%;
  height: 70%;
  padding: 0 12px;
  text-align: right;
  margin-right: 5px;
`;

const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  height: 70%;
  border-radius: 5px;
  background-color: #424242;
  color: white;
  border: none;
  outline: none;

  &:hover {
    background-color: black;
  }
`;

const HavingPointWrapper = styled.div`
  margin: 0 5px;
`;

const PointSpan = styled.span`
  font-size: 13px;
  margin: 0 5px;

  color: ${({ color }) => (color === "plum" ? "#ab47bc" : "#494949")};
`;

export default UsingPoint;
