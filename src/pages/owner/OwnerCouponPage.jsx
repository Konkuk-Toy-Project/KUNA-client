import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AddCouponPopUp from "../../components/owner/Coupon/AddCouponPopUp/AddCouponPopUp";
import {
  enrolledCouponState,
  showCouponPopUpState,
} from "../../store/owner/coupon";

const OwnerCouponPage = () => {
  const [enrolledCoupons, setEnrolledCoupons] =
    useRecoilState(enrolledCouponState);
  const [showCouponPopUp, setShowCouponPopUp] =
    useRecoilState(showCouponPopUpState);

  const onClickAdd = () => {
    setShowCouponPopUp(true);
  };

  const onClickDelete = (coupon) => {
    if (window.confirm(`${coupon.name}을 삭제하시겠습니까?`)) {
      if (
        window.confirm(
          "쿠폰을 삭제하면 다시 복구할 수 없습니다. 정말 삭제 하시겠습니까?"
        )
      ) {
        const filterClickedCoupon = enrolledCoupons.filter(
          (current) => current.name !== coupon.name
        );
        setEnrolledCoupons(filterClickedCoupon);
        alert("제품이 삭제되었습니다.");
      }
    }
  };

  return (
    <OwnerCouponPageWrapper>
      <button onClick={onClickAdd}>새로운 쿠폰 등록하기</button>
      <Title>보유 쿠폰 목록</Title>
      <CouponWrapper>
        <Description>등록한 쿠폰 명</Description>
        <Description>할인율</Description>
        <Description>쿠폰 등록 번호</Description>
        <Description>쿠폰 삭제하기</Description>
      </CouponWrapper>
      {enrolledCoupons.map((coupon) => (
        <CouponWrapper key={coupon.id}>
          <Description>{coupon.name}</Description>
          <Description>{coupon.discount}%</Description>
          <Description>{coupon.enrollNumber}</Description>
          <DeleteButton onClick={() => onClickDelete(coupon)}>
            삭제하기
          </DeleteButton>
        </CouponWrapper>
      ))}
      {showCouponPopUp && <AddCouponPopUp />}
    </OwnerCouponPageWrapper>
  );
};

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
  font-size: 14px;
  width: 100%;
  height: 20px;
  padding: 1em;
  text-align: center;
  line-height: 20px;
`;

const DeleteButton = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  width: 110%;
  border: 1px solid black;
  cursor: pointer;
`;

export default OwnerCouponPage;
