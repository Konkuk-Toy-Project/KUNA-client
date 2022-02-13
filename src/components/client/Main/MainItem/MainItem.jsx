import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const MainItem = ({ item }) => {
  const navigate = useNavigate();

  const briefTitle = (title) => {
    return title.slice(0, 16) + "...";
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
        <Title>{briefTitle(item.name)}</Title>
        <PriceWrapper>
          <h1>할인율 : {item.sale}%</h1>
          <h1>{item.price}원</h1>
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
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in;
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
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MainItem;
