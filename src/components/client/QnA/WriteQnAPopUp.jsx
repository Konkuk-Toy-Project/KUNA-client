import React, { useState } from "react";
import IconX from "../Icon/IconX";
import QnAItemInfo from "./QnAItemInfo";
import PropTypes from "prop-types";
import axios from "axios";

const WriteQnAPopUp = ({ itemData, setNewQnaIds, setPopWriteQnA }) => {
  const [isSecret, setIsSecret] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //const [loading, setLoading] = useState(false);

  const onSecretClick = () => setIsSecret((cur) => !cur);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onClosePopClick = () => {
    setIsSecret(false);
    setTitle("");
    setText("");
    setPopWriteQnA(false);
  };

  const onSubmitClick = () => {
    if (title === "" || text === "") {
      alert("제목과 문의사항을 모두 입력해주세요.");
      return;
    }
    setPopWriteQnA(false);
    postNewQnA();
  };

  const postNewQnA = async () => {
    try {
      const response = await axios.post("http://localhost:8080/qna", {
        itemId: itemData.itemId,
        secret: isSecret,
        question: text,
        title: title,
      });
      setNewQnaIds((cur) => cur.concat(response.data.qnaId));
    } catch (error) {
      alert(
        error.response && error.response.message !== undefined
          ? error.response.message
          : "오류가 발생했습니다. 다시 시도해주세요"
      );
    }
  };

  return (
    <div>
      <div>상품 Q&A 작성하기</div>
      <IconX onClick={onClosePopClick} />
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
          <input type="checkbox" checked={isSecret} onChange={onSecretClick} />
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
        <button onClick={onSubmitClick}>확인</button>
        <button onClick={onClosePopClick}>취소</button>
      </div>
    </div>
  );
};

WriteQnAPopUp.propTypes = {
  itemData: PropTypes.object.isRequired,
  setNewQnaIds: PropTypes.func.isRequired,
  setPopWriteQnA: PropTypes.func.isRequired,
};

export default WriteQnAPopUp;
