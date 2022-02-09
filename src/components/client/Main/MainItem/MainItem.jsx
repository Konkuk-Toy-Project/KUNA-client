import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { basketItemState } from "../../../../store/client/basket";

const MainItem = ({ item }) => {
  const [basketItems, setBasketItems] = useRecoilState(basketItemState);

  const briefTitle = (title) => {
    return title.slice(0, 16) + "...";
  };

  const onClickLikeItem = () => {
    const currentItem = { ...item, count: 1 };
    const existingItem = basketItems.find((item) => item.id === currentItem.id);
    if (!existingItem) {
      setBasketItems([...basketItems, currentItem]);
    } else {
      alert("이미 장바구니에 추가된 아이템입니다.");
    }
  };

  return (
    <Wrapper>
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
      <button onClick={onClickLikeItem}>장바구니 추가</button>
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
