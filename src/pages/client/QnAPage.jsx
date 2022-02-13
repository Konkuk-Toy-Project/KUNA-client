import React, { Component, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QnATable from "../../components/client/QnA/QnATable";
import WriteQnAPopUp from "../../components/client/QnA/WriteQnAPopUp";
import AnswCheckPopup from "../../components/client/QnA/AnswCheckPopup";
import axios from "axios";

const QnAPage = ({ itemName, thumbnail, itemId }) => {
  const [loading, setLoading] = useState(false);
  const [itemData, setItemData] = useState({
    itemId: itemId,
    name: itemName,
    img: thumbnail,
  });

  const [qnAs, setQnAs] = useState([]);

  const [popWriteQnA, setPopWriteQnA] = useState(false);
  const [popAnswer, setPopAnswer] = useState(false);
  const [selAnswIdx, setSelAnswIdx] = useState(null);
  const [newQnaIds, setNewQnaIds] = useState([]);

  const onWriteQClick = () => setPopWriteQnA(true);
  const onAnswerQClick = () => setPopAnswer(true);

  useEffect(async () => {
    getQnAs();
  }, [newQnaIds]);

  const getQnAs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/qna/${itemId}`);
      setQnAs(response.data);
    } catch (error) {
      alert(error.response.message);
    }
    setLoading(false);
  }, [newQnaIds]);
  return (
    <div>
      <QnATable qnAs={qnAs} setSelAnswIdx={setSelAnswIdx} />
      <button onClick={onWriteQClick}>Q&A 작성하기</button>

      {/* 팝업창 */}
      {popWriteQnA ? (
        <WriteQnAPopUp
          itemData={itemData}
          setNewQnaIds={setNewQnaIds}
          setPopWriteQnA={setPopWriteQnA}
        />
      ) : null}

      {selAnswIdx !== null ? (
        <AnswCheckPopup
          qnaData={qnAs[selAnswIdx]}
          setSelAnswIdx={setSelAnswIdx}
          itemData={itemData}
        />
      ) : null}
    </div>
  );
};

QnAPage.propTypes = {
  itemName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
};

export default QnAPage;
