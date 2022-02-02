import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import AddCouponPopUp from "../../components/owner/Coupon/AddCouponPopUp/AddCouponPopUp";
import {
  enrolledCouponState,
  showCouponPopUpState,
} from "../../store/owner/coupon";

const OwnerCouponPageWrapper = styled.div`
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const Title = styled.p`
  margin: 1em 0;
  font-size: 24px;
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
`;

const Description = styled.p`
  font-size: 16px;
  width: 100%;
  padding: 1em;
  border: 1px solid black;
`;

const OwnerCouponPage = () => {
  const enrolledCoupons = useRecoilValue(enrolledCouponState);
  const [showCouponPopUp, setShowCouponPopUp] =
    useRecoilState(showCouponPopUpState);

  const onClickAddCoupon = () => {
    setShowCouponPopUp(true);
  };

  return (
    <OwnerCouponPageWrapper>
      <button onClick={onClickAddCoupon}>새로운 쿠폰 등록하기</button>
      <Title>보유 쿠폰 목록</Title>
      <CouponWrapper>
        <Description>등록한 쿠폰 명</Description>
        <Description>할인율</Description>
        <Description>쿠폰 등록 번호</Description>
      </CouponWrapper>
      {enrolledCoupons.map((coupon) => (
        <CouponWrapper key={coupon.id}>
          <Description>{coupon.name}</Description>
          <Description>{coupon.discount}%</Description>
          <Description>{coupon.enrollNumber}</Description>
        </CouponWrapper>
      ))}
      {showCouponPopUp && <AddCouponPopUp />}
    </OwnerCouponPageWrapper>
  );
};

export default OwnerCouponPage;
