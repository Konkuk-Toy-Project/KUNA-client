import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showCouponState, userCouponState } from "../../../store/atoms";

const CouponPopUpWrapper = styled.form`
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

const CouponPopUp = () => {
  const coupons = useRecoilValue(userCouponState);
  const setShowCoupon = useSetRecoilState(showCouponState);

  const onClickClose = (event) => {
    event.preventDefault();
    setShowCoupon(false);
  };

  return (
    <CouponPopUpWrapper>
      <h1>보유 쿠폰 목록</h1>
      {coupons.map((coupon) => (
        <div key={coupon.id}>
          <h3>{coupon.name}</h3>
          <h3>{coupon.discount}%</h3>
        </div>
      ))}
      <button onClick={onClickClose}>닫기</button>
    </CouponPopUpWrapper>
  );
};

export default CouponPopUp;
