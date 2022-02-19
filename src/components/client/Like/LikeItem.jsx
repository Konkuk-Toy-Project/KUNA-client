import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userTokenState } from "../../../store/common/user";

const LikeItem = ({ item }) => {
  const navigate = useNavigate();
  const userToken = useRecoilValue(userTokenState);

  const onClickDeleteLike = async () => {
    if (window.confirm(`${item.name} 찜목록에서 삭제하시겠습니까?`)) {
      await deleteData();
      alert("상품이 삭제되었습니다. 홈페이지로 이동합니다.");
      navigate("/");
    }
  };

  const deleteData = () => {
    axios
      .delete(`http://localhost:8080/preference/${item.preferenceId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
  };

  return (
    <Wrapper>
      <Image
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <Description>
        <Title>{item.name}</Title>
        <PriceWrapper>
          <h1>할인율 : {item.sale}%</h1>
          <h1>{item.price}원</h1>
        </PriceWrapper>
      </Description>
      <button onClick={onClickDeleteLike}>Delete Like</button>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 10em;
  border-radius: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em;
  width: 12em;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default LikeItem;
