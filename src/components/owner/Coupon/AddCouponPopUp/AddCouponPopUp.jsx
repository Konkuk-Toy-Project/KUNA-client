import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import { showCouponPopUpState } from "../../../../store/owner/coupon";
import CloseButton from "../../../common/CloseButton/CloseButton";
import AddCategory from "../AddCategory/AddCategory";

const AddCouponPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const [kind, setKind] = useState("percent");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState(1);
  const [expiredDate, setExpiredDate] = useState("");
  const [condition, setCondition] = useState("total_price_10000");
  const [name, setName] = useState("");
  const setShowCouponPopUp = useSetRecoilState(showCouponPopUpState);

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
  };

  const addCoupon = async () => {
    const newCoupon = {
      kind,
      rate,
      expiredDate,
      condition,
      name,
    };
    await axios
      .post("http://localhost:8080/coupon", newCoupon)
      .then((response) => response.data);
  };

  const calculateExpiredDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + Number(date));
    setExpiredDate(today.toISOString().replace("T", " ").replace("Z", ""));
  };

  const onClickSubmit = () => {
    calculateExpiredDate();
    if (window.confirm(`${name} 쿠폰을 등록하시겠습니까?`)) {
      addCoupon();
      alert("쿠폰이 추가되었습니다.");
      setShowCouponPopUp(false);
    }
  };

  useEffect(() => {
    calculateExpiredDate();
  }, []);

  return (
    <AddCouponPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowCouponPopUp} />
      <div>
        <h1>쿠폰 종류</h1>
        <select name="kind" onChange={onChange(setKind)}>
          <option value="percent">퍼센트</option>
          <option value="static">금액</option>
        </select>
      </div>
      <AddCategory title="할인 정도" onChange={onChange(setRate)} />
      <div>
        <h1>쿠폰 만료 기간</h1>
        <select name="date" onChange={onChange(setDate)}>
          <option value="7">1주일 뒤</option>
          <option value="30">1달 뒤</option>
          <option value="365">1년 뒤</option>
        </select>
      </div>
      <div>
        <h1>쿠폰 적용 최소 금액</h1>
        <select name="condition" onChange={onChange(setCondition)}>
          <option value="total_price_10000">1만원 이상</option>
          <option value="total_price_30000">3만원 이상</option>
          <option value="total_price_50000">5만원 이상</option>
        </select>
      </div>
      <AddCategory title="쿠폰 명" onChange={onChange(setName)} />
      <button onClick={onClickSubmit}>상품 추가하기</button>
    </AddCouponPopUpWrapper>
  );
};

const AddCouponPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 20vw;
  width: 60vw;
  height: 60vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AddCouponPopUp;
