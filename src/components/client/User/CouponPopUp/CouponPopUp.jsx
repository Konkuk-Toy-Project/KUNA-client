import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showCouponState } from "../../../../store/client/user";
import { currentY, userTokenState } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const CouponPopUp = () => {
  const [coupons, setCoupons] = useState([]);
  const setShowCoupon = useSetRecoilState(showCouponState);
  const scrollY = useRecoilValue(currentY);
  const [serialNumber, setSerialNumber] = useState("");
  const userToken = useRecoilValue(userTokenState);

  const getCoupons = useCallback(async () => {
    const data = await axios
      .get("http://localhost:8080/coupon", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    setCoupons(data);
  }, [userToken]);

  const registerCoupon = async () => {
    try {
      await axios
        .post(
          "http://localhost:8080/coupon/user",
          {
            serialNumber,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => response.data);
      alert("쿠폰이 등록되었습니다.");
      setShowCoupon(false);
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
  }, [getCoupons]);

  return (
    <CouponPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowCoupon} />
      <EnrolledWrapper>
        <Title>보유 쿠폰 목록</Title>
        <CouponWrapper>
          <Category>쿠폰 명</Category>
          <Category>쿠폰 적용 최소 금액</Category>
          <Category>할인율</Category>
        </CouponWrapper>
        {coupons.map((coupon) => (
          <CouponWrapper key={coupon.id}>
            <Category>{coupon.name}</Category>
            <Category>{getCouponCondition(coupon.couponCondition)}원</Category>
            <Category>{getCouponRate(coupon.couponKind, coupon.rate)}</Category>
          </CouponWrapper>
        ))}
      </EnrolledWrapper>
      <EnrollWrapper>
        <Title>쿠폰 등록하기</Title>
        <EnrollCouponWrapper>
          <EnrollInput type="text" onChange={onChangeRegisterInput} />
          <EnrollButton onClick={onClickRegisterCoupon}>등록하기</EnrollButton>
        </EnrollCouponWrapper>
      </EnrollWrapper>
    </CouponPopUpWrapper>
  );
};

const CouponPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  min-height: 40vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EnrolledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em;
`;

const EnrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em;
`;

const Title = styled.p`
  margin: 1em 0;
  font-size: 24px;
  font-weight: 600;
`;

const CouponWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 1em;
  text-align: center;
`;

const Category = styled.p`
  font-size: 14px;
  width: 10em;
`;

const EnrollCouponWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
`;

const EnrollInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  margin: 0 1em;
`;

const EnrollButton = styled.button`
  border: none;
  background-color: black;
  width: 6em;
  padding: 1em;
  color: white;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

export default CouponPopUp;
