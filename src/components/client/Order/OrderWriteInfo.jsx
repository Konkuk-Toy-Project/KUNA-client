import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OrderInput from "./OrderInput";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../store/common/user";

const ADDRESS = "address";
const RECIPIENT = "recipient";
const PHONE = "phone";

const OrderWriteInfo = ({ setData, setIsFilled }) => {
  const [infos, setInfos] = useState({
    [ADDRESS]: "", //배송지 주소
    [RECIPIENT]: "", //수령인
    [PHONE]: "", //수령인 전화번호
  });
  const userToken = useRecoilValue(userTokenState);

  const onChange = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
    console.log(infos);
  };

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:8080/member/info", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log(response.data);
      setInfos({
        ...infos,
        [RECIPIENT]: response.data.name,
        [PHONE]: response.data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setData(infos);
    infos[ADDRESS] !== "" &&
    infos[RECIPIENT] !== "" &&
    infos[PHONE] !== "" &&
    infos[PHONE].match(/[^0-9]/g) === null
      ? setIsFilled(true)
      : setIsFilled(false);
  }, [infos]);

  return (
    <div>
      <ul name="address">
        <OrderInput
          label="주소"
          name={ADDRESS}
          info={infos}
          onChange={onChange}
        />
        <OrderInput
          label="수령인"
          name={RECIPIENT}
          info={infos}
          onChange={onChange}
        />
        <OrderInput
          label="전화번호"
          name={PHONE}
          info={infos}
          onChange={onChange}
        />
        {infos.phone.match(/[^0-9]/g) !== null ? (
          <span>번호만 입력해주세요.</span>
        ) : null}
      </ul>
    </div>
  );
};

OrderWriteInfo.propTypes = {
  setData: PropTypes.func.isRequired,
  setIsFilled: PropTypes.func.isRequired,
};

export default OrderWriteInfo;
