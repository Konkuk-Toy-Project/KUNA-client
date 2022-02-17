import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconX from "../Icon/IconX";
import axios from "axios";
import { buyingState } from "../../../store/client/buying";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../store/common/user";

const PER = "percent";
const TOTAL_PRICE_ = "total_price_";

const CouponSelector = ({
  salePrice,
  couponSale,
  setCouponSale,
  setCouponId,
}) => {
  const [didUsedCoupon, setDidUsedCoupon] = useState(false);
  const [allCoupons, setAllCoupons] = useState([]);
  const [availCoupons, setAvailCoupons] = useState([]);
  const buying = useRecoilValue(buyingState);
  const userToken = useRecoilValue(userTokenState);

  const onCouponSel = (e) => {
    const selCp = availCoupons.find((c) => c.couponId == e.target.value);
    setCouponSale(
      selCp.couponKind === PER ? (salePrice * selCp.rate) / 100 : selCp.rate
    );
    setDidUsedCoupon(true);
    setCouponId(selCp.couponId); // orderPage로 선택쿠폰 정보 보내주기
  };

  const onRemoveCoupon = () => {
    setDidUsedCoupon(false);
    setCouponSale(0);
    setCouponId(""); //orderPage로 쿠폰 제거 정보 보내주기
  };

  // 고려사항 : 만료날짜 충족, 총금액 충족, 사용여부 no
  // couponKind: 쿠폰 종류(percent-퍼센트 할인, static-고정 할인액)
  // rate: 할인 정도
  // expiredDate: 만료일자
  // couponCondition: 쿠폰 사용 조건(total_price_숫자)
  // name: 쿠폰 이름
  // isUsed: 사용 여부
  // couponId: 쿠폰 고유 id

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:8080/coupon", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log(response.data);
      setAllCoupons(response.data);
    } catch (error) {
      alert(
        error.response
          ? error.response.message
          : "오류가 발생했습니다. 다시 시도해주세요"
      );
    }
  }, []);

  useEffect(() => {
    setAvailCoupons(
      allCoupons.filter(
        (c) =>
          c.isUsed === false &&
          parseInt(c.couponCondition.replace(TOTAL_PRICE_, "")) >= salePrice &&
          c.couponKind === PER
            ? true
            : salePrice - c.rate >= 0
        // 만료날짜 어떻게 추가할건지
      )
    );
  }, [buying, allCoupons, salePrice]);

  return (
    <div>
      <label>쿠폰</label>
      <select name="coupons" disabled={didUsedCoupon} onChange={onCouponSel}>
        <option disabled selected={!didUsedCoupon}>
          쿠폰 선택하기
        </option>
        {availCoupons.map((coupon) => (
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
  totalPrice: PropTypes.number.isRequired,
  defaultPrice: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
  setCouponId: PropTypes.func.isRequired,
};

export default CouponSelector;
