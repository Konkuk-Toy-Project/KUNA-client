import React, { useState } from "react";
import PropTypes from "prop-types";
import IconX from "../Icon/IconX";

const UP = "up";
const DOWN = "down";

const OrderedItem = ({ item }) => {
  const title = "sbs927 자꾸자꾸 파스텔 스탠다드핏 셔츠 7colors";
  const thumbnail =
    "https://img.sonyunara.com/files/goods/69048/1611793473_21.jpg";
  const option1 = "SizeM";
  const option2 = "파란색";
  const price = 30000;
  const discount = 15;
  const stack = 15;

  const [count, setCount] = useState(1);
  const onClick = (e) => {
    switch (e.target.name) {
      case UP:
        if (count < stack) setCount((cur) => cur + 1);
        break;
      case DOWN:
        if (count > 1) setCount((cur) => cur - 1);
    }
  };

  return (
    <div>
      <div>{title}</div>
      <div>
        <img src={thumbnail} alt="사진없음" />
        <div>{option2 === "" ? option1 : option1 + ", " + option2}</div>
        <div>{(price * (100 - discount)) / 100}원</div>
        <div>
          <label>수량</label>
          <span>{count}</span>
          <div>
            <button name={UP} onClick={onClick}>
              🔼
            </button>
            <button name={DOWN} onClick={onClick}>
              🔽
            </button>
          </div>
        </div>
      </div>
      <IconX />
    </div>
  );
};

OrderedItem.propTypes = {};

export default OrderedItem;
