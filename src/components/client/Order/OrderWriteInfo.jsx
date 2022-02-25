import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OrderInput from "./OrderInput";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../store/common/user";
import styled from "styled-components";

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
    let value = e.target.value;
    if (e.target.name === PHONE) {
      value = value.toString().replace(/[^0-9]/gi, "");
      if (value.length > 11) value = value.substring(0, 11);
    }

    setInfos({ ...infos, [e.target.name]: value });
  };

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:8080/member/info", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setInfos({
        ...infos,
        [RECIPIENT]: response.data.name,
        [PHONE]: response.data.phone,
      });
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요");
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
      <Ul name="address">
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
      </Ul>
    </div>
  );
};

OrderWriteInfo.propTypes = {
  setData: PropTypes.func.isRequired,
  setIsFilled: PropTypes.func.isRequired,
};

const Ul = styled.ul`
  border-bottom: solid #9e9e9e 1px;
  padding-bottom: 30px;
  margin-top: 30px;
`;

export default OrderWriteInfo;
