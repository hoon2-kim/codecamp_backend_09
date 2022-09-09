import mongoose from "mongoose";

// 스키마(데이터구조)를 새롭게 만들거야
const BoardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
});

// 모델(컬렉션)만들기
export const Board = mongoose.model("Board", BoardSchema); // Board라는 이름의 컬렉션 만들꺼고 구조는 BoardSchema로 해줘
