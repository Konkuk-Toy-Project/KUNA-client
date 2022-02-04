import React, { useEffect, useState } from "react";
import IconX from "../Icon/IconX.jsx";

const PER = "percent";
const CREDIT = "credit";
const BANK_BOOK = "bankbook";
const PAY_METHOD = "payMethod";

const OrderPage = () => {
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(30000);
  const [dcPrice, setDcPrice] = useState(totalPrice);
  const [didUsedCoupon, setDidUsedCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [payMethod, setPayMethod] = useState("");

  const onCouponSel = (e) => {
    console.log(e.target.value);
    const selCp = coupons.find((c) => c.couponId == e.target.value);
    console.log(selCp);
    setDcPrice(
      selCp.couponKind === PER
        ? (totalPrice * (100 - selCp.rate)) / 100
        : totalPrice - selCp.rate
    );
    setDidUsedCoupon(true);
  };

  const onRemoveCoupon = () => {
    setDidUsedCoupon(false);
  };

  const onPayMthdClick = (e) => {
    setPayMethod(e.target.value);
  };

  useEffect(() => {
    console.log("로그인 상태인지 판단");
    console.log("아이템 정보들 받아오기");
    console.log("input관련 정보들 받아오기(주소 등))"); // => input 관련 컴포넌트로 넘겨주기
  }, []);

  useEffect(() => {
    console.log("setTotalPrice이용해서 총 금액 받아오기");
    console.log("아이템 수량 바뀔때 마다 total price 바꿔주기");
    console.log("쿠폰 관련 정보들 받아오기 - 사용 가능한 쿠폰들만");
    setCoupons([
      {
        couponKind: "percent",
        rate: 40,
        name: "신규회원 할인 쿠폰",
        couponId: 1111,
      },
      {
        couponKind: "static",
        rate: 1500,
        name: "그냥 할인 쿠폰",
        couponId: 1131,
      },
      {
        couponKind: "percent",
        rate: 20,
        name: "신규회원 할인 쿠폰",
        couponId: 1121,
      },
    ]);
    // 고려사항 : 만료날짜 충족, 총금액 충족, 사용여부 no
    // couponKind: 쿠폰 종류(percent-퍼센트 할인, static-고정 할인액)
    // rate: 할인 정도
    // expiredDate: 만료일자
    // couponCondition: 쿠폰 사용 조건(total_price_숫자)
    // name: 쿠폰 이름
    // isUsed: 사용 여부
    // couponId: 쿠폰 고유 id
  }, [items]);
  console.log("할인 금액: " + dcPrice);

  return (
    <div>
      {/* 
      아이템 컴포넌트 
      총 금액 컴포넌트 
      정보 입력 컴포넌트
      결제 방식 컴포넌트 
      결제하기 버튼  
      */}

      {/* 쿠폰 선택 */}
      <div name="couponContainer">
        <label>쿠폰</label>
        <select name="coupons" disabled={didUsedCoupon} onChange={onCouponSel}>
          <option disabled selected={!didUsedCoupon}>
            쿠폰 선택하기
          </option>
          {coupons.map((coupon) => (
            <option key={coupon.couponId} value={coupon.couponId}>
              {coupon.name}
              {` (${coupon.rate}${
                coupon.couponKind === PER ? "%" : "원"
              } 할인)`}
            </option>
          ))}
        </select>
        {didUsedCoupon ? (
          <button onClick={onRemoveCoupon}>
            <IconX />
          </button>
        ) : null}
      </div>

      {/* 결제 방식 선택 */}
      <div name="paymentContainer">
        <label>결제 방식</label>
        <ul>
          <li>
            <input
              type="radio"
              id={CREDIT}
              name={PAY_METHOD}
              value={CREDIT}
              onClick={onPayMthdClick}
            />
            <label htmlFor={CREDIT}>신용카드</label>
          </li>
          <li>
            <input
              type="radio"
              id={BANK_BOOK}
              name={PAY_METHOD}
              value={BANK_BOOK}
              onClick={onPayMthdClick}
            />
            <label htmlFor={BANK_BOOK}>계좌이체</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
