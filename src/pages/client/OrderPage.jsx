import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CouponSelector from "../../components/client/Order/CouponSelector.jsx";
import OrderedItems from "../../components/client/Order/OrderedItems.jsx";
import OrderWriteInfo from "../../components/client/Order/OrderWriteInfo.jsx";
import PayMthdSelector from "../../components/client/Order/PayMthdSelector.jsx";
import PriceBar from "../../components/client/Order/PriceBar.jsx";
import UsingPoint from "../../components/client/Order/UsingPoint.jsx";
import { buyingState } from "../../store/client/buying.js";

const OrderPage = () => {
  const [items, setItems] = useState([
    { itemId: 1214, option1Id: 2351, option2Id: 21523, count: 2 },
    { itemId: 1213, option1Id: 23451, option2Id: 2523, count: 1 },
  ]);

  const [defaultPrice, setDefaultPrice] = useState(30000);
  const [totalPrice, setTotalPrice] = useState(defaultPrice);
  const [shippingCharge, setShippingCharge] = useState(3000);

  const [inputData, setInputData] = useState({});
  const [couponId, setCouponId] = useState({ couponId: "" });
  const [usePoint, setUsePoint] = useState({ usePoint: 0 });
  const [payMethod, setPayMethod] = useState({ payMethod: "" });

  const [isInputFilled, setIsInputFilled] = useState(false);
  const [isPayMthdChecked, setIsPayMthdChecked] = useState(false);

  const buying = useRecoilValue(buyingState);
  const navigate = useNavigate();

  const [data, setData] = useState({
    address: "", //배송지 주소
    recipient: "", //수령인
    phone: "", //수령인 전화번호
    payMethod: "", //결제 방법(card, bankbook)
    usePoint: "", //포인트 사용액
    totalPrice: 0, //전체 주문 금액(택배비 미포함)
    shippingCharge: 0, //택배비
    couponId: "", //쿠폰 사용 Id
    orderItems: {
      // //주문 상품들
      // itemId: "", //상품 고유 Id
      // option1Id: "", //옵션1 고유 id
      // option2Id: "", //옵션2 고유 id
      // count: "", //구매 개수
    },
  });

  useEffect(() => {
    if (buying.length === 0) navigate("/");

    console.log("input관련 정보들 받아오기(주소 등))"); // => input 관련 컴포넌트로 넘겨주기
  }, [buying]);

  const onPayBtnClick = () => {
    if (isInputFilled && isPayMthdChecked) {
      setData({
        ...inputData,
        ...payMethod,
        ...usePoint,
        ...couponId,
        totalPrice: totalPrice, //전체 주문 금액(택배비 미포함)
        shippingChage: 0, //택배비
        orderItems: {
          ...items,
        },
      });
    }
  };

  // console.log(inputData);
  // console.log(couponId);
  // console.log(payMethod);
  // console.log(items);
  console.log(data);

  return (
    <div>
      {/* 
      아이템 컴포넌트 
      총 금액 컴포넌트 
      정보 입력 컴포넌트
      쿠폰 사용 컴포넌트 
      포인트 사용 컴포넌트 
      결제 방식 컴포넌트 
      결제하기 버튼  
    */}
      <OrderedItems
        setDefaultPrice={setDefaultPrice}
        setTotalPrice={setTotalPrice}
      />
      <PriceBar
        defaultPrice={defaultPrice}
        totalPrice={totalPrice}
        shippingCharge={shippingCharge}
      />

      <OrderWriteInfo setData={setInputData} setIsFilled={setIsInputFilled} />
      <CouponSelector
        items={items}
        defaultPrice={defaultPrice}
        setTotalPrice={setTotalPrice}
        setCouponId={setCouponId}
      />
      <UsingPoint setUsePoint={setUsePoint} />
      <PayMthdSelector
        setPayMethod={setPayMethod}
        setIsChecked={setIsPayMthdChecked}
      />
      <button
        disabled={!isInputFilled || !isPayMthdChecked}
        onClick={onPayBtnClick}
      >
        결제하기
      </button>
    </div>
  );
};

export default OrderPage;
