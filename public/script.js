console.log("JS読み込みOK");
alert("ここ読んでる？");

// ===== DOM =====
const resultEl = document.getElementById("result");
const drawBtn = document.getElementById("drawBtn");

const modalEl = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeBtn");



// ===== カード =====
const cards = [
{
  name:"愚者",
  img:"images/major_01_fool.png",
  up:"新しい始まりの時です。",
  rev:"軽率な行動に注意。"
},
{
  name:"魔術師",
  img:"images/major_02_magician.png",
  up:"すべてを実現する力があります。",
  rev:"自信のなさに注意。"
},
{
  name:"女教皇",
  img:"images/major_03_high_priestess.png",
  up:"直感が冴えています。",
  rev:"迷いが生じています。"
}
];

// ===== シャッフル =====
function shuffle(array){
  const arr = [...array];
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== AI通信 =====
console.log("送信前");

async function getFinalReading(results){

  console.log("送信前");

  const res = await fetch("http://localhost:3000/api/tarot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cards: results.map((r, i)=>({
        name: r.card.name,
        position: i === 0 ? "過去" : i === 1 ? "現在" : "未来",
        isReversed: r.isReversed
      }))
    })
  });

  console.log("レスポンス来た", res);

  const data = await res.json();

  console.log("中身", data);

  return data.message;

} // ← ⭐これ重要

// drawBtn.disabled = true;

// ===== 占い =====
let isDrawing = false;

function drawThree(){

  console.log("ボタン押された"); // ← これ追加
  
  if(isDrawing) return;
  isDrawing = true;

  resultEl.innerHTML = "🔮 シャッフル中...";

  const results = [];

  setTimeout(()=>{

    resultEl.innerHTML = "";

    const draw = shuffle(cards).slice(0,3);
    const positions = ["過去","現在","未来"];

    draw.forEach((card,index)=>{

      setTimeout(()=>{

        const isReversed = Math.random() < 0.5;
        results.push({ card, isReversed });

        const text = isReversed ? card.rev : card.up;

        const cardEl = document.createElement("div");
        cardEl.className = "card";

        cardEl.innerHTML = `
          <h3>${positions[index]}</h3>
          <img src="${card.img}" class="${isReversed ? "reversed" : ""}">
          <p>${card.name}</p>
          <p>${isReversed ? "🔻逆位置" : "🔺正位置"}</p>
          <p>${text}</p>
        `;

        resultEl.appendChild(cardEl);

      }, index * 800);
    });
  

    // ✅ 全部終わるのを待つ（ここが重要）



      setTimeout(async ()=>{

  console.log("🔥 AIゾーン来た");

  const summary = document.createElement("div");
  summary.innerHTML = `
    <h2>🔮 総合リーディング</h2>
    <p id="loading">✨ AIが読み解いています...</p>
    <p id="resultText"></p>
  `;
  resultEl.appendChild(summary);

  try{
    const aiMessage = await getFinalReading(results);

    const loadingEl = document.getElementById("loading");
    const resultElText = document.getElementById("resultText");

    loadingEl.style.display = "none";

    typeText(resultElText, aiMessage, 40);

  }catch(e){
    console.log(e);
  }

  // 👇 これ追加！！！！！！！！
  isDrawing = false;

  //drawBtn.disabled = false;

}, 3000);

  }, 1000);   
}


//

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



//
function typeText(element, text, speed = 50){
  let i = 0;
  element.textContent = "";

  function typing(){
    if(i < text.length){
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}


// ===== モーダル =====
function openModal(card, isReversed){
  modalEl.style.display = "flex";
  modalImg.src = card.img;
  modalName.textContent = card.name;
  modalText.textContent = isReversed ? card.rev : card.up;
}

function closeModal(){
  modalEl.style.display = "none";
}

// ===== イベント =====
drawBtn.addEventListener("click", drawThree);
closeBtn.addEventListener("click", closeModal);
