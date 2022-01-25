import React, { useState } from "react";

const LEFT = "left_btn";
const RIGHT = "right_btn";

const ImgSection = ({ imgsrcs, defaultIdx }) => {
  const [imgIdx, setImgIdx] = useState(defaultIdx);
  const onBtnClick = (e) => {
    e.target.id === LEFT
      ? setImgIdx((curIdx) => (curIdx - 1 + imgsrcs.length) % imgsrcs.length)
      : setImgIdx((curIdx) => (curIdx + 1) % imgsrcs.length);
  };
  const onImgClick = (e) => setImgIdx(e.target.id);

  return (
    <div>
      <div>
        <button id={LEFT} onClick={onBtnClick}>
          ◀
        </button>
        <img id="main-img" src={imgsrcs[imgIdx]}></img>
        <button id={RIGHT} onClick={onBtnClick}>
          ▶
        </button>
      </div>
      <div>
        {imgsrcs.map((src, idx) => (
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
