// const express = require("express");
import express from "express";

const app = express();

// API - 서버 켜져있을 때만 가능
app.get("/boards", function (req, res) {
  res.send("게시물 등록 성공!!");
});

// app.post('/board', function(req,res){

// })
//

app.listen(3000, () => {
  console.log("서버프로그램을 켜는데 성공했어요!!");
}); // api 24시간동안 켜줘, 다른사람의 접속을 기다리는 아이다
