import React from "react";

const ItemDetailImg = ({ imgSrc }) => {
  return (
    <div>
      {imgSrc.map((src, idx) => (
        <img key={"img_" + idx} src={src} alt="상품 상세 정보" />
      ))}
    </div>
  );
};

export default ItemDetailImg;
