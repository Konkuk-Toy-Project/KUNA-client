import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconNext from "../../client/Icon/IconNext";
import IconPrev from "../../client/Icon/IconPrev";
const LEFT = "left_btn";
const RIGHT = "right_btn";
const PAGE_UNIT = 5;

const ImgSlide = ({ imgsrcs, defaultIdx, mainW, subW }) => {
  const [imgIdx, setImgIdx] = useState(defaultIdx);
  const onLeftBtnClick = (e) => {
    setImgIdx((curIdx) => (curIdx - 1 + imgsrcs.length) % imgsrcs.length);
  };
  const onRightBtnClick = (e) => {
    setImgIdx((curIdx) => (curIdx + 1) % imgsrcs.length);
  };
  const onImgClick = (e) => {
    setImgIdx(parseInt(e.target.id));
  };
  const [imgPageNum, setImgPageNum] = useState(1);

  useEffect(() => {
    setImgPageNum(parseInt(imgIdx / PAGE_UNIT));
  }, [imgIdx]);

  return (
    <ImgSlideWrapper size={mainW}>
      <MainImgWrapper size={mainW}>
        <MainImg id="main-img" src={imgsrcs[imgIdx]}></MainImg>
        <NextPrevWrapper>
          <NextPrevFlex>
            <IconPrev name={LEFT} onClick={onLeftBtnClick} />
            <IconNext name={RIGHT} onClick={onRightBtnClick} />
          </NextPrevFlex>
        </NextPrevWrapper>
      </MainImgWrapper>
      <SubImgWrapper>
        {imgsrcs.map((src, idx) =>
          parseInt(idx / PAGE_UNIT) === imgPageNum ? (
            <SubImg
              key={"imgSlide_" + idx}
              id={idx}
              src={src}
              onClick={onImgClick}
              border={idx === imgIdx ? "true" : "false"}
              size={subW}
            />
          ) : null
        )}
      </SubImgWrapper>
    </ImgSlideWrapper>
  );
};

const ImgSlideWrapper = styled.div`
  width: ${({ size }) => size || "560px"};
`;

const MainImgWrapper = styled.div`
  width: ${({ size }) => size || "560px"};
  height: ${({ size }) => size || "560px"};
  position: relative;
`;

const MainImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const NextPrevFlex = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 60px;
  color: white;
`;

const NextPrevWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const SubImgWrapper = styled.div`
  margin-top: 2px;
`;

const SubImg = styled.img`
  display: inline-block;
  box-sizing: border-box;
  width: ${({ size }) => size || "110px"};
  height: ${({ size }) => size || "110px"};
  margin-right: 2px;
  border-radius: 5px;
  object-fit: cover;
  border: ${({ border }) => (border === "true" ? "solid #c76fd6 2px" : "none")};
  cursor: pointer;
`;
export default ImgSlide;
