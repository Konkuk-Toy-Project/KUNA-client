import React, { useState } from "react";
import PropTypes from "prop-types";
import PageChanger from "../../common/PageChanger/PageChanger";

const QNA_NUM_UNIT = 5;

const QnATable = ({ qnAs, setSelAnswIdx }) => {
  const [curPageNum, setCurPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const onAnswClick = (e) => setSelAnswIdx(e.target.dataset.id);

  return (
    <div>
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          {qnAs.map((q, idx) =>
            idx + 1 >= (curPageNum - 1) * QNA_NUM_UNIT + 1 &&
            idx + 1 <= curPageNum * QNA_NUM_UNIT ? (
              <tr key={"qna_" + idx}>
                <td>{idx + 1}</td>
                <td>{q.secret == true ? "비밀글입니다." : q.title}</td>
                <td>{q.memberName}</td>
                <td>{q.registryDate === null ? "" : q.registryDate}</td>
                <td>
                  <button
                    onClick={onAnswClick}
                    disabled={q.title === null || !q.answered}
                    data-id={idx}
                  >
                    {!q.answered
                      ? "답변대기"
                      : q.title != null
                      ? "답변확인"
                      : "답변완료"}
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>

      <PageChanger
        data={qnAs}
        curPageNum={curPageNum}
        setCurPageNum={setCurPageNum}
        totalPageNum={totalPageNum}
        setTotalPageNum={setTotalPageNum}
        pageUnit={5}
      />
    </div>
  );
};

QnATable.propTypes = { qnAs: PropTypes.array.isRequired };

export default QnATable;
