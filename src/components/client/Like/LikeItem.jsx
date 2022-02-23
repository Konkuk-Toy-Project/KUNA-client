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

  const discountPrice = () => {
    return (item.price * (100 - item.sale)) / 100;
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
      <DeleteButton onClick={onClickDeleteLike}>✕</DeleteButton>
      <Image
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <Description>
        <Title>{item.name}</Title>
        <PriceWrapper>
          <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          <DiscountPrice>{discountPrice().toLocaleString()}원</DiscountPrice>
        </PriceWrapper>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  width: 20em;
`;

const DeleteButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  font-size: 16px;
  top: 2px;
  right: 1px;
  &:hover {
    transform: scale(1.2);
    transition: all 0.3s ease-in;
  }
`;

const Image = styled.img`
  width: 20em;
  height: 20em;
  border-radius: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5em;
`;

const ItemPrice = styled.p`
  color: gray;
  text-decoration: line-through;
  font-size: 18px;
  margin-right: 0.3em;
`;

const DiscountPrice = styled.p`
  font-size: 18px;
`;

export default LikeItem;
