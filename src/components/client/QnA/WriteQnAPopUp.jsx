import React, { useState } from "react";
import IconX from "../Icon/IconX";
import QnAItemInfo from "./QnAItemInfo";
import PropTypes from "prop-types";

const WriteQnAPopUp = ({ itemData, setQnA, setPopWriteQnA }) => {
  const [isSecret, setIsSecret] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onClick = () => setIsSecret((cur) => !cur);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onClosePopClick = () => setPopWriteQnA(false);
  const onSubmitClick = () => {
    console.log("서버 등록");
    setPopWriteQnA(false);
    setQnA((cur) =>
      cur.concat({
        question: text,
        answer: null,
        registryDate: "질문 일시", //---------------------- 날짜 형식에 맞게 받아오는 걸로 수정
        memberName: "질문자 이름", // --------------------- 서버에서 이름 받아오는 걸로 수정
        answered: false,
        secret: isSecret,
        title: title,
      })
    );
  };

  return (
    <div>
      <div>상품 Q&A 쓰기</div>
      <QnAItemInfo thumbnail={itemData.img} name={itemData.name} />

      <div name="writeSection">
        <label htmlFor="qnaTitle">제목</label>
        <input
          type="text"
          className="qnaTitle"
          onChange={onTitleChange}
          value={title}
        />
        <label>
          비밀글
          <input type="checkbox" checked={isSecret} onClick={onClick} />
        </label>

        <div name="main">
          <label htmlFor="qnaMain">문의사항</label>
          <textarea
            name="qna"
            cols="30"
            rows="10"
            className="qnaMain"
            onChange={onTextChange}
            value={text}
          ></textarea>
        </div>
      </div>

      <div>
        <button onSubmit={onSubmitClick}>확인</button>
        <button onClick={onClosePopClick}>취소</button>
      </div>
    </div>
  );
};

export default WriteQnAPopUp;
