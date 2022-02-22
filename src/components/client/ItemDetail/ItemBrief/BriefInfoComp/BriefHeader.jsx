import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LikeBtn from "./LikeBtn";

const BriefHeader = ({ state, name, price, sale, like, id }) => {
  return (
    <BriefHeaderWrapper>
      <ItemTitle name="item-title">
        {name}
        {state === "sold_out" ? <span>품절</span> : null}
      </ItemTitle>

      <ItemWrapper id="sale-container">
        {sale > 0 ? (
          <>
            <SaleItemDefaultPrice name="price">
              {price.toLocaleString()}원
            </SaleItemDefaultPrice>
            <SaleSpanWrapper>
              <SaleRate name="sale">{sale}</SaleRate>
              <UnitSpan color="plum">%</UnitSpan>
            </SaleSpanWrapper>
            <SaleSpanWrapper>
              <SalePrice name="sale-price">
                {((price * (100 - sale)) / 100).toLocaleString()}
              </SalePrice>
              <UnitSpan>원</UnitSpan>
            </SaleSpanWrapper>
          </>
        ) : (
          <NonSaleItemPrice id="non-sale-container">{price}원</NonSaleItemPrice>
        )}
        <LikeWrapper>
          <LikeBtn itemId={id} num={like} />
        </LikeWrapper>
      </ItemWrapper>
    </BriefHeaderWrapper>
  );
};

BriefHeader.propTypes = {
  state: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.number.isRequired,
};

const BriefHeaderWrapper = styled.div``;
const ItemTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
`;

const ItemWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px 0;
  border-top: solid 2px #bdbdbd;
`;

const SaleItemDefaultPrice = styled.span`
  display: block;
  font-size: 16px;
  color: #707070;
  text-decoration: line-through;
  margin-bottom: 5px;
`;

const SaleRate = styled.span`
  font-size: 24px;
  color: #ab47bc;
  font-weight: bold;
`;
const UnitSpan = styled.span`
  font-size: 18px;
  color: ${({ color }) => (color === "plum" ? "#ab47bc" : "black")};
  font-weight: bold;
`;
const SalePrice = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const NonSaleItemPrice = styled.span`
  display: block;
  font-size: 24px;
`;

const SaleSpanWrapper = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const LikeWrapper = styled.div`
  margin: 15px 0 0 0;
`;
export default BriefHeader;
