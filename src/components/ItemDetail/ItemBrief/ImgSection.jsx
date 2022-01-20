import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ItemBriefImgsState } from "../itemData/itemData";

const LEFT = "left_btn";
const RIGHT = "right_btn";

const ImgSection = () => {
  const itemImgSrcs = useRecoilValue(ItemBriefImgsState);

  const [imgIdx, setImgIdx] = useState(0);
  const onBtnClick = (e) => {
    e.target.id === LEFT
      ? setImgIdx(
          (curIdx) => (curIdx - 1 + itemImgSrcs.length) % itemImgSrcs.length
        )
      : setImgIdx((curIdx) => (curIdx + 1) % itemImgSrcs.length);
  };
  const onImgClick = (e) => setImgIdx(e.target.id);

  return (
    <div>
      <div>
        <button id={LEFT} onClick={onBtnClick}>
          ◀
        </button>
        <img id="main-img" src={itemImgSrcs[imgIdx]}></img>
        <button id={RIGHT} onClick={onBtnClick}>
          ▶
        </button>
      </div>
      <div>
        {itemImgSrcs.map((src, idx) => (
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
