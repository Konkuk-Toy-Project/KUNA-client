import { React } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import QueryString from "qs";
// orderId: 주문 번호
// totalPrice: 전체 주문 금액(택배비 미포함)
// shippingcharge: 택배비
// orderDate: 주문일시

const OrderFinPage = () => {
  const location = useLocation();
  const orderInfo = QueryString.parse(location.search, { IgnorePrefix: true });
  console.log(orderInfo);
  return (
    <div>
      <h2>주문이 완료되었습니다!</h2>
      <ul>
        <li>
          <label>주문번호</label>
          <span>{orderInfo.orderId}</span>
        </li>
        <li>
          <label>주문일시</label>
          <span>{orderInfo.orderDate}</span>
        </li>
        <li>
          <label>총 결제금액</label>
          <span>
            {parseInt(orderInfo.totalPrice) +
              parseInt(orderInfo.shippingCharge)}
            원
          </span>
        </li>
      </ul>
    </div>
  );
};

OrderFinPage.propTypes = {};

export default OrderFinPage;
