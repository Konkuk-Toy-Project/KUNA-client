import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showPointState } from "../../../../store/client/user";
import { currentY, userTokenState } from "../../../../store/common/user";
import CloseButton from "../../../common/CloseButton/CloseButton";

const PointPopUp = () => {
  const [points, setPoints] = useState("");
  const setShowPoint = useSetRecoilState(showPointState);
  const scrollY = useRecoilValue(currentY);
  const userToken = useRecoilValue(userTokenState);

  const getPoints = useCallback(async () => {
    const data = await axios
      .get("http://localhost:8080/member/point", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
    setPoints(data.point);
  }, [userToken]);

  useEffect(() => {
    getPoints();
  }, [getPoints]);

  return (
    <PointPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowPoint} />
      <Title>보유 포인트</Title>
      <Point>{points.toLocaleString()}</Point>
      <Description>구매 금액의 1%가 포인트로 적립됩니다.</Description>
    </PointPopUpWrapper>
  );
};

const PointPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  width: 30em;
  height: 20em;
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
  font-weight: 600;
`;

const Point = styled.p`
  font-size: 32px;
  font-weight: 500;
  color: #ab46bc;
  margin: 1em 0;
`;

const Description = styled.p`
  font-size: 18px;
  color: gray;
`;

export default PointPopUp;
