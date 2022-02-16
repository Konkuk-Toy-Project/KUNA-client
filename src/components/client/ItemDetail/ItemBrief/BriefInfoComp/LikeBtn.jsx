import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../../../store/common/user";

// 로그인했는지 아닌지 판단 how? - 에러코드 보내달라고 하기
const LikeBtn = ({ itemId, num }) => {
  const [likesNum, setLikesNum] = useState(num);
  const [likeId, setLikeId] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const userToken = useRecoilValue(userTokenState);

  useEffect(() => getPreference(), []);
  const getPreference = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/preference/isPreference/${itemId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setIsLogin(response.data.isLogin);
      setIsLiked(response.data.isPreference);
      return;
    } catch (error) {
      if (error.response) {
        const message = error.response.message;
        if (message !== undefined) {
          alert(error.response.message);
          return;
        }
      }
      alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
    }
  }, []);

  const postLike = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/preference", {
        itemId: itemId,
      });
      setLikeId(response.data.preferenceId);
      setLoading(false);
      return;
    } catch (error) {
      if (error.response) {
        const message = error.response.message;
        if (message !== undefined) {
          alert(error.response.message);
          setLoading(false);
          return;
        }
      }
      alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
      setLoading(false);
    }
  };

  const deleteLike = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/preference/${likeId}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const message = error.response.message;
        if (message !== undefined) {
          alert(error.response.message);
          setLoading(false);
          return;
        }
      }
      alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
      setLoading(false);
    }
  };

  const onClick = () => {
    if (isLiked) {
      setLikesNum((cur) => cur - 1);
      deleteLike();
    } else {
      setLikesNum((cur) => cur + 1);
      postLike();
    }
    setIsLiked((cur) => !cur);
  };

  return (
    <>
      <button onClick={onClick} disabled={loading || !isLogin}>
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
