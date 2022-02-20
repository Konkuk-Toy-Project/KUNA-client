import React, { useState } from "react";
import IconX from "../Icon/IconX";
import QnAItemInfo from "./QnAItemInfo";
import PropTypes from "prop-types";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { qnaIdsState } from "../../../store/client/qnaIds";
import { qnAWritePopupState } from "../../../store/client/popup";
import { userTokenState } from "../../../store/common/user";
import styled from "styled-components";

const WriteQnAPopUp = ({ itemData }) => {
  const [isSecret, setIsSecret] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const setNewQnaIds = useSetRecoilState(qnaIdsState);
  const setPopWriteQnA = useSetRecoilState(qnAWritePopupState);
  const userToken = useRecoilValue(userTokenState);

  //const [loading, setLoading] = useState(false);

  const onSecretClick = () => setIsSecret((cur) => !cur);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onClosePopClick = () => {
    setIsSecret(false);
    setTitle("");
    setText("");
    setPopWriteQnA(false);
  };

  const onSubmitClick = () => {
    if (title === "" || text === "") {
      alert("제목과 문의사항을 모두 입력해주세요.");
      return;
    }
    setPopWriteQnA(false);
    postNewQnA();
  };

  const postNewQnA = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/qna",
        {
          itemId: itemData.itemId,
          secret: isSecret,
          question: text,
          title: title,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setNewQnaIds((cur) => cur.concat(response.data.qnaId));
    } catch (error) {
      alert(
        error.response && error.response.message !== undefined
          ? error.response.message
          : "오류가 발생했습니다. 다시 시도해주세요"
      );
    }
  };

  return (
    <PopupBackGround>
      <PopupContentWrapper>
        <IconXWrapper>
          <IconX onClick={onClosePopClick} />
        </IconXWrapper>
        <PopupTitleWrapper>
          <TitleSpan>상품 Q&A 작성하기</TitleSpan>
        </PopupTitleWrapper>
        <QnAItemInfo
          thumbnail={`http://localhost:8080/image/thumbnail/${itemData.thumbnailUrl}`}
          name={itemData.name}
        />

        <InputWrapper name="writeSection">
          <InputHeaderWrapper>
            <TitleInputWrapper>
              <Label htmlFor="qnaTitle">제목</Label>
              <TitleInput
                type="text"
                className="qnaTitle"
                onChange={onTitleChange}
                value={title}
              />
            </TitleInputWrapper>
            <SecretCheckWrapper>
              <Label>비밀글</Label>
              <input
                type="checkbox"
                checked={isSecret}
                onChange={onSecretClick}
              />
            </SecretCheckWrapper>
          </InputHeaderWrapper>

          <TextAreaWrapper name="main">
            <TextArea
              placeholder="문의사항을 작성해주세요."
              name="qna"
              className="qnaMain"
              onChange={onTextChange}
              value={text}
            ></TextArea>
          </TextAreaWrapper>
        </InputWrapper>

        <BtnWrapper>
          <Button onClick={onSubmitClick}>확인</Button>
          <Button onClick={onClosePopClick}>취소</Button>
        </BtnWrapper>
      </PopupContentWrapper>
    </PopupBackGround>
  );
};

WriteQnAPopUp.propTypes = {
  itemData: PropTypes.object.isRequired,
  setNewQnaIds: PropTypes.func.isRequired,
  setPopWriteQnA: PropTypes.func.isRequired,
};

const PopupBackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

const PopupContentWrapper = styled.div`
  poistion: relative;
  width: 450px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IconXWrapper = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
`;

const PopupTitleWrapper = styled.div`
  width: 95%;
  height: 10%;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #424242;
  margin: 10px 10px 15px 10px;
`;

const TitleSpan = styled.span`
  display: inline-block;
  padding-right: 5px;
`;
const InputWrapper = styled.div`
  width: 90%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: solid 1px #e0e0e0;
  margin: 15px 0px;
  padding: 0 10px;
`;

const InputHeaderWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const TitleInputWrapper = styled.div`
  height: 100%;
  flex-basis: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleInput = styled.input`
  display: inline-block;
  height: 60%;
  width: 85%;
  border: none;
  border-bottom: 1px solid #707070;
`;
const SecretCheckWrapper = styled.div`
  height: 100%;
  flex-basis: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 15px;
  width: 60px;
  text-align: center;
`;

const TextAreaWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextArea = styled.textarea`
  box-sizing: border-box;
  display: inline-block;
  flex-grow: 1;
  height: 95%;
  margin: 0 15px;
  font-size: 16px;
  line-height: 150%;
  padding: 15px;
  font-family: 고딕;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 80%;
  margin: 0 0 20px 0;
`;
const Button = styled.button`
  display: inline-block;
  width: 49%;
  height: 100%;
  border-radius: 5px;
  margin: 0 2px;
  font-size: 15px;
  background-color: #424242;
  color: white;
  border: none;
  outline: none;

  &:hover {
    border: 2px black solid;
    background-color: black;
  }
`;

export default WriteQnAPopUp;
