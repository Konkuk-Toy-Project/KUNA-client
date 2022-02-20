import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ItemBrief from "../../components/client/ItemDetail/ItemBrief/ItemBrief";
import ItemDetailImg from "../../components/client/ItemDetail/ItemDetailImg";
import QnAPage from "./QnAPage";
import ReviewPage from "./ReviewPage";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { basketPopupState, reviewPopupState } from "../../store/client/popup";
import AskGoToBasketPopup from "../../components/client/ItemDetail/ItemBrief/AskGoToBasketPopup";
import styled from "styled-components";
import ReviewPopup from "../../components/client/Review/ReviewPopup";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState();
  const basketPopup = useRecoilValue(basketPopupState);
  const reviewPopupObj = useRecoilValue(reviewPopupState);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/item/${itemId}`);
      console.log(response.data);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [itemId]);

  return (
    <ItemDetailPageWrapper>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <ItemBrief itemObj={item} />
          {basketPopup ? <AskGoToBasketPopup /> : null}
          <ul>
            <li>제품상세</li>
            <li>리뷰</li>
            <li>Q&A</li>
          </ul>
          <ItemDetailImg imgSrc={item.detailImageUrl} />
          <ReviewPage itemId={item.itemId} />
          <QnAPage
            itemName={item.name}
            thumbnail={item.itemImageUrl[0]}
            itemId={item.itemId}
          />
        </>
      )}
      {Object.keys(reviewPopupObj).length === 0 ? null : <ReviewPopup />}
    </ItemDetailPageWrapper>
  );
};

const ItemDetailPageWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

export default ItemDetailPage;
