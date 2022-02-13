import React, { useEffect, useState } from "react";
import CouponSelector from "../../components/client/Order/CouponSelector.jsx";
import OrderedItem from "../../components/client/Order/OrderedItem.jsx";
import OrderWriteInfo from "../../components/client/Order/OrderWriteInfo.jsx";
import PayMthdSelector from "../../components/client/Order/PayMthdSelector.jsx";
import UsingPoint from "../../components/client/Order/UsingPoint.jsx";

const OrderPage = () => {
  const [items, setItems] = useState([
    { itemId: 1214, option1Id: 2351, option2Id: 21523, count: 2 }, //price 추가요청하기
    { itemId: 1213, option1Id: 23451, option2Id: 2523, count: 1 },
  ]);

  const [defaultPrice, setDefaultPrice] = useState(30000);
  const [totalPrice, setTotalPrice] = useState(defaultPrice);

  const [inputData, setInputData] = useState({});
  const [couponId, setCouponId] = useState({ couponId: "" });
  const [usePoint, setUsePoint] = useState({ usePoint: 0 });
  const [payMethod, setPayMethod] = useState({ payMethod: "" });

  const [isInputFilled, setIsInputFilled] = useState(false);
  const [isPayMthdChecked, setIsPayMthdChecked] = useState(false);

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
      //주문 상품들
      itemId: "", //상품 고유 Id
      option1Id: "", //옵션1 고유 id
      option2Id: "", //옵션2 고유 id
      count: "", //구매 개수
    },
  });

  useEffect(() => {
    console.log("아이템 정보들 받아오기");
    console.log("input관련 정보들 받아오기(주소 등))"); // => input 관련 컴포넌트로 넘겨주기
    const tempItemsDetails = items.map((item) => {}); // 각 아이템 마다 조회해서 아래정보 받아오기
    // name: "sbs927 자꾸자꾸 파스텔 스탠다드핏 셔츠 7colors",
    //   thumbnail:
    //     "https://img.sonyunara.com/files/goods/69048/1611793473_21.jpg",
    //   price: 30000,
    //   rate: 15,
    //   option1: "SizeM",
    //   option2: "파란색",
    //   count: 2,
    //   stock: 15,

    // setDefaultPrice(
    //   items.map((i) => i.count * i.price).reduce((prev, post) => prev + post)
    // );
    // console.log(
    //   items.map((i) => i.count * i.price).reduce((prev, post) => prev + post) +
    //     "원"
    // );
  }, []);

  // useEffect(() => {
  //   console.log("defaultPrice 다시 설정하기");
  //   console.log(items.map((i) => i.count * i.price));
  //   setDefaultPrice(
  //     items.map((i) => i.count * i.price).reduce((prev, post) => prev + post)
  //   );
  // }, [items]);

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
  // console.log("할인 금액: " + totalPrice);
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
      {items.map((item, idx) => (
        <OrderedItem
          key={"o_item_" + idx}
          itemData={item}
          setDefaultPrice={setDefaultPrice}
        />
      ))}
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
