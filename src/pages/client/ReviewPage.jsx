import React, { useEffect, useState } from "react";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  // 리뷰 데이터 배열로 받은 후 map으로 리뷰 컴포넌트 출력해주기
  useEffect(() => {
    console.log("배열로 받아오기");
  }, []);
  return (
    <div>
      {reviews.map((review) => (
        <div>
          <Review
            name={review.name}
            rate={review.rate}
            text={review.text}
            imgs={review.imgs}
          />
          <br />
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
