import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconX from "../Icon/IconX";

const PER = "percent";

const CouponSelector = ({
  items,
  defaultPrice,
  setTotalPrice,
  setCouponId,
}) => {
  const [didUsedCoupon, setDidUsedCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const onCouponSel = (e) => {
    console.log(e.target.value);
    const selCp = coupons.find((c) => c.couponId == e.target.value);
    console.log(selCp);
    setTotalPrice(
      selCp.couponKind === PER
        ? (defaultPrice * (100 - selCp.rate)) / 100
        : defaultPrice - selCp.rate
    );
    setDidUsedCoupon(true);
    setCouponId({ ["couponID"]: selCp.couponId }); // orderPage로 선택쿠폰 정보 보내주기
  };

  const onRemoveCoupon = () => {
    setDidUsedCoupon(false);
    setTotalPrice(defaultPrice);
    setCouponId({ ["couponID"]: "" }); //orderPage로 쿠폰 제거 정보 보내주기
  };

  useEffect(() => {
    console.log(
      "쿠폰정보 받아오기-> 사용가능한 쿠폰만 setCoupons 로 넣어주기 " //---------------- 미구현
    );
  }, []);

  useEffect(() => {
    //---------------- 미구현
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

  return (
    <div>
      <label>쿠폰</label>
      <select name="coupons" disabled={didUsedCoupon} onChange={onCouponSel}>
        <option disabled selected={!didUsedCoupon}>
          쿠폰 선택하기
        </option>
        {coupons.map((coupon) => (
          <option key={coupon.couponId} value={coupon.couponId}>
            {coupon.name}
            {` (${coupon.rate}${coupon.couponKind === PER ? "%" : "원"} 할인)`}
          </option>
        ))}
      </select>
      {didUsedCoupon ? <IconX onClick={onRemoveCoupon} /> : null}
    </div>
  );
};

CouponSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultPrice: PropTypes.number.isRequired,
  setDcPrice: PropTypes.func.isRequired,
  setCouponId: PropTypes.func.isRequired,
};

export default CouponSelector;
