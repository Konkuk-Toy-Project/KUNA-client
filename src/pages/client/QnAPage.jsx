import React, { Component, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QnATable from "../../components/client/QnA/QnATable";
import WriteQnAPopUp from "../../components/client/QnA/WriteQnAPopUp";
import AnswCheckPopup from "../../components/client/QnA/AnswCheckPopup";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../store/common/user";

const QnAPage = ({ itemName, thumbnail, itemId }) => {
  const userToken = useRecoilValue(userTokenState);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [itemData, setItemData] = useState({
    itemId: itemId,
    name: itemName,
    img: `http://localhost:8080/image/item/${thumbnail}`,
  });

  const [qnAs, setQnAs] = useState([]);

  const [popWriteQnA, setPopWriteQnA] = useState(false);
  const [popAnswer, setPopAnswer] = useState(false);
  const [selAnswIdx, setSelAnswIdx] = useState(null);
  const [newQnaIds, setNewQnaIds] = useState([]);

  const onWriteQClick = () => {
    getIsLogin();
  };

  const onAnswerQClick = () => setPopAnswer(true);

  useEffect(async () => {
    getQnAs();
  }, [newQnaIds]);

  const getQnAs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/qna/${itemId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setQnAs(response.data);
    } catch (error) {
      alert(error.response.message);
    }
    setLoading(false);
  }, [newQnaIds]);

  const getIsLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/member/isLogin`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setIsLogin(response.data.isLogin);
      if (!response.data.isLogin) {
        alert("로그인 후 이용해주세요.");
        return;
      }
      setPopWriteQnA(true);
      return;
    } catch (error) {
      if (error.response) {
        const message = error.response.message;
        if (message !== undefined) {
          alert(error.response.message);
          return;
        }
      }
      alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
    }
  };

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
