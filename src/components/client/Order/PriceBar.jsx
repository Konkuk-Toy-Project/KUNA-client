import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PriceBar = ({
  salePrice,
  couponSale,
  totalPrice,
  shippingCharge,
  point,
}) => {
  return (
    <PriceBarWrapper>
      <p>
        <PriceType>총 상품가격:</PriceType>
        <Price>
          <span>{salePrice.toLocaleString()}</span>원
        </Price>
      </p>
      -
      <p>
        <PriceType>쿠폰 할인:</PriceType>
        <Price>
          <span>{couponSale.toLocaleString()}</span>원
        </Price>
      </p>
      -
      <p>
        <PriceType>포인트 사용:</PriceType>
        <Price>
          <span>{point.toLocaleString()}</span>원
        </Price>
      </p>
      +
      <p>
        <PriceType>배송비:</PriceType>
        <Price>
          <span>{shippingCharge.toLocaleString()}</span>원
        </Price>
      </p>
      =
      <TotalPriceWrapper>
        <TotalPrice>
          {(totalPrice + shippingCharge - point).toLocaleString()}
        </TotalPrice>
        <TotalWon>원</TotalWon>
      </TotalPriceWrapper>
    </PriceBarWrapper>
  );
};

PriceBar.propTypes = {
  defaultPrice: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  shippingCharge: PropTypes.number.isRequired,
};

const PriceBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #9e9e9e;
  padding-right: 10px;
`;

const PriceType = styled.span`
  padding: 0 3px;
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: bold;
`;
const TotalPrice = styled.span`
  font-size: 23px;
  font-weight: bold;
  color: #ab47bc;
`;

const TotalPriceWrapper = styled.span`
  display: flex;
  align-items: center;
`;
const TotalWon = styled.span`
  display: inline-border;
  padding-top: 7px;
  font-size: 15px;
  font-weight: bold;
  color: #ab47bc;
`;

export default PriceBar;
