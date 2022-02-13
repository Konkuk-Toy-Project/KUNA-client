import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconX from "../Icon/IconX";
import { useRecoilState } from "recoil";
import { buyingState } from "../../../store/client/buying";

const UP = "up";
const DOWN = "down";

const OrderedItem = ({ item }) => {
  const [buying, setBuying] = useRecoilState(buyingState);

  const onClick = (e) => {
    switch (e.target.name) {
      case UP:
        item.count < item.stock
          ? setBuying(
              buying.map((i) =>
                i.itemId === item.itemId &&
                i.option1Id === item.option1Id &&
                i.option2Id === item.option2Id
                  ? { ...i, count: i.count + 1 }
                  : i
              )
            )
          : alert("수량 초과입니다.");

        break;
      case DOWN:
        if (item.count > 1) {
          setBuying(
            buying.map((i) =>
              i.itemId === item.itemId &&
              i.option1Id === item.option1Id &&
              i.option2Id === item.option2Id
                ? { ...i, count: i.count - 1 }
                : i
            )
          );
        }
    }
  };

  const onDelClick = () => {
    if (buying.length === 1) {
      alert("주문할 상품은 1개 이상이어야 합니다.");
      return;
    }
    setBuying(
      buying.filter(
        (i) =>
          !(
            i.itemId === item.itemId &&
            i.option1Id === item.option1Id &&
            i.option2Id === item.option2Id
          )
      )
    );
  };

  console.log(buying);
  return (
    <div>
      <div>{item.name}</div>
      <div>
        <img src={item.thumbnail} alt="사진없음" />
        <div>
          {item.option2 === ""
            ? item.option1
            : item.option1 + ", " + item.option2}
        </div>

        {item.sale > 0 ? (
          <div name="price-wrapper">
            <span
              name="price"
              style={{ display: "block", textDecoration: "line-through" }}
            >
              {item.price}원
            </span>
            <span name="sale">{item.sale}%</span>
            <span name="sale-price">
              {(item.price * (100 - item.sale)) / 100}원
            </span>
          </div>
        ) : (
          <div id="non-sale">{item.price}원</div>
        )}

        <div>
          <label>수량</label>
          <span>{item.count}</span>
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
      <IconX onClick={onDelClick} />
    </div>
  );
};

OrderedItem.propTypes = {};

export default OrderedItem;
