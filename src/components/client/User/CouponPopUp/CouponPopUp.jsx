import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  currentY,
  showCouponState,
  userCouponState,
} from "../../../../store/client/user";
import CloseButton from "../CloseButton/CloseButton";

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

const CouponPopUp = () => {
  const coupons = useRecoilValue(userCouponState);
  const setShowCoupon = useSetRecoilState(showCouponState);
  const scrollY = useRecoilValue(currentY);

  const onClickClose = () => {
    setShowCoupon(false);
  };

  return (
    <CouponPopUpWrapper top={scrollY}>
      <CloseButton onClick={onClickClose} />
      <Title>보유 쿠폰 목록</Title>
      <CouponWrapper>
        <h1>쿠폰 명</h1>
        <h1>할인율</h1>
      </CouponWrapper>
      {coupons.map((coupon) => (
        <CouponWrapper key={coupon.id}>
          <h3>{coupon.name}</h3>
          <h3>{coupon.discount}%</h3>
        </CouponWrapper>
      ))}
      <Title>쿠폰 등록하기</Title>
      <EnrollCouponWrapper>
        <input type="text" />
        <button>등록하기</button>
      </EnrollCouponWrapper>
    </CouponPopUpWrapper>
  );
};

export default CouponPopUp;
