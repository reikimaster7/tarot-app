import express from "express";
import cors from "cors";

// ← これが最初に来る
const app = express();

// ミドルウェア
app.use(cors());
app.use(express.json());

// API
app.post("/api/tarot", (req, res) => {
  console.log("受信:", req.body);

  res.json({
    message: "🔮 あなたの未来は明るい流れにあります。焦らず進みましょう。"
  });
});

// 起動
app.listen(3000, () => {
  console.log("サーバー起動 http://localhost:3000");
});