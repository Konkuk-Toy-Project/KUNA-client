import React from "react";
import IconX from "../Icon/IconX";
import QnAItemInfo from "./QnAItemInfo";
import PropTypes from "prop-types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selAnswIdxState } from "../../../store/client/popup";
import { qnasState } from "../../../store/client/qnas";
import styled from "styled-components";
import IconUser from "../Icon/IconUser";

const AnswCheckPopup = ({ itemData }) => {
  const setSelAnswIdx = useSetRecoilState(selAnswIdxState);
  const qnaData = useRecoilValue(qnasState)[useRecoilValue(selAnswIdxState)];
  const onClick = () => setSelAnswIdx(null);
  return (
    <PopupBackGround>
      <PopupContentWrapper>
        {/* <IconXWrapper>
          <IconX onClick={onClick} />
        </IconXWrapper> */}
        <PopupTitleWrapper>
          <TitleSpan>상품 Q&A 답변확인</TitleSpan>
        </PopupTitleWrapper>

        <QnAItemInfo
          thumbnail={`http://localhost:8080/image/thumbnail/${itemData.thumbnailUrl}`}
          name={itemData.name}
        />
        <PopupContent>
          <QWrapper>
            <QHeader>
              <TitleWrapper>
                <Label>제목 │ </Label>
                <div>{qnaData.title}</div>
              </TitleWrapper>
              <WriterWrapper>
                <UserIconWrapper>
                  <IconUser />
                </UserIconWrapper>
                <div>{qnaData.memberName}</div>
              </WriterWrapper>
            </QHeader>

            <Main>
              <p style={{ whiteSpace: "pre-line" }}>{qnaData.question}</p>
            </Main>
          </QWrapper>

          <AnswerWrapper name="A">
            <Label>관리자의 답변</Label>
            <Main>
              <p style={{ whiteSpace: "pre-line" }}>{qnaData.answer}</p>
            </Main>
          </AnswerWrapper>
        </PopupContent>
        <BtnWrapper>
          <Button onClick={onClick}>확인</Button>
        </BtnWrapper>
      </PopupContentWrapper>
    </PopupBackGround>
  );
};

AnswCheckPopup.propTypes = {
  itemData: PropTypes.object.isRequired,
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
  width: 450px;
  height: 500px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const PopupContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 5px 0;
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
const QWrapper = styled.div`
  width: 100%;
`;

const QHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

const Main = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  line-height: 150%;
  border-radius: 3px;
  border: solid 0.3px #bdbdbd;
`;

const AnswerWrapper = styled.div`
  margin-top: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 30px;
  margin: 5px 0;
  line-height: 30px;
  border-bottom: 0.5px solid #424242;
`;

const WriterWrapper = styled.div`
  flex-basis: 40%;
  display: flex;
  font-size: 14px;
  color: #494949;
  margin-bottom: 3px;
`;

const Label = styled.label`
  display: inline-block;
  font-weight: bold;
  padding: 0 3px 5px 0;
  font-size: 14px;
`;

const UserIconWrapper = styled.div`
  padding-right: 5px;
  color: #790e8b;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 80%;
  margin: 5px 0 10px 0;
`;
const Button = styled.button`
  display: inline-block;
  flex-basis: 60px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  margin: 5px 2px;
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

export default AnswCheckPopup;
