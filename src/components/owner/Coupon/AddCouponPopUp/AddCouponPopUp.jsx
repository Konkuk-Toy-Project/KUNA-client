import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import { showCouponPopUpState } from "../../../../store/owner/coupon";
import CloseButton from "../../../common/CloseButton/CloseButton";
import ProductButton from "../../../common/ProductButton/ProductButton";

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

  const calculateExpiredDate = useCallback(() => {
    const today = new Date();
    today.setDate(today.getDate() + Number(date));
    setExpiredDate(today.toISOString().replace("T", " ").replace("Z", ""));
  }, [date]);

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
  }, [calculateExpiredDate]);

  return (
    <AddCouponPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowCouponPopUp} />
      <Title>쿠폰 등록</Title>
      <InputWrapper>
        <InputTitle>쿠폰 종류</InputTitle>
        <select name="kind" onChange={onChange(setKind)}>
          <option value="percent">퍼센트</option>
          <option value="static">금액</option>
        </select>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>할인 정도</InputTitle>
        <InputText
          type="text"
          placeholder="할인 정도를 입력해주세요"
          onChange={onChange(setRate)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>쿠폰 만료 기간</InputTitle>
        <select name="date" onChange={onChange(setDate)}>
          <option value="7">1주일 뒤</option>
          <option value="30">1달 뒤</option>
          <option value="365">1년 뒤</option>
        </select>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>쿠폰 적용 최소 금액</InputTitle>
        <select name="condition" onChange={onChange(setCondition)}>
          <option value="total_price_10000">1만원 이상</option>
          <option value="total_price_30000">3만원 이상</option>
          <option value="total_price_50000">5만원 이상</option>
        </select>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>쿠폰 명</InputTitle>
        <InputText
          type="text"
          placeholder="쿠폰 명을 입력해주세요"
          onChange={onChange(setName)}
        />
      </InputWrapper>
      <ProductButton onClick={onClickSubmit}>쿠폰 등록하기</ProductButton>
    </AddCouponPopUpWrapper>
  );
};

const AddCouponPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  width: 30em;
  height: 30em;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 1.5em;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: center;
  width: 24em;
  margin: 0.2em 0;
`;

const InputTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  width: 8em;
  text-align: end;
  margin-right: 1em;
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid black;
  align-self: flex-start;
  width: 10em;
  &:focus {
    outline: none;
  }
`;

export default AddCouponPopUp;
