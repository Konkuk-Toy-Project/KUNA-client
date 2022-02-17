import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import CouponSelector from "../../components/client/Order/CouponSelector.jsx";
import OrderedItems from "../../components/client/Order/OrderedItems.jsx";
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
    if (buying.length === 0) navigate("/");
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
    console.log({
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
    });
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
        `/order/complete?orderId=${data.orderId}&totalPrice=${data.totalPrice}&shippingCharge=${data.shippingCharge}&orderDate=${data.orderDate}`
      );
    } catch (error) {
      const response = error.response;
      //console.log(error.response.errorCode);
      alert(
        response && response.errorCode !== undefined
          ? response.message
          : "오류가 발생하였습니다. 다시 시도해주세요"
      );
      // window.location.reload();
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

  // console.log(inputData);
  // console.log(couponId);
  // console.log(payMethod);
  // console.log(items);
  ///console.log(data);

  return (
    <div>
      <div>
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

        <OrderWriteInfo setData={setInputData} setIsFilled={setIsInputFilled} />
        <CouponSelector
          salePrice={salePrice}
          couponSale={couponSale}
          setCouponSale={setCouponSale}
          setCouponId={setCouponId}
        />
        <UsingPoint
          salePrice={salePrice}
          couponSale={couponSale}
          setUsePoint={setUsePoint}
        />
        <PayMthdSelector
          setPayMethod={setPayMethod}
          setIsChecked={setIsPayMthdChecked}
        />
      </div>

      <div>
        <PriceBox
          salePrice={salePrice}
          couponSale={couponSale}
          point={usePoint}
          shippingCharge={shippingCharge}
        />
        <button
          disabled={!isInputFilled || !isPayMthdChecked}
          onClick={onPayBtnClick}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
