import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ItemBrief from "../../components/client/ItemDetail/ItemBrief/ItemBrief";
import ItemDetailImg from "../../components/client/ItemDetail/ItemDetailImg";
import QnAPage from "./QnAPage";
import ReviewPage from "./ReviewPage";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  basketPopupState,
  qnAWritePopupState,
  reviewPopupState,
  selAnswIdxState,
} from "../../store/client/popup";
import AskGoToBasketPopup from "../../components/client/ItemDetail/ItemBrief/AskGoToBasketPopup";
import styled from "styled-components";
import ReviewPopup from "../../components/client/Review/ReviewPopup";
import { buyingState } from "../../store/client/buying";
import WriteQnAPopUp from "../../components/client/QnA/WriteQnAPopUp";
import AnswCheckPopup from "../../components/client/QnA/AnswCheckPopup";
import ReactHelmet from "../../components/common/ReactHelmet/ReactHelmet";

const ITEM_DETAIL = "itemDetail";
const REVIEW = "review";
const QNA = "qna";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState();
  const basketPopup = useRecoilValue(basketPopupState);
  const reviewPopupObj = useRecoilValue(reviewPopupState);
  const setBuying = useSetRecoilState(buyingState);
  const qnaWritePopup = useRecoilValue(qnAWritePopupState);
  const selAnswIdx = useRecoilValue(selAnswIdxState);

  const itemDetailRef = useRef();
  const reviewRef = useRef();
  const qnaRef = useRef();

  useEffect(() => {
    getItem();
    setBuying([]);
  }, []);

  const getItem = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/item/${itemId}`);
      setItem(response.data);
    } catch (error) {
      alert("오류가 발생하였습니다. 다시 시도해주세요");
    }
    setLoading(false);
  }, [itemId]);

  const onTabClick = (e) => {
    switch (e.target.dataset.type) {
      case ITEM_DETAIL:
        itemDetailRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case REVIEW:
        reviewRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case QNA:
        qnaRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  return (
    <ItemDetailPageWrapper>
      <ReactHelmet title={"제품상세"} />
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <ItemBrief itemObj={item} />
          {basketPopup ? <AskGoToBasketPopup /> : null}
          <TabUl>
            <TabLi data-type={ITEM_DETAIL} onClick={onTabClick}>
              제품상세
            </TabLi>
            <TabLi data-type={REVIEW} onClick={onTabClick}>
              리뷰
            </TabLi>
            <TabLi data-type={QNA} onClick={onTabClick}>
              Q&A
            </TabLi>
          </TabUl>
          <div ref={itemDetailRef}>
            <ItemDetailImg imgSrc={item.detailImageUrl} />
          </div>
          <div ref={reviewRef}>
            <ReviewPage itemId={item.itemId} />
          </div>
          <div ref={qnaRef}>
            <QnAPage
              itemName={item.name}
              thumbnail={item.thumbnailUrl}
              itemId={item.itemId}
            />
          </div>
        </>
      )}
      {Object.keys(reviewPopupObj).length === 0 ? null : <ReviewPopup />}
      {qnaWritePopup ? <WriteQnAPopUp itemData={item} /> : null}
      {selAnswIdx !== null ? <AnswCheckPopup itemData={item} /> : null}
    </ItemDetailPageWrapper>
  );
};

const ItemDetailPageWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const TabUl = styled.ul`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  margin: -3px auto;
`;

const TabLi = styled.li`
  box-sizing: border-box;
  height: 100%;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
  width: 34%;
  text-align: center;
  border-bottom: 5px solid #e0e0e0;
  &:hover {
    color: #ab47bc;
    border-bottom: 5px solid #ab47bc;
  }
  cursor: pointer;
`;
export default ItemDetailPage;
