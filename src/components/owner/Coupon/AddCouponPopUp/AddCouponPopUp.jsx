import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import {
  enrolledCouponState,
  showCouponPopUpState,
} from "../../../../store/owner/coupon";
import CloseButton from "../../../common/CloseButton/CloseButton";

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

const AddCouponPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const [coupon, setCoupon] = useRecoilState(enrolledCouponState);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [enrollNumber, setEnrollNumber] = useState("");
  const setShowCouponPopUp = useSetRecoilState(showCouponPopUpState);

  const onChange = (dispatcher) => (event) => {
    dispatcher(event.target.value);
  };

  const addCoupon = () => {
    const currentCoupon = { id: coupon.length, name, discount, enrollNumber };
    setCoupon([currentCoupon, ...coupon]);
  };

  const onClickSubmit = () => {
    if (window.confirm("쿠폰을 등록하시겠습니까?")) {
      addCoupon();
      alert("쿠폰이 추가되었습니다.");
      setShowCouponPopUp(false);
    }
  };

  return (
    <AddCouponPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowCouponPopUp} />
      <div>
        <h1>쿠폰명 </h1>
        <input type="text" onChange={onChange(setName)} />
      </div>
      <div>
        <h1>할인율 </h1>
        <input type="text" onChange={onChange(setDiscount)} />
      </div>
      <div>
        <h1>등록번호 </h1>
        <input type="text" onChange={onChange(setEnrollNumber)} />
      </div>
      <button onClick={onClickSubmit}>상품 추가하기</button>
    </AddCouponPopUpWrapper>
  );
};

export default AddCouponPopUp;
