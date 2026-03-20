

// ← これが最初に来る
const app = express();

// ミドルウェア


import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/tarot", (req, res) => {
  const cards = req.body.cards;

  // 🔮 プロ占い師風
  const message = `
あなたの運命は今、大きな転換点にあります。

過去の経験は無駄ではなく、すべてが今のあなたを形作っています。
現在は選択の時。迷いがあっても、それは成長の証です。

そして未来——
恐れる必要はありません。
あなたが信じた道こそが、最も正しい流れへと繋がっていきます。

焦らず、しかし確実に前へ進んでください。
運命は、あなたの味方です。
`;

  res.json({ message });
});

app.listen(3000, () => {
  console.log("http://localhost:3000 起動中");
});


app.listen(3000, () => {
  console.log("http://localhost:3000 起動中");
});