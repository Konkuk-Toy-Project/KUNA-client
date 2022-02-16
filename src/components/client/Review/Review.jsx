import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import UserName from "./UserName";
import PropTypes from "prop-types";

const Review = ({ reviewObj, setPopup }) => {
  const [data, setData] = useState(reviewObj);
  const [textBoxType, setTextBoxType] = useState("hidden");

  const onImgClick = (e) => {
    setPopup({ ...data, ["selImgIdx"]: parseInt(e.target.name) }); // 선택된 아이템 정보 입력
  };
  const onTextClick = () => {
    if (textBoxType === "hidden") setTextBoxType("none");
    else setTextBoxType("hidden");
  };
  //   memberName: 리뷰 등록 유저 이름
  // option: 구매한 옵션의 이름
  // description: 리뷰 내용
  // rate: 별점
  // registryDate: 리뷰 등록 일시
  // reviewImagesUrl(array): 리뷰 이미지 저장 이름

  return (
    <div>
      <div name="header">
        <UserName name={data.memberName} />
        <div>{data.option}</div>
        <div name="user-rate">
          <RatingStars rate={data.rate} />
          <span>{data.rate.toFixed(1)}</span>
        </div>
      </div>
      <div name="container">
        <div name="text" style={{ overflow: { textBoxType } }}>
          <p style={{ whiteSpace: "pre-line" }} onClick={onTextClick}>
            {data.description}
          </p>
          {/* <button onClick={onTextClick}>리뷰 더보기</button> */}
        </div>
        <div name="imgs">
          {data.reviewImagesUrl.map((img, key) => (
            <img
              name={key}
              key={key}
              src={`http://localhost:8080/image/review/${img}`}
              onClick={onImgClick}
              width={100}
              height={100}
              overflow="hidden"
            />
          ))}
        </div>
        <div>{data.registryDate}</div>
      </div>
    </div>
  );
};

Review.propTypes = {
  reviewObj: PropTypes.object.isRequired,
  setPopup: PropTypes.func.isRequired,
};
export default Review;
