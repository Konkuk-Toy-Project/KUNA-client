import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReviewPopup from "../../components/client/Review/ReviewPopup";
import Review from "../../components/client/Review/Review";

const ReviewPage = ({ itemId }) => {
  // sample data
  const [reviews, setReviews] = useState([
    {
      memberName: "김냥냥",
      option: "Size L, 빨강",
      rate: 3.5,
      description: "상품리뷰입니다 울랄라",
      registryDate: "22년 2월 5일",
      reviewImagesUrl: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPU5ILakhRz1Sxs57QLxGFBlsXA1TgOczVFg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBts2GJsjEOpSL03rk_3oLacW28UZ_oIVzw&usqp=CAU",
      ],
    },
    {
      memberName: "박동동",
      option: "Size M, 파랑",
      rate: 5,
      description: "별이 다섯개 ",
      registryDate: "22년 2월 2일",
      reviewImagesUrl: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBts2GJsjEOpSL03rk_3oLacW28UZ_oIVzw&usqp=CAU",
      ],
    },
    {
      memberName: "나무",
      option: "프리사이즈",
      rate: 2,
      description: "별 두개",
      registryDate: "22년 1월 9일",
      reviewImagesUrl: [],
    },
  ]);

  const [popUpReview, setPopUpReview] = useState({}); // 클릭한 아이템의 review + default인덱스
  useEffect(() => {
    // 아이템 아이디로 리뷰 배열 받아오기
    console.log("배열로 받아오기");
  }, []);

  return (
    <div>
      {reviews.map((review, idx) => (
        <div key={"rev_" + idx}>
          <Review reviewObj={review} setPopup={setPopUpReview} />
          <br />
        </div>
      ))}
      <ReviewPopup data={popUpReview} setData={setPopUpReview} />
    </div>
  );
};

ReviewPage.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default ReviewPage;
