

// ← これが最初に来る
//const app = express();

// ミドルウェア

//import express from "express";
//import cors from "cors";



app.use(cors());
app.use(express.json());

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/tarot", (req, res) => {
  const { cards } = req.body;

  const positions = ["過去", "現在", "未来"];

  // 🔮 カード文章生成
  const detail = cards.map((c, i) => {
    const pos = positions[i];
    const rev = c.isReversed ? "逆位置" : "正位置";

    return `【${pos}】${c.name}（${rev}）`;
  }).join("\n");

  // 🔥 プロ占い師プロンプト
  const message = `
あなたの運命の流れを読み解きます。

${detail}

まず、過去には重要な意味があります。
それは今のあなたを形作った出来事や感情を示しています。

現在は、まさに選択の中にいる状態です。
迷いや不安があったとしても、それは前に進もうとしている証です。

そして未来には、大きな流れの変化が見えます。
今のあなたの選択次第で、その方向は大きく変わるでしょう。

大切なのは「恐れではなく直感で選ぶこと」。

あなたの内側には、すでに答えがあります。
その声を信じてください。

焦る必要はありません。
すべては最善のタイミングで動き出します。

✨ あなたの未来は、静かに、しかし確実に良い方向へ向かっています。
`;

  res.json({ message });
});

app.listen(3000, () => {
  console.log("http://localhost:3000 起動中");
});