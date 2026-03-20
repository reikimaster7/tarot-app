import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();




// ⭐ OpenAI設定
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ⭐ タロットAPI
app.post("/api/tarot", async (req, res) => {
  const { question, cards } = req.body;

  try{

    const prompt = `
あなたはプロのタロット占い師です。

【相談内容】
${question}

【引いたカード】
${cards.map(c =>
  `${c.name}（${c.position}・${c.isReversed ? "逆位置" : "正位置"}）`
).join("、")}

【ルール】
・優しく、でも核心を突く
・抽象ではなく具体的に
・前向きなアドバイスで締める
・300文字くらい

占い結果を書いてください。
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "あなたは経験豊富な占い師です。" },
        { role: "user", content: prompt }
      ]
    });

    const message = completion.choices[0].message.content;

    res.json({ message });

  }catch(e){
    console.error(e);
    res.status(500).json({ message: "AIエラー" });

     // 👇 仮メッセージ (AI課金待ち)
  res.json({
    message: "🔮 今は大きな転機の中にいます。焦らず、自分の直感を信じてください。"
      });


  }
});

// 起動
app.listen(3000, () => {
  console.log("http://localhost:3000 起動中");
});