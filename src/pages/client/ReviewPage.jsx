import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReviewPopup from "../../components/client/Review/ReviewPopup";
import Review from "../../components/client/Review/Review";
import axios from "axios";
import PageChanger from "../../components/common/PageChanger/PageChanger";

const PAGE_UNIT = 5;
const REVIEW_NUM_UNIT = 5;

const ReviewPage = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPageNum, setCurPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState();

  const [popUpReview, setPopUpReview] = useState({}); // 클릭한 아이템의 review + default인덱스
  useEffect(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/review/${itemId}`
      );
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      alert(error.response.message);
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {reviews.map((review, idx) =>
            idx + 1 >= (curPageNum - 1) * REVIEW_NUM_UNIT + 1 &&
            idx + 1 <= curPageNum * REVIEW_NUM_UNIT ? (
              <div key={"rev_" + idx}>
                <Review reviewObj={review} setPopup={setPopUpReview} />
                <br />
              </div>
            ) : null
          )}
          <PageChanger
            data={reviews}
            curPageNum={curPageNum}
            setCurPageNum={setCurPageNum}
            totalPageNum={totalPageNum}
            setTotalPageNum={setTotalPageNum}
            pageUnit={PAGE_UNIT}
          />
        </div>
      )}
      <ReviewPopup data={popUpReview} setData={setPopUpReview} />
    </div>
  );
};

ReviewPage.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default ReviewPage;
