import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  width: 80%;
  border: 1px solid black;
  padding: 1em;
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
        <h1>등록한 쿠폰 명</h1>
        <h1>할인율</h1>
      </CouponWrapper>
      {enrolledCoupons.map((coupon) => (
        <CouponWrapper key={coupon.id}>
          <h3>{coupon.name}</h3>
          <h3>{coupon.discount}%</h3>
        </CouponWrapper>
      ))}
      {showCouponPopUp && <AddCouponPopUp />}
    </OwnerCouponPageWrapper>
  );
};

export default OwnerCouponPage;
