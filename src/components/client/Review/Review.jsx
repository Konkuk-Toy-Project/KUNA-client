import React, { useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import ReviewHeader from "./ReviewHeader";
import { useSetRecoilState } from "recoil";
import { reviewPopupState } from "../../../store/client/popup";

const Review = ({ reviewObj }) => {
  const [data, setData] = useState(reviewObj);
  const [textBoxType, setTextBoxType] = useState("hidden");
  const setPopup = useSetRecoilState(reviewPopupState);
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
  //console.log(popup);

  return (
    <ReviewWrapper>
      <ReviewInnerWrapper>
        <ReviewHeader
          rate={data.rate}
          memberName={data.memberName}
          option={data.option}
          date={data.registryDate}
        />

        <div name="container">
          {data.reviewImagesUrl.length === 0 ? null : (
            <ReviewImgWrapper name="imgs">
              {data.reviewImagesUrl.map((img, key) => (
                <ReviewImg
                  name={key}
                  key={key}
                  src={`http://localhost:8080/image/review/${img}`}
                  onClick={onImgClick}
                  width={100}
                  height={100}
                  overflow="hidden"
                />
              ))}
            </ReviewImgWrapper>
          )}
          <div name="text" style={{ overflow: { textBoxType } }}>
            <p style={{ whiteSpace: "pre-line" }} onClick={onTextClick}>
              {data.description}
            </p>
            {/* <button onClick={onTextClick}>리뷰 더보기</button> */}
          </div>
        </div>
      </ReviewInnerWrapper>
    </ReviewWrapper>
  );
};

Review.propTypes = {
  reviewObj: PropTypes.object.isRequired,
};

const ReviewWrapper = styled.div`
  width: 100%;
  padding: 15px 0 35px 0;
  border-bottom: solid 1px #cfcfcf;
`;
const ReviewInnerWrapper = styled.div`
  margin: 0 20px;
`;

const ReviewImgWrapper = styled.div`
  margin: 10px 0 20px 0;
`;
const ReviewImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 5px;
  margin: 0 2px;
  object-fit: cover;
`;
export default Review;
