import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconX from "../Icon/IconX";

const UP = "up";
const DOWN = "down";

const OrderedItem = ({ itemData, itemsData, setItems, setDefaultPrice }) => {
  const [item, setItem] = useState({
    name: "",
    thumbnail: "",
    price: 0,
    rate: 0,
    option1: "",
    option2: "",
    count: "",
    stock: "",
  });

  // itemId: 상품 고유 id
  // option1Id: 옵션1 고유 id
  // option2Id: 옵션2 고유 id
  // count: 개수
  useEffect(() => {
    setItem({
      name: "sbs927 자꾸자꾸 파스텔 스탠다드핏 셔츠 7colors",
      thumbnail:
        "https://img.sonyunara.com/files/goods/69048/1611793473_21.jpg",
      price: 30000,
      rate: 15,
      option1: "SizeM",
      option2: "파란색",
      count: 2,
      stock: 15,
    });
    // console.log(
    //   "itemId로 검색->반환된 값에서 썸네일,가격,할인율 & option1Id와 option2Id로 옵션 명, stock 가져오기"
    // );
  }, []);
  // useEffect(() => {
  //   // console.log("처음에도 실행되나?");
  // }, [item]);

  const onClick = (e) => {
    switch (e.target.name) {
      case UP:
        if (item.count < item.stock) {
          setItem((cur) => ({ ...item, ["count"]: cur.count + 1 }));
          setItems(
            itemsData.map((i) =>
              i.itemId === itemData.itemId &&
              i.option1Id === itemData.option1Id &&
              i.option2Id === itemData.option2Id
                ? { ...i, count: i.count + 1 }
                : i
            )
          );
        }
        break;
      case DOWN:
        if (item.count > 1) {
          setItem((cur) => ({ ...item, ["count"]: cur.count - 1 }));
          setItems(
            itemsData.map((i) =>
              i.itemId === itemData.itemId &&
              i.option1Id === itemData.option1Id &&
              i.option2Id === itemData.option2Id
                ? { ...i, count: i.count - 1 }
                : i
            )
          );
        }
    }
  };

  const onDelClick = () => {
    if (itemsData.length === 1) {
      alert("주문할 상품은 1개 이상이어야 합니다.");
      return;
    }
    setItems(
      itemsData.filter(
        (i) =>
          !(
            i.itemId === itemData.itemId &&
            i.option1Id === itemData.option1Id &&
            i.option2Id === itemData.option2Id
          )
      )
    );
  };

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
        <div>{(item.price * (100 - item.rate)) / 100}원</div>
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
