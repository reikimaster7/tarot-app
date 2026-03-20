

// ← これが最初に来る
const app = express();

// ミドルウェア
import cors from "cors";
import express from "express";



app.use(cors());
app.use(express.json());

// ⭐ これ絶対必要
app.post("/api/tarot", (req, res) => {
  console.log("受信:", req.body);

  res.json({
    message: "🔮 あなたの未来は良い流れにあります。自信を持って進んでください。"
  });
});

app.listen(3000, () => {
  console.log("http://localhost:3000 起動中");
});