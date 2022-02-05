import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QnATable from "../../components/client/QnA/QnATable";
import WriteQnAPopUp from "../../components/client/QnA/WriteQnAPopUp";
import AnswCheckPopup from "../../components/client/QnA/AnswCheckPopup";

const QnAPage = ({ itemName, thumbnail, itemId }) => {
  const [itemData, setItemData] = useState({
    ["itemId"]: itemId,
    ["name"]: itemName,
    ["img"]: thumbnail,
  });

  const [qnAs, setQnAs] = useState([
    {
      question: null,
      answer: null,
      registryDate: null,
      memberName: "testMember1",
      title: null,
      answered: false,
      secret: true,
    },
    {
      question: "질문이다!2",
      answer: "답변쓰2",
      registryDate: "20220202",
      memberName: "어피치",
      answered: true,
      secret: false,
      title: "제품문제",
    },
    {
      question: "질문이다!3",
      answer: "답변쓰3",
      registryDate: "20220203",
      memberName: "제이지",
      answered: true,
      secret: false,
      title: "카카오톡",
    },
    {
      question: "질문이다!4",
      answer: "답변쓰4",
      registryDate: "20220203",
      memberName: "튜브",
      answered: false,
      secret: false,
      title: "배송문제",
    },
    {
      question: "질문이다!5",
      answer: "답변쓰5",
      registryDate: "20220204",
      memberName: "라이언",
      answered: false,
      secret: true,
      title: "건의사항",
    },
    {
      question: null,
      answer: null,
      registryDate: null,
      memberName: "testMember2s",
      title: null,
      answered: true,
      secret: true,
    },
  ]);

  const [popWriteQnA, setPopWriteQnA] = useState(false);
  const [popAnswer, setPopAnswer] = useState(false);

  const onWriteQClick = () => setPopWriteQnA(true);
  const onAnswerQClick = () => setPopAnswer(true);

  useEffect(() => {
    console.log("item id로 qna정보 받아오기 ");
  }, []);
  return (
    <div>
      <QnATable data={qnAs} />
      <button onClick={onWriteQClick}>Q&A 작성하기</button>

      {/* 팝업창 */}
      {popWriteQnA ? (
        <WriteQnAPopUp
          itemData={itemData}
          setQnA={setQnAs}
          setPopWriteQnA={setPopWriteQnA}
        />
      ) : null}

      {/* {popAnswer ? <AnswCheckPopup /> : null} */}
    </div>
  );
};

QnAPage.propTypes = {
  itemName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default QnAPage;
