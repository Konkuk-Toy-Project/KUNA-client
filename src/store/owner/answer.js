import { atom } from "recoil";

export const getAllAnswerState = atom({
  key: "getAllAnswerState",
  default: [
    {
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      question: "재고는 언제 들어오나요?",
      answer: "",
    },
    {
      title: "플립 오프숄더 골지 카라 니트(T)",
      question: "다른 색깔은 없나요?",
      answer: "아직은 해당 색상밖에 존재하지 않습니다.",
    },
  ],
});

export const showAnswerPopUpState = atom({
  key: "showAnswerPopUpState",
  default: false,
});

export const currentAnswerItemState = atom({
  key: "currentAnswerItemState",
  default: {},
});
