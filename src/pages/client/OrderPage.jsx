import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import CouponSelector from "../../components/client/Order/CouponSelector.jsx";
import OrderedItems from "../../components/client/Order/OrderedItems.jsx";
import { OrderList } from "../../components/client/Order/OrderList.jsx";
import OrderWriteInfo from "../../components/client/Order/OrderWriteInfo.jsx";
import PayMthdSelector from "../../components/client/Order/PayMthdSelector.jsx";
import PriceBar from "../../components/client/Order/PriceBar.jsx";
import PriceBox from "../../components/client/Order/PriceBox.jsx";
import UsingPoint from "../../components/client/Order/UsingPoint.jsx";
import {
  buyingDefaultPrice,
  buyingSalePrice,
  buyingState,
} from "../../store/client/buying.js";
import { userTokenState } from "../../store/common/user.js";

const SHIPPING = 3000;
const SHIP_FREE_PRICE = 50000;

const OrderPage = () => {
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenState);

  const [defaultPrice, setDefaultPrice] = useState(
    useRecoilValue(buyingDefaultPrice)
  );
  const [salePrice, setSalePrice] = useState(useRecoilValue(buyingSalePrice));
  const [couponSale, setCouponSale] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(SHIPPING);

  const [totalPrice, setTotalPrice] = useState(defaultPrice);

  const [inputData, setInputData] = useState({});
  const [couponId, setCouponId] = useState();
  const [usePoint, setUsePoint] = useState(0);
  const [payMethod, setPayMethod] = useState();

  const [isInputFilled, setIsInputFilled] = useState(false);
  const [isPayMthdChecked, setIsPayMthdChecked] = useState(false);

  const [buying, setBuying] = useRecoilState(buyingState);

  useEffect(() => {
    if (buying.length === 0) {
      alert("임의로 접근할 수 없는 페이지입니다. 이전페이지로 이동합니다. ");
      navigate(-1);
    }
  }, [buying]);

  useEffect(
    () => setTotalPrice(salePrice - couponSale),
    [defaultPrice, salePrice, couponSale, usePoint]
  );
  useEffect(() => {
    setShippingCharge(totalPrice >= SHIP_FREE_PRICE ? 0 : SHIPPING);
  }, [totalPrice]);

  const onPayBtnClick = () => {
    if (!isInputFilled || !isPayMthdChecked) {
      alert(
        !isInputFilled
          ? "주문 정보를 모두 채워주세요."
          : "결제수단을 선택해주세요."
      );
      return;
    }
    postOrder();
  };
  const postOrder = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/order",
        {
          ...inputData,
          payMethod: payMethod,
          usePoint: usePoint,
          couponId: couponId === undefined ? "" : couponId,
          totalPrice: totalPrice, //전체 주문 금액(택배비 미포함)
          shippingCharge: shippingCharge, //택배비
          orderItems: buying.map((item) => {
            return {
              itemId: item.itemId,
              option1Id: item.option1Id,
              option2Id: item.option2Id,
              count: item.count,
            };
          }),
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = response.data;
      setBuying([]);
      navigate(
        `/order/complete?orderId=${data.orderId}&totalPrice=${data.totalPrice}&shippingCharge=${data.shippingCharge}&orderDate=${data.orderDate}`,
        { replace: true }
      );
    } catch (error) {
      const response = error.response;
      alert(
        response && response.errorCode !== undefined
          ? response.message
          : "오류가 발생하였습니다. 다시 시도해주세요"
      );
    }
  }, [
    buying,
    totalPrice,
    inputData,
    couponId,
    shippingCharge,
    usePoint,
    payMethod,
  ]);

  return (
    <OrderPageWrapper>
      {buying.length === 0 ? null : (
        <>
          <LeftSection>
            <SectionTitleWrapper>
              <SectionTitleSpan>주문 상품</SectionTitleSpan>
            </SectionTitleWrapper>
            <OrderedItems
              setDefaultPrice={setDefaultPrice}
              setSalePrice={setSalePrice}
            />
            <PriceBar
              salePrice={salePrice}
              couponSale={couponSale}
              point={usePoint}
              totalPrice={totalPrice}
              shippingCharge={shippingCharge}
            />

            <SectionTitleWrapper>
              <SectionTitleSpan>주문 정보</SectionTitleSpan>
            </SectionTitleWrapper>
            <OrderWriteInfo
              setData={setInputData}
              setIsFilled={setIsInputFilled}
            />

            <SubInputUl>
              <OrderList>
                <CouponSelector
                  salePrice={salePrice}
                  couponSale={couponSale}
                  setCouponSale={setCouponSale}
                  setCouponId={setCouponId}
                />
              </OrderList>
              <OrderList>
                <UsingPoint
                  salePrice={salePrice}
                  couponSale={couponSale}
                  setUsePoint={setUsePoint}
                />
              </OrderList>
              <OrderList>
                <PayMthdSelector
                  setPayMethod={setPayMethod}
                  setIsChecked={setIsPayMthdChecked}
                />
              </OrderList>
            </SubInputUl>
          </LeftSection>

          <PriceBoxWrapper>
            <PriceBox
              salePrice={salePrice}
              couponSale={couponSale}
              point={usePoint}
              shippingCharge={shippingCharge}
            />
            <PayButton onClick={onPayBtnClick}>결제하기</PayButton>
          </PriceBoxWrapper>
        </>
      )}
    </OrderPageWrapper>
  );
};

const OrderPageWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
  display: flex;
  align-item: flex-start;
`;

const LeftSection = styled.div`
  flex-basis: 75%;
`;

const SubInputUl = styled.ul`
  border-bottom: solid black 1.5px;
  padding: 30px 0px;
  margin-bottom: 30px;
`;

const SectionTitleWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 5px 0px;
  border-bottom: solid black 1.5px;
  margin-top: 50px;
`;

const SectionTitleSpan = styled.span`
  padding: 5px;
`;

const PriceBoxWrapper = styled.div`
  position: sticky;
  width: 350px;
  height: 330px;
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  margin-left: 30px;
  top: 25%;
  left: 0;
`;

const PayButton = styled.button`
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 5px;
  color: white;
  background-color: #ab47bc;
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
  cursor: pointer;
  &:hover {
    background-color: #790e8b;
  }
`;
export default OrderPage;
