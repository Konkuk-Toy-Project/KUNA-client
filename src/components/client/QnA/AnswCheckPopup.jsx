import React from "react";
import IconX from "../Icon/IconX";
import QnAItemInfo from "./QnAItemInfo";
import PropTypes from "prop-types";

const AnswCheckPopup = ({ qnaData, itemData, setSelAnswIdx }) => {
  const onClick = () => setSelAnswIdx(null);
  return (
    <div>
      <div>상품 Q&A 답변확인</div>
      <IconX onClick={onClick} />
      <br />

      <QnAItemInfo thumbnail={itemData.img} name={itemData.name} />
      <div>
        <div name="Q">
          <div name="questionHead">
            <div name="qnaTitle">
              <label>제목</label>
              <div>{qnaData.title}</div>
            </div>
            <div name="qnaWriter">
              <label>작성자</label>
              <div>{qnaData.memberName}</div>
            </div>
          </div>

          <div name="questionMain">
            <label>문의사항</label>
            <p style={{ whiteSpace: "pre-line" }}>{qnaData.question}</p>
          </div>
        </div>

        <div name="A">
          <label>관리자</label>
          <div>
            <p style={{ whiteSpace: "pre-line" }}>{qnaData.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

AnswCheckPopup.propTypes = {
  qnaData: PropTypes.object.isRequired,
  itemData: PropTypes.object.isRequired,
  setSelAnswIdx: PropTypes.func.isRequired,
};

export default AnswCheckPopup;
