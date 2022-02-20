import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PriceBox = ({ salePrice, couponSale, point, shippingCharge }) => {
  return (
    <PriceBoxWrapper>
      <TotalPriceWrapper>
        <TotalPriceTitle>결제정보</TotalPriceTitle>
        <TotalPrice>
          <TotalOnlyPrice>
            {(salePrice - couponSale - point + shippingCharge).toLocaleString()}
          </TotalOnlyPrice>
          원
        </TotalPrice>
      </TotalPriceWrapper>
      <ul>
        <Li>
          <span>총 상품금액</span> <span>{salePrice.toLocaleString()}원</span>
        </Li>
        <Li>
          <span>- 쿠폰 할인</span> <span>{couponSale.toLocaleString()}원</span>
        </Li>
        <Li>
          <span>- 포인트 사용</span> <span>{point.toLocaleString()}원</span>
        </Li>
        <Li>
          <span>+ 배송비</span> <span>{shippingCharge.toLocaleString()}원</span>
        </Li>
      </ul>
    </PriceBoxWrapper>
  );
};

PriceBox.propTypes = {};

const PriceBoxWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 40px;
`;

const TotalPriceWrapper = styled.div``;

const TotalPriceTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
const TotalOnlyPrice = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #ab47bc;
`;
const TotalPrice = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ab47bc;
  margin: 30px 0;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #757575;
  margin: 8px 0;
`;
export default PriceBox;
