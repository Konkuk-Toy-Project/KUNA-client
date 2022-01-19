import React, { useState } from "react";

const subImgSrcs = [
  "https://img.sonyunara.com/files/goods/139373/1637742098_0.jpg",
  "https://img.sonyunara.com/files/goods/139373/1637652166_2.jpg",
  "https://img.sonyunara.com/files/goods/139373/1637657482_3.jpg",
  "https://img.sonyunara.com/files/goods/139373/1637715429_4.jpg",
  "https://img.sonyunara.com/files/goods/139373/1637740513_16.jpg",
];

const LEFT = "left_btn";
const RIGHT = "right_btn";

const ImgSection = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const onBtnClick = (e) => {
    e.target.id === LEFT
      ? setImgIdx(
          (curIdx) => (curIdx - 1 + subImgSrcs.length) % subImgSrcs.length
        )
      : setImgIdx((curIdx) => (curIdx + 1) % subImgSrcs.length);
  };
  const onImgClick = (e) => setImgIdx(e.target.id);

  return (
    <div>
      <div>
        <button id={LEFT} onClick={onBtnClick}>
          ◀
        </button>
        <img id="main-img" src={subImgSrcs[imgIdx]}></img>
        <button id={RIGHT} onClick={onBtnClick}>
          ▶
        </button>
      </div>
      <div>
        {subImgSrcs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            id={idx}
            onClick={onImgClick}
            width={120}
            height={120}
          />
        ))}
      </div>
    </div>
  );
};

export default ImgSection;
