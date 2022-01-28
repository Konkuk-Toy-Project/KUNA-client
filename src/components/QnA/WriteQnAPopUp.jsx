import React, { useState } from "react";
import IconX from "../Icon/IconX";

const WriteQnAPopUp = () => {
  const imgsrc =
    "https://img.sonyunara.com/files/goods/69048/1611793473_21.jpg";
  const name = "sbs927 자꾸자꾸 파스텔 스탠다드핏 셔츠 7colors";

  const [isSecret, setIsSecret] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onClick = () => setIsSecret((cur) => !cur);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);

  console.log(isSecret);
  console.log(title);
  console.log(text);

  return (
    <div>
      <div>상품 Q&A 쓰기</div>
      <IconX />
      <br />

      <div name="productInfoSection">
        <img name="thumbnail" src={imgsrc} alt="썸네일" />
        <div name="상품명">{name}</div>
      </div>

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
        <button>확인</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default WriteQnAPopUp;
