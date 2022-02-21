import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  const onPageNumClick = (e) => {
    setCurPageNum(parseInt(e.target.dataset.pagenum));
  };

  useEffect(() => {
    setTotalPageNum(
      data.length % 5 == 0
        ? parseInt(data.length / pageUnit)
        : parseInt(data.length / pageUnit) + 1
    );
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
    <PageChangerWrapper name="pageChanger">
      <Button id={PAGE_MIN} onClick={onPageBtnClick}>
        《
      </Button>
      <Button id={PAGE_DOWN} onClick={onPageBtnClick}>
        〈
      </Button>
      {selectablePages.map((page, idx) => (
        <PageNumSpan
          key={"qna_p_" + idx}
          style={curPageNum === page ? { color: "#ab47bc" } : null}
          bold={curPageNum === page ? "bold" : "default"}
          data-pagenum={idx + 1}
          onClick={onPageNumClick}
        >
          {page}
        </PageNumSpan>
      ))}
      <Button id={PAGE_UP} onClick={onPageBtnClick}>
        〉
      </Button>
      <Button id={PAGE_MAX} onClick={onPageBtnClick}>
        》
      </Button>
    </PageChangerWrapper>
  );
};

PageChanger.propTypes = {
  curPageNum: PropTypes.number.isRequired,
  setCurPageNum: PropTypes.func.isRequired,
  totalPageNum: PropTypes.number.isRequired,
  setTotalPageNum: PropTypes.func.isRequired,
  pageUnit: PropTypes.number.isRequired,
};

const PageChangerWrapper = styled.div`
  font-size: 18px;
  display: flex;
  width: 100%;
  justify-content: center;
  margin 20px 0 40px 0;
`;

const PageNumSpan = styled.span`
  display: inline-block;
  margin: 0 3px;
  font-weight: ${({ bold }) => bold};
  cursor: pointer;
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  outline: none;
  font-weight: bold;
  background-color: transparent;
  margin: 0 2px;
  cursor: pointer;
`;

export default PageChanger;
