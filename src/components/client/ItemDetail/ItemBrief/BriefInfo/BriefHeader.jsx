import React from "react";
import PropTypes from "prop-types";

const ItemHeader = ({ name, price, discount }) => {
  return (
    <div>
      <h4 name="item-title">{name}</h4>

      {discount > 0 ? (
        <div id="sale-container">
          <span
            name="price"
            style={{ display: "block", textDecoration: "line-through" }}
          >
            {price}원
          </span>
          <span name="discount">{discount}%</span>
          <span name="sale-price">{(price * (100 - discount)) / 100}원</span>
        </div>
      ) : (
        <div id="non-sale-container">{price}원</div>
      )}
    </div>
  );
};

ItemHeader.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
};

export default ItemHeader;
