import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import QueryString from "qs";
import IconCircleCheck from "../../components/client/Icon/IconCircleCheck";
import styled from "styled-components";
import OrderLabel from "../../components/client/Order/OrderLabel";
// orderId: 주문 번호
// totalPrice: 전체 주문 금액(택배비 미포함)
// shippingcharge: 택배비
// orderDate: 주문일시

const OrderFinPage = () => {
  const location = useLocation();
  const orderInfo = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const dateTime = orderInfo.orderDate.split("T");
    setDate(dateTime[0]);
    setTime(dateTime[1].substring(0, 8));
  }, [orderInfo]);
  const onClick = () => navigate("/");
  return (
    <OrderFinPageWrapper>
      <IconWrapper>
        <IconCircleCheck color="#494949" />
      </IconWrapper>
      <P>주문이 완료되었습니다!</P>
      <Ul>
        <Li>
          <Label>주문번호</Label>
          <RightSpan>{orderInfo.orderId}</RightSpan>
        </Li>
        <Li>
          <Label>주문일시</Label>
          <RightSpan>{`${date} ${time}`}</RightSpan>
        </Li>
        <Li>
          <Label>총 결제금액</Label>
          <RightSpan>
            {(
              parseInt(orderInfo.totalPrice) +
              parseInt(orderInfo.shippingCharge)
            ).toLocaleString()}
            원
          </RightSpan>
        </Li>
      </Ul>
      <Button onClick={onClick}>메인페이지로 돌아가기</Button>
    </OrderFinPageWrapper>
  );
};

OrderFinPage.propTypes = {};

const OrderFinPageWrapper = styled.div`
  width: 590px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IconWrapper = styled.div`
  margin: 20px 0;
`;

const P = styled.p`
  font-size: 16px;
  margin: 20px;
`;

const Ul = styled.ul`
  width: 60%;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 30px;
`;
const Li = styled.li`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-item: center;
  height: 50px;
  width: 100%;
  padding: 0 20px;
`;
const Label = styled.label`
  display: inline-block;
  flex-basis: 40%;
  font-weight: bold;
  line-height: 50px;
`;

const RightSpan = styled.span`
  display: inline-block;
  flex-basis: 50%;
  line-height: 50px;
  text-align: right;
`;

const Button = styled.button`
  display: inline-block;
  margin: 20px 0;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #494949;
  color: white;
  width: 70%;
  height: 50px;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: black;
  }
`;
export default OrderFinPage;
