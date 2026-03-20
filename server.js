import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

app.use(cors());

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ⭐ タロットAPI
app.post("/api/tarot", async (req, res) => {
  try {
    const { cards } = req.body;

    const prompt = `
あなたはプロのタロット占い師です。

以下の3枚のカードから、1つの統合された最終リーディングを作成してください。

${cards.map(c => `${c.position}: ${c.name}（${c.isReversed ? "逆位置" : "正位置"}）`).join("\n")}

条件：
・深く感情に寄り添う
・スピリチュアルすぎず現実的
・200〜300文字
・1つのストーリーとしてまとめる
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      message: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "エラー" });
  }
});

app.listen(3000, () => {
  console.log("🔥 サーバー起動 http://localhost:3000");
});