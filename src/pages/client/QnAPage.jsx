import React, { Component, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QnATable from "../../components/client/QnA/QnATable";
import WriteQnAPopUp from "../../components/client/QnA/WriteQnAPopUp";
import AnswCheckPopup from "../../components/client/QnA/AnswCheckPopup";
import PageTitle from "../../components/common/PageTitle/PageTitle";

import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userTokenState } from "../../store/common/user";
import styled from "styled-components";
import { qnaIdsState } from "../../store/client/qnaIds";
import { qnAWritePopupState, selAnswIdxState } from "../../store/client/popup";
import { qnasState } from "../../store/client/qnas";

const QnAPage = ({ itemName, thumbnail, itemId }) => {
  const userToken = useRecoilValue(userTokenState);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [itemData, setItemData] = useState({
    itemId: itemId,
    name: itemName,
    img: `http://localhost:8080/image/thumbnail/${thumbnail}`,
  });

  const [qnAs, setQnAs] = useRecoilState(qnasState);

  const setPopWriteQnA = useSetRecoilState(qnAWritePopupState);
  const [popAnswer, setPopAnswer] = useState(false);
  const [selAnswIdx, setSelAnswIdx] = useRecoilState(selAnswIdxState);
  const [newQnaIds, setNewQnaIds] = useRecoilState(qnaIdsState);

  const onWriteQClick = () => {
    getIsLogin();
  };

  const onAnswerQClick = () => setPopAnswer(true);

  useEffect(() => {
    setNewQnaIds([]);
  }, []);

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
        alert("????????? ??? ??????????????????.");
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
      alert("????????? ??????????????????. ?????? ?????? ??????????????????.");
    }
  };

  return (
    <QnAPageWrapper>
      <PageTitle title={"Q&A"} />

      <WriteQnABtnWrapper>
        <WriteQnABtn onClick={onWriteQClick}>Q&A ????????????</WriteQnABtn>
      </WriteQnABtnWrapper>

      <QnATable qnAs={qnAs} setSelAnswIdx={setSelAnswIdx} />
    </QnAPageWrapper>
  );
};

QnAPage.propTypes = {
  itemName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
};

const QnAPageWrapper = styled.div`
  width: 90%;
  margin: 0px auto;
`;

const WriteQnABtnWrapper = styled.div`
  text-align: right;
  margin: 10px 0 5px 0;
  height: 40px;
`;

const WriteQnABtn = styled.button`
  display: inline-block;
  width: 150px;
  height: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #424242;
  color: white;
  &:hover {
    background-color: black;
  }
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;
export default QnAPage;
