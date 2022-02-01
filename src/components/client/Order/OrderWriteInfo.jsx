import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OrderInput from "./OrderInput";

const ADDRESS = "address";
const DETAIL_ADD = "detailAdd";
const POST_NUM = "postNum";
const RECIEVER = "receiver";
const PHONE = "phone";
const MEMO = "memo";

const OrderWriteInfo = () => {
  // 주소, 상세주소, 우편번호, 수령인, 전화번호, 배송요청사항
  const [info, setInfo] = useState({
    [ADDRESS]: "",
    [DETAIL_ADD]: "",
    [POST_NUM]: "",
    [RECIEVER]: "",
    [PHONE]: "",
    [MEMO]: "",
  });

  useEffect(() => {
    console.log("회원인 경우, 사용자 정보 받아와서 info에 초기정보 채워넣기");
  }, []);

  const onChange = () => {};

  return (
    <div>
      <ul name="address">
        <OrderInput
          label="주소"
          key={ADDRESS}
          info={info}
          onChange={onChange}
        />
        <OrderInput
          label="상세주소"
          key={DETAIL_ADD}
          info={info}
          onChange={onChange}
        />
        <OrderInput
          label="우편번호"
          key={POST_NUM}
          info={info}
          onChange={onChange}
        />
      </ul>
      <div name="userInfo">
        <OrderInput
          label="수령인"
          key={RECIEVER}
          info={info}
          onChange={onChange}
        />
        <OrderInput
          label="전화번호"
          key={PHONE}
          info={info}
          onChange={onChange}
        />
      </div>
      <div name="memo">
        <label>배송 요청사항</label>

        <textarea
          name={MEMO}
          cols="30"
          rows="10"
          onChange={onTextChange}
          value={text}
        ></textarea>
      </div>
    </div>
  );
};

OrderWriteInfo.propTypes = {};

export default OrderWriteInfo;
