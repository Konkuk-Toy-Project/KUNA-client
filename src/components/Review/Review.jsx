import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import UserName from "./UserName";

const Review = ({ name, rate, text, imgs }) => {
  const [textBoxType, setTextBoxType] = useState("hidden");

  const onImgClick = (e) => {
    console.log(e.target.name);
    // 팝업창  -> recoil 이용해서 정보 전달(선택한 제품의 리뷰내용) -> 팝업창 생성
  };
  const onTextClick = () => {
    if (textBoxType === "hidden") setTextBoxType("none");
    else setTextBoxType("hidden");
  };

  return (
    <div>
      <div name="header">
        <UserName name={name} />
        <div name="user-rate">
          <RatingStars rate={rate} />
          <span>{rate.toFixed(1)}</span>
        </div>
      </div>
      <div name="container">
        <div name="text" style={{ overflow: { textBoxType } }}>
          <p style={{ whiteSpace: "pre-line" }} onClick={onTextClick}>
            {text}
          </p>
          {/* <button onClick={onTextClick}>리뷰 더보기</button> */}
        </div>
        <div name="imgs">
          {imgs.map((img, key) => (
            <img
              name={key}
              key={key}
              src={img}
              onClick={onImgClick}
              width={100}
              height={100}
              overflow="hidden"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
