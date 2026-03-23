import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

//const text = (isReversed ? card.rev : card.up)
//  .replace(/。/g, "。<br>");

app.use(cors());
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();


await new Promise(r => setTimeout(r, 1500));


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
    //res.status(500).json({ message: "AIエラー" });

     // 👇 仮メッセージ (AI課金待ち)
  //res.json({
  //  message: "🔮 今は大きな転機の中にいます。焦らず、自分の直感を信じてください。これからよりよくなります。ワクワクすることに向かって一生懸命にうごくことがポイントです。１年後の自分のイメージをしてよい未来を引き寄せましょう。"
  //    });


        try{
    // 👇 仮メッセージで固定（今はAI使わない）
    return res.json({
      message: `🔮 今は大きな転機の中にいます。
           焦らず、自分の直感を信じてください。
           これからよりよくなります。
          ワクワクすることに向かって動くことがポイントです。

           1年後の自分をイメージして
           よい未来を引き寄せましょう。`
    });

  };)


// 起動
app.listen(3000, () => {
  console.log("http://localhost:3000 起動中");
});


// ⭐ 占い回数制限（IPアドレスごとに3回まで）

let userCount = {}; // 仮（本来はDB）

//app.post("/api/tarot", (req, res) => {
//  const userId = req.ip;

 // if (!userCount[userId]) {
 //   userCount[userId] = 0;
 // }

 // if (userCount[userId] >= 3) {
 //   return res.json({
 //     limit: true,
 //     message: "広告を見る必要があります"
 //   });
 // }

 // userCount[userId]++;

  //res.json({
  //  limit: false,
  //  message: "占い結果！"
  //});
//});

