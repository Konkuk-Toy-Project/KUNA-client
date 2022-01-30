import React from "react";
import IconX from "../Icon/IconX";
import QnAItemInfo from "./QnAItemInfo";

const AnswCheckPopup = () => {
  const thumbnail =
    "https://img.sonyunara.com/files/goods/69048/1611793473_21.jpg";
  const name = "sbs927 자꾸자꾸 파스텔 스탠다드핏 셔츠 7colors";
  const writer = "춘식이";
  const title = "상품에 대해 문의사항이 있습니다.";
  const question =
    "질문내용입니다 질문내용입니다 질문내용입니다 질문내용입니다";
  const answer =
    "답변내용입니다 답변내용입니다 답변내용입니다 답변내용입니다 답변내용입니다 답변내용입니다 ";

  return (
    <div>
      <div>상품 Q&A 답변확인</div>
      <IconX />
      <br />

      <QnAItemInfo thumbnail={thumbnail} name={name} />
      <div>
        <div name="Q">
          <div name="questionHead">
            <div name="qnaTitle">
              <label>제목</label>
              <div>{title}</div>
            </div>
            <div name="qnaWriter">
              <label>작성자</label>
              <div>{writer}</div>
            </div>
          </div>

          <div name="questionMain">
            <label>문의사항</label>
            <p style={{ whiteSpace: "pre-line" }}>{question}</p>
          </div>
        </div>

        <div name="A">
          <label>관리자</label>
          <div>
            <p style={{ whiteSpace: "pre-line" }}>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswCheckPopup;
