import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { buyingState } from "../../../store/client/buying";
import OrderedItem from "./OrderedItem";
import styled from "styled-components";

const OrderedItems = ({ setDefaultPrice, setSalePrice }) => {
  const [buying, setBuying] = useRecoilState(buyingState);

  useEffect(() => {
    setDefaultPrice(
      buying.map((i) => i.count * i.price).reduce((prev, post) => prev + post)
    );
    setSalePrice(
      buying
        .map((i) => (i.count * i.price * (100 - i.sale)) / 100)
        .reduce((prev, post) => prev + post)
    );
  }, [buying]);

  return (
    <div>
      {buying.map((item, idx) => (
        <OrderedItem key={"o_item_" + idx} item={item} />
      ))}
    </div>
  );
};

OrderedItems.propTypes = {};

export default OrderedItems;
