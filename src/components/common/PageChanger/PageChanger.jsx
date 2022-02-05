import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PAGE_UP = "pageUp";
const PAGE_DOWN = "pageDown";
const PAGE_MIN = "pageMax";
const PAGE_MAX = "pageMin";

const PageChanger = ({
  data,
  curPageNum,
  setCurPageNum,
  totalPageNum,
  setTotalPageNum,
  pageUnit,
}) => {
  const [selectablePages, setSelectablePages] = useState([]);
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
    setTotalPageNum(parseInt(data.length / pageUnit) + 1);
  }, [data]);

  useEffect(() => {
    setSelectablePages(
      Array.from({ length: totalPageNum }, (_, i) => i + 1).filter(
        (pageNum) => {
          const share =
            curPageNum % pageUnit === 0
              ? parseInt(curPageNum / pageUnit) - 1
              : parseInt(curPageNum / pageUnit);
          return (
            (pageNum % pageUnit === 0 &&
              parseInt(pageNum / pageUnit) === share + 1) ||
            (pageNum % pageUnit !== 0 && parseInt(pageNum / pageUnit) === share)
          );
        }
      )
    );
  }, [curPageNum, totalPageNum]);
  return (
    <div name="pageChanger">
      <button id={PAGE_MIN} onClick={onPageBtnClick}>
        ⏪
      </button>
      <button id={PAGE_DOWN} onClick={onPageBtnClick}>
        ◀
      </button>
      {selectablePages.map((page, idx) => (
        <span
          key={"qna_p_" + idx}
          style={curPageNum === page ? { color: "#ba68c8" } : null}
        >
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
  );
};

PageChanger.propTypes = {
  curPageNum: PropTypes.number.isRequired,
  setCurPageNum: PropTypes.func.isRequired,
  totalPageNum: PropTypes.number.isRequired,
  setTotalPageNum: PropTypes.func.isRequired,
  pageUnit: PropTypes.number.isRequired,
};

export default PageChanger;
