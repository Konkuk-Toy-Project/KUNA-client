import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Review from "../../components/client/Review/Review";
import axios from "axios";
import PageChanger from "../../components/common/PageChanger/PageChanger";
import styled from "styled-components";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import { useSetRecoilState } from "recoil";
import { reviewPopupState } from "../../store/client/popup";

const PAGE_UNIT = 5;
const REVIEW_NUM_UNIT = 5;

const ReviewPage = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPageNum, setCurPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const setPopUpReview = useSetRecoilState(reviewPopupState); // 클릭한 아이템의 review + default인덱스

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/review/${itemId}`
      );
      const reviewsArr = response.data;
      reviewsArr.length <= 1
        ? setReviews(reviewsArr)
        : setReviews(
            reviewsArr.sort((r1, r2) =>
              r1.rate != r2.rate
                ? r2.rate - r1.rate
                : r2.reviewImagesUrl.length - r1.reviewImagesUrl.length
            )
          );
    } catch (error) {
      alert(error.response.message);
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <ReviewPageWrapper>
      <TitleWrapper>
        <PageTitle title={"리뷰"} />
      </TitleWrapper>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ReviewContentsWrapper>
          {reviews.map((review, idx) =>
            idx + 1 >= (curPageNum - 1) * REVIEW_NUM_UNIT + 1 &&
            idx + 1 <= curPageNum * REVIEW_NUM_UNIT ? (
              <Review
                reviewObj={review}
                setPopup={setPopUpReview}
                key={"review_" + idx}
              />
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
        </ReviewContentsWrapper>
      )}
    </ReviewPageWrapper>
  );
};

ReviewPage.propTypes = {
  itemId: PropTypes.number.isRequired,
};

const ReviewPageWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  border-bottom: 1.5px solid #424242;
  width: 103%;
  margin-bottom: 10px;
`;

const ReviewContentsWrapper = styled.div`
  width: 100%;
`;
export default ReviewPage;
