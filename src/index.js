import express from "express";

const PORT = 3000;

const app = express();



app.listen(PORT, (e) => {
  console.log("hello world!", PORT)
})