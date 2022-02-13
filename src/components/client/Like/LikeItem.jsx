import React from "react";
import styled from "styled-components";

const LikeItem = ({ item }) => {
  const onClickDeleteLike = () => {};
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
