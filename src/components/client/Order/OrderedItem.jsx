import React from "react";
import PropTypes from "prop-types";
import IconX from "../Icon/IconX";
import { useRecoilState } from "recoil";
import { buyingState } from "../../../store/client/buying";
import UpDownBtn from "../../common/UpDownBtn/UpDownBtn";
import styled from "styled-components";

const OrderedItem = ({ item }) => {
  const [buying, setBuying] = useRecoilState(buyingState);

  const onUpBtnClick = (e) => {
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
  };

  const onDownBtnClick = (e) => {
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

  return (
    <OrderedItemWrapper>
      <ThumbnailWrapper>
        <Thumbnail
          src={`http://localhost:8080/image/thumbnail/${
            item.thumbnailImg === undefined
              ? item.thumbnailUrl
              : item.thumbnailImg
          }`}
          alt="사진없음"
        />
      </ThumbnailWrapper>

      <NameWrapper>
        <ItemName>{item.name}</ItemName>
        <OptionName>
          {item.option2 === ""
            ? item.option1
            : item.option1 + ", " + item.option2}
        </OptionName>
      </NameWrapper>

      {item.sale > 0 ? (
        <PriceWrapper name="price-wrapper">
          <span
            name="price"
            style={{ display: "block", textDecoration: "line-through" }}
          >
            {item.price.toLocaleString()}원
          </span>
          <span name="sale-price">
            {((item.price * (100 - item.sale)) / 100).toLocaleString()}원
          </span>
        </PriceWrapper>
      ) : (
        <PriceWrapper id="non-sale">
          {item.price.toLocaleString()}원
        </PriceWrapper>
      )}

      <CounterWrapper>
        <CounterBox>
          <span>{item.count}</span>
        </CounterBox>
        <UpDownBtn
          onUpBtnClick={onUpBtnClick}
          onDownBtnClick={onDownBtnClick}
          width={"50px"}
        />
      </CounterWrapper>
      <IconXWrapper>
        <IconX onClick={onDelClick} />
      </IconXWrapper>
    </OrderedItemWrapper>
  );
};

OrderedItem.propTypes = {};

const OrderedItemWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 0.5px #9e9e9e;
`;

const ThumbnailWrapper = styled.div`
  flex-basis: 20%;
  text-align: center;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
`;

const NameWrapper = styled.div`
  flex-basis: 35%;
`;

const ItemName = styled.div`
  font-weight: bold;
  margin: 3px 0px;
`;

const OptionName = styled.div`
  font-size: 13px;
  color: #707070;
  padding: 10px 0px;
`;

const PriceWrapper = styled.div`
  flex-basis: 15%;
  text-align: center;
`;
const CounterWrapper = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CounterBox = styled.div`
  width: 30%;
  height: 35px;
  border-radius: 5px;
  border: solid 1px #bcbcbc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconXWrapper = styled.div`
  flex-basis: 10%;
  text-align: center;
`;

export default OrderedItem;
