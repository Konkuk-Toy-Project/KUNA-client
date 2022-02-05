import React, { useEffect, useState } from "react";
import CouponSelector from "./CouponSelector.jsx";
import OrderWriteInfo from "./OrderWriteInfo.jsx";
import PayMthdSelector from "./PayMthdSelector.jsx";
import UsingPoint from "./UsingPoint.jsx";

const OrderPage = () => {
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([]);
  const [defaultPrice, setDefaultPrice] = useState(30000);
  const [totalPrice, setTotalPrice] = useState(defaultPrice);

  const [payMethod, setPayMethod] = useState({ ["payMethod"]: "" });
  const [inputData, setInputData] = useState({});
  const [couponId, setCouponId] = useState({ ["couponId"]: "" });
  const [usePoint, setUsePoint] = useState({ ["usePoint"]: 0 });

  const [data, setData] = useState({
    address: "", //배송지 주소
    recipient: "", //수령인
    phone: "", //수령인 전화번호
    payMethod: "", //결제 방법(card, bankbook)
    usePoint: "", //포인트 사용액
    totalPrice: "", //전체 주문 금액(택배비 미포함)
    shippingChage: "", //택배비
    couponId: "", //쿠폰 사용 Id
    orderItems: {
      //주문 상품들
      itemId: "", //상품 고유 Id
      option1Id: "", //옵션1 고유 id
      option2Id: "", //옵션2 고유 id
      count: "", //구매 개수
    },
  });

  useEffect(() => {
    console.log("로그인 상태인지 판단");
    console.log("아이템 정보들 받아오기");
    console.log("input관련 정보들 받아오기(주소 등))"); // => input 관련 컴포넌트로 넘겨주기
  }, []);

  console.log(inputData);
  console.log(couponId);
  console.log("할인 금액: " + totalPrice);
  console.log(payMethod);

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
      <OrderWriteInfo setData={setInputData} />
      <CouponSelector
        items={items}
        defaultPrice={defaultPrice}
        setTotalPrice={setTotalPrice}
        setCouponId={setCouponId}
      />
      <UsingPoint setUsePoint={setUsePoint} />
      <PayMthdSelector setPayMethod={setPayMethod} />
    </div>
  );
};

export default OrderPage;
