import React from "react";
import PropTypes from "prop-types";

const PriceBox = ({ salePrice, couponSale, point, shippingCharge }) => {
  return (
    <div>
      <div>결제정보</div>
      <div>
        <strong>{salePrice - couponSale - point + shippingCharge}</strong>원
      </div>
      <ul>
        <li>
          <span>총 상품금액</span> <span>{salePrice}</span>원
        </li>
        <li>
          <span>- 쿠폰 할인</span> <span>{couponSale}</span>원
        </li>
        <li>
          <span>- 포인트 사용</span> <span>{point}</span>원
        </li>
        <li>
          <span>+ 배송비</span> <span>{shippingCharge}</span>원
        </li>
      </ul>
    </div>
  );
};

PriceBox.propTypes = {};

export default PriceBox;
