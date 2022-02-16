import React from "react";
import PropTypes from "prop-types";

const PriceBar = ({
  defaultPrice,
  salePrice,
  couponSale,
  point,
  totalPrice,
  shippingCharge,
}) => {
  return (
    <div>
      <p>
        총 상품가격:
        <strong>
          <span>{defaultPrice}</span>원
        </strong>
      </p>
      -
      <p>
        상품 할인
        <strong>
          <span>{defaultPrice - salePrice}</span>원
        </strong>
      </p>
      -
      <p>
        쿠폰 할인
        <strong>
          <span>{couponSale}</span>원
        </strong>
      </p>
      -
      <p>
        포인트 사용
        <strong>
          <span>{point}</span>원
        </strong>
      </p>
      +
      <p>
        배송비
        <strong>
          <span>{shippingCharge}</span>원
        </strong>
      </p>
      <p>
        합계
        <strong>
          <span>{totalPrice + shippingCharge}</span>원
        </strong>
      </p>
    </div>
  );
};

PriceBar.propTypes = {
  defaultPrice: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  shippingCharge: PropTypes.number.isRequired,
};

export default PriceBar;
