import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const QNA_NUM_UNIT = 5;
const PAGE_NUM_UNIT = 5;
const PAGE_UP = "pageUp";
const PAGE_DOWN = "pageDown";
const PAGE_MIN = "pageMax";
const PAGE_MAX = "pageMin";

const QnATable = () => {
  const [qnAs, setQnAs] = useState([
    { title: "건의사항", name: "라이언", isAnswered: false },
    { title: "제품문제", name: "어피치", isAnswered: true },
    { title: "카카오톡", name: "제이지", isAnswered: true },
    { title: "배송문제", name: "튜브", isAnswered: false },
    { title: "건의사항", name: "라이언", isAnswered: false },
    { title: "제품문제", name: "어피치", isAnswered: false },
    { title: "카카오톡", name: "제이지", isAnswered: false },
    { title: "배송문제", name: "튜브", isAnswered: false },
    { title: "건의사항", name: "라이언", isAnswered: false },
    { title: "제품문제", name: "어피치", isAnswered: false },
    { title: "카카오톡", name: "제이지", isAnswered: false },
    { title: "배송문제", name: "튜브", isAnswered: false },
    { title: "건의사항", name: "라이언", isAnswered: false },
    { title: "제품문제", name: "어피치", isAnswered: false },
    { title: "카카오톡", name: "제이지", isAnswered: false },
    { title: "배송문제", name: "튜브", isAnswered: false },
    { title: "건의사항", name: "라이언", isAnswered: false },
    { title: "제품문제", name: "어피치", isAnswered: false },
    { title: "카카오톡", name: "제이지", isAnswered: false },
    { title: "배송문제", name: "튜브", isAnswered: false },
    { title: "건의사항", name: "라이언", isAnswered: false },
    { title: "제품문제", name: "어피치", isAnswered: false },
    { title: "카카오톡", name: "제이지", isAnswered: false },
    { title: "배송문제", name: "튜브", isAnswered: false },
  ]);
  const [selectablePages, setSelectablePages] = useState([]);
  const [curPageNum, setCurPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isWriter, setIsWriter] = useState(false);

  const onPageBtnClick = (e) => {
    switch (e.target.id) {
      case PAGE_UP:
        if (curPageNum < totalPageNum) setCurPageNum((cur) => cur + 1);
        break;
      case PAGE_DOWN:
        if (curPageNum > 1) setCurPageNum((cur) => cur - 1);
        break;
      case PAGE_MAX:
        setCurPageNum(totalPageNum);
        break;
      case PAGE_MIN:
        setCurPageNum(1);
        break;
    }
  };

  useEffect(() => {
    setTotalPageNum(parseInt(qnAs.length / PAGE_NUM_UNIT) + 1);
  }, [qnAs]);
  useEffect(() => {
    setSelectablePages(
      Array.from({ length: totalPageNum }, (_, i) => i + 1).filter(
        (pageNum) => {
          const share =
            curPageNum % PAGE_NUM_UNIT === 0
              ? parseInt(curPageNum / PAGE_NUM_UNIT) - 1
              : parseInt(curPageNum / PAGE_NUM_UNIT);
          return (
            (pageNum % PAGE_NUM_UNIT === 0 &&
              parseInt(pageNum / PAGE_NUM_UNIT) === share + 1) ||
            (pageNum % PAGE_NUM_UNIT !== 0 &&
              parseInt(pageNum / PAGE_NUM_UNIT) === share)
          );
        }
      )
    );
  }, [curPageNum, totalPageNum]);
  return (
    <div>
      <table>
        <colgroup>
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
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          {qnAs.map((q, idx) =>
            idx + 1 >= (curPageNum - 1) * QNA_NUM_UNIT + 1 &&
            idx + 1 <= curPageNum * QNA_NUM_UNIT ? (
              <tr key={"qna_" + idx}>
                <td>{idx + 1}</td>
                <td>{q.title}</td>
                <td>{q.name}</td>
                <td>
                  <button disabled={!isWriter}>
                    {!q.isAnswered
                      ? "답변대기"
                      : isWriter
                      ? "답변확인"
                      : "답변완료"}
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>

      <div name="pageChanger">
        <button id={PAGE_MIN} onClick={onPageBtnClick}>
          ⏪
        </button>
        <button id={PAGE_DOWN} onClick={onPageBtnClick}>
          ◀
        </button>
        {selectablePages.map((page) => (
          <span style={curPageNum === page ? { color: "#ba68c8" } : null}>
            {page}
          </span>
        ))}
        <button id={PAGE_UP} onClick={onPageBtnClick}>
          ▶
        </button>
        <button id={PAGE_MAX} onClick={onPageBtnClick}>
          ⏩
        </button>
      </div>
    </div>
  );
};

QnATable.propTypes = {};

export default QnATable;
