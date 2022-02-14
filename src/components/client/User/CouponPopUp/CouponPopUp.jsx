import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showCouponState } from "../../../../store/client/user";
import { currentY } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const CouponPopUp = () => {
  const [coupons, setCoupons] = useState([]);
  const setShowCoupon = useSetRecoilState(showCouponState);
  const scrollY = useRecoilValue(currentY);
  const [serialNumber, setSerialNumber] = useState("");

  const getCoupons = async () => {
    const data = await axios
      .get("http://localhost:8080/coupon")
      .then((response) => response.data);
    console.log(data);
    setCoupons(data);
  };

  const registerCoupon = async () => {
    try {
      await axios
        .post("http://localhost:8080/coupon/user", {
          serialNumber,
        })
        .then((response) => response.data);
      alert("쿠폰이 등록되었습니다.");
    } catch (err) {
      alert("이미 사용했거나 존재하지 않는 쿠폰입니다.");
    }
  };

  const onChangeRegisterInput = (event) => {
    setSerialNumber(event.target.value);
  };

  const onClickRegisterCoupon = () => {
    if (window.confirm("쿠폰을 등록하시겠습니까?")) {
      registerCoupon();
    }
  };

  const getCouponCondition = (condition) => {
    return condition.slice(12, condition.length);
  };

  const getCouponRate = (kind, rate) => {
    return kind === "STATIC" ? `${rate}원` : `${rate}%`;
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <CouponPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowCoupon} />
      <Title>보유 쿠폰 목록</Title>
      <CouponWrapper>
        <h1>쿠폰 명</h1>
        <h1>쿠폰 적용 최소 금액</h1>
        <h1>할인율</h1>
      </CouponWrapper>
      {coupons.map((coupon) => (
        <CouponWrapper key={coupon.id}>
          <h3>{coupon.name}</h3>
          <h3>{getCouponCondition(coupon.couponCondition)}원</h3>
          <h3>{getCouponRate(coupon.couponKind, coupon.rate)}</h3>
        </CouponWrapper>
      ))}
      <Title>쿠폰 등록하기</Title>
      <EnrollCouponWrapper>
        <input type="text" onChange={onChangeRegisterInput} />
        <button onClick={onClickRegisterCoupon}>등록하기</button>
      </EnrollCouponWrapper>
    </CouponPopUpWrapper>
  );
};

const CouponPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 20vw;
  width: 60vw;
  height: 40vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  margin: 1em 0;
  font-size: 24px;
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border: 1px solid black;
  padding: 1em;
`;

const EnrollCouponWrapper = styled.div`
  display: flex;
`;

export default CouponPopUp;
