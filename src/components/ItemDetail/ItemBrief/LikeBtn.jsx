import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { OnlyLikeNumState } from "../itemData/itemData";

const LikeBtn = () => {
  const [likesNum, setLikesNum] = useState(useRecoilValue(OnlyLikeNumState));
  const [isLiked, setIsLiked] = useState(false);
  const onClick = () => {
    isLiked ? setLikesNum((cur) => cur - 1) : setLikesNum((cur) => cur + 1);
    setIsLiked((cur) => !cur);
  };
  return (
    <>
      <button onClick={onClick}>
        {isLiked ? "💘" : "🤍"}
        {"  "}
        {likesNum}
      </button>
    </>
  );
};

export default LikeBtn;
