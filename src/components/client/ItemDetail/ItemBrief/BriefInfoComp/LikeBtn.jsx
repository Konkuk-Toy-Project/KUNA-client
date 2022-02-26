import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../../../store/common/user";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 로그인했는지 아닌지 판단 how? - 에러코드 보내달라고 하기
const LikeBtn = ({ itemId, num }) => {
  const [likesNum, setLikesNum] = useState(num);
  const [likeId, setLikeId] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [didGetLikeInfo, setDidGetLikeInfo] = useState(false);
  const userToken = useRecoilValue(userTokenState);
  const navigate = useNavigate();

  useEffect(() => getPreference(), []);
  const getPreference = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/preference/isPreference/${itemId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setIsLogin(response.data.login);
      setIsLiked(response.data.preference);
      setLikeId(response.data.preferenceId);
      setDidGetLikeInfo(true);

      return;
    } catch (error) {
      console.log(error);
      if (error.response) {
        const message = error.response.message;
        if (message !== undefined) {
          alert(error.response.message);
          return;
        }
      }
      alert("오류가 발생했습니다. 다시 한번 시도해주세요.");
    }
  };

  const postLike = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/preference",
        { itemId: itemId },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
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
    if (likeId === null) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/preference/${likeId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
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
    if (!isLogin) {
      if (window.confirm("로그인이 필요합니다. 로그인하시겠습니까?"))
        navigate("/login");
      return;
    }

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
      <Button
        onClick={onClick}
        isLiked={isLiked ? "true" : "false"}
        disabled={!didGetLikeInfo}
      >
        {!didGetLikeInfo ? (
          <LoadingSpan>LOADING...</LoadingSpan>
        ) : (
          <>
            {isLiked ? "💘" : "💔"}
            {"    "}

            {likesNum}
          </>
        )}
      </Button>
    </>
  );
};
LikeBtn.propTypes = {
  num: PropTypes.number.isRequired,
};

const Button = styled.button`
  box-sizing: border-box;
  text-align: center;
  width: 80px;
  height: 30px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  line-height: 30px;
  background-color: ${({ isLiked }) =>
    isLiked == "true" ? "black" : "#424242"};
  color: white;
  &:hover {
    background-color: black;
  }
  &:disabled {
    background-color: #707070;
    color: white;
    &:hover {
      background-color: #707070;
      color: white;
      cursor: default;
    }
  }
`;

const LoadingSpan = styled.span`
  font-size: 13px;
`;

export default LikeBtn;
