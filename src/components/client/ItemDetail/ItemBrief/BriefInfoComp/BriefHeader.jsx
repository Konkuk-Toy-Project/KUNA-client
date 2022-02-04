import React from "react";
import PropTypes from "prop-types";

const BriefHeader = ({ state, name, price, sale }) => {
  return (
    <div>
      <h4 name="item-title">
        {name}
        {state === "sold_out" ? <span>품절</span> : null}
      </h4>

      {sale > 0 ? (
        <div id="sale-container">
          <span
            name="price"
            style={{ display: "block", textDecoration: "line-through" }}
          >
            {price}원
          </span>
          <span name="sale">{sale}%</span>
          <span name="sale-price">{(price * (100 - sale)) / 100}원</span>
        </div>
      ) : (
        <div id="non-sale-container">{price}원</div>
      )}
    </div>
  );
};

BriefHeader.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.number.isRequired,
};

export default BriefHeader;
