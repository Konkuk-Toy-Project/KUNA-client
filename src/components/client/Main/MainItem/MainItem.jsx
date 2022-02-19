import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const MainItem = ({ item }) => {
  const navigate = useNavigate();

  const briefTitle = () => {
    return item.name.length > 14 ? item.name.slice(0, 14) + "..." : item.name;
  };

  const discountPrice = () => {
    return (item.price * (100 - item.sale)) / 100;
  };

  const onClickItem = () => {
    navigate(`/item/${item.itemId}`);
  };

  return (
    <Wrapper onClick={onClickItem}>
      <Image
        src={`http://localhost:8080/image/thumbnail/${item.thumbnailUrl}`}
      />
      <Description>
        <Title>{briefTitle()}</Title>
        <PriceWrapper>
          <Discount>{item.sale}%</Discount>
          <h1>{discountPrice()}원</h1>
        </PriceWrapper>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  width: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in;
    background-color: black;
    color: white;
  }
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
  margin: 1em;
  text-align: start;
`;

const PriceWrapper = styled.div`
  display: flex;
  width: 12em;
  margin: 0 1em;
`;

const Discount = styled.p`
  color: #ab46bc;
  font-weight: 600;
  margin-right: 0.5em;
`;

export default MainItem;
