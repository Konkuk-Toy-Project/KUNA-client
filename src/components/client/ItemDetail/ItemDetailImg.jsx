import React from "react";

const ItemDetailImg = ({ imgSrc }) => {
  return (
    <div>
      {imgSrc.map((src) => (
        <img src={src} alt="상품 상세 정보" />
      ))}
    </div>
  );
};

export default ItemDetailImg;
