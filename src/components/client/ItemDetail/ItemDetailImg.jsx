import React from "react";
import styled from "styled-components";

const ItemDetailImg = ({ imgSrc }) => {
  return (
    <ImgWrapper>
      {imgSrc.map((src, idx) => (
        <Img
          key={"img_" + idx}
          src={`http://localhost:8080/image/detail/${src}`}
          alt="상품 상세 정보"
        />
      ))}
    </ImgWrapper>
  );
};

const ImgWrapper = styled.div`
  width: 80%;
  margin: 0px auto;
`;
const Img = styled.img`
  display: inline-block;
  width: 100%;
`;

export default ItemDetailImg;
