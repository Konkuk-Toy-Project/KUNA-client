import React from "react";
import PropTypes from "prop-types";

const QnATable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>답변상태</th>
        </tr>
      </thead>
    </table>
  );
};

QnAComp.propTypes = {};

export default QnATable;
