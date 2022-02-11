import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ItemBrief from "../../components/client/ItemDetail/ItemBrief/ItemBrief";
import ItemDetailImg from "../../components/client/ItemDetail/ItemDetailImg";
import QnAPage from "./QnAPage";
import ReviewPage from "./ReviewPage";
import { useParams } from "react-router-dom";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState();

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
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <ItemBrief itemObj={item} />
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
    </div>
  );
};

export default ItemDetailPage;
