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
  const navigate = useNavigate();

  const [defaultPrice, setDefaultPrice] = useState(30000);
  const [saledPrice, setSaledPrice] = useState(defaultPrice);
  const [additonalSale, setAdditonalSale] = useState({ coupon: 0, point: 0 });
  const [shippingCharge, setShippingCharge] = useState(3000);
  const [totalPrice, setTotalPrice] = useState(defaultPrice);

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
    orderItems: [],
    //주문 상품들
    // itemId: "", //상품 고유 Id
    // option1Id: "", //옵션1 고유 id
    // option2Id: "", //옵션2 고유 id
    // count: "", //구매 개수
  });

  useEffect(() => {
    if (buying.length === 0) navigate("/");

    console.log("input관련 정보들 받아오기(주소 등))"); // => input 관련 컴포넌트로 넘겨주기
  }, [buying]);

  const onPayBtnClick = () => {
    if (!isInputFilled || !isPayMthdChecked) {
      alert(
        !isInputFilled
          ? "주문 정보를 모두 채워주세요."
          : "결제수단을 선택해주세요."
      );
      return;
    }

    setData({
      ...inputData,
      ...payMethod,
      ...usePoint,
      ...couponId,
      totalPrice: totalPrice, //전체 주문 금액(택배비 미포함)
      shippingCharge: shippingCharge, //택배비
      orderItems: [
        buying.map((item) => {
          return {
            itemId: item.itemId,
            option1Id: item.option1Id,
            option2Id: item.option2Id,
            count: item.count,
          };
        }),
      ],
    });
  };
  useEffect(async () => {
    try {
      const response = await axios.post("http://localhost:8080/order", data);
      console.log(response.data);
      //navigate(`order/result?쿼리 스트링 전달하기`);
    } catch (error) {
      const response = error.respose;
      alert(
        respose && response.errorCode !== undefined
          ? response.message
          : "오류가 발생하였습니다. 다시 시도해주세요"
      );
      window.location.reload();
    }
  }, [data]);

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
        totalPrice={totalPrice}
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
