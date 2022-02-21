import React, { useState } from "react";
import PropTypes from "prop-types";
import PageChanger from "../../common/PageChanger/PageChanger";
import styled from "styled-components";

const QNA_NUM_UNIT = 5;

const QnATable = ({ qnAs, setSelAnswIdx }) => {
  const [curPageNum, setCurPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const onAnswClick = (e) => setSelAnswIdx(e.target.dataset.id);

  return (
    <QnATableWrapper>
      <Table>
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "45%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "12.5%" }} />
          <col style={{ width: "12.5%" }} />
        </colgroup>
        <Thead>
          <tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>날짜</Th>
            <Th>답변상태</Th>
          </tr>
        </Thead>
        <tbody>
          {qnAs.map((q, idx) =>
            idx + 1 >= (curPageNum - 1) * QNA_NUM_UNIT + 1 &&
            idx + 1 <= curPageNum * QNA_NUM_UNIT ? (
              <Tr key={"qna_" + idx}>
                <td>{idx + 1}</td>
                <td>{q.secret == true ? "비밀글입니다." : q.title}</td>
                <td>{q.memberName}</td>
                <td>
                  {q.registryDate === null
                    ? "-"
                    : q.registryDate.substring(0, 10)}
                </td>
                <td>
                  <AnswButton
                    onClick={onAnswClick}
                    disabled={q.title === null || !q.answered}
                    data-id={idx}
                  >
                    {!q.answered
                      ? "답변대기"
                      : q.title != null
                      ? "답변확인"
                      : "답변완료"}
                  </AnswButton>
                </td>
              </Tr>
            ) : null
          )}
        </tbody>
      </Table>

      <PageChanger
        data={qnAs}
        curPageNum={curPageNum}
        setCurPageNum={setCurPageNum}
        totalPageNum={totalPageNum}
        setTotalPageNum={setTotalPageNum}
        pageUnit={5}
      />
    </QnATableWrapper>
  );
};

QnATable.propTypes = { qnAs: PropTypes.array.isRequired };
const QnATableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Table = styled.table`
  text-align: center;
`;
const Thead = styled.thead`
  border-top: solid black 2px;
  border-bottom: solid #8d8d8d 1px;
  height: 50px;
  line-height: 50px;
`;
const Th = styled.th`
  font-weight: bold;
`;

const Tr = styled.tr`
  height: 50px;
  line-height: 50px;
  border-bottom: 0.5px solid #efefef;
`;

const AnswButton = styled.button`
  display: inline-block;
  height: 27px;
  widht: 120px;
  border: none;
  outline: none;
  border-radius: 7px;

  background-color: #b44bd1;
  color: white;

  &:disabled {
    background-color: #cfcfcf;
    color: #9e9e9e;
  }

  &:hover {
    background-color: #790e8b;
    &:disabled {
      background-color: #cfcfcf;
      color: #9e9e9e;
    }
  }
  cursor: pointer;
`;

export default QnATable;
