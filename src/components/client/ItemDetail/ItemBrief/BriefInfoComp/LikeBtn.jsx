import React, { useState } from "react";
import PropTypes from "prop-types";

const LikeBtn = ({ num }) => {
  const [likesNum, setLikesNum] = useState(num);
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
LikeBtn.propTypes = {
  num: PropTypes.number.isRequired,
};

export default LikeBtn;
