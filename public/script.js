console.log("JS読み込みOK");

// ===== DOM =====
const resultEl = document.getElementById("result");
const drawBtn = document.getElementById("drawBtn");

const modalEl = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeBtn");

const questionInput = document.getElementById("questionInput");




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

// ===== 音 =====
const shuffleSound = new Audio("sounds/shuffle.mp3");
const flipSound = new Audio("sounds/flip.mp3");

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
async function getFinalReading(results){
  fetch("http://localhost:3000/api/tarot", {
    
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

  const data = await res.json();
  return data.message;
}

// ===== 占い =====
let isDrawing = false;

function drawThree(){
  if(isDrawing) return;
  isDrawing = true;

  resultEl.innerHTML = "🔮 シャッフル中...";

  shuffleSound.currentTime = 0;
  shuffleSound.play();

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
          <div class="card-inner">
            <div class="card-back">🔮</div>
            <div class="card-front">
              <h3>${positions[index]}</h3>
              <img src="${card.img}" class="${isReversed ? "reversed" : ""}">
              <p class="name">${card.name}</p>
              <p class="pos">${isReversed ? "🔻逆位置" : "🔺正位置"}</p>
              <p class="text">${text}</p>
            </div>
          </div>
        `;

        resultEl.appendChild(cardEl);

        setTimeout(()=>{
          cardEl.classList.add("flip");
          flipSound.currentTime = 0;
          flipSound.play();
        }, 400);

        cardEl.addEventListener("click", ()=>{
          openModal(card, isReversed);
        });

      }, index * 800);
    });

    // ===== 総合リーディング =====
    setTimeout(async ()=>{

      const summaryDiv = document.createElement("div");
      summaryDiv.className = "summary";

      summaryDiv.innerHTML = `<h2>🔮 総合リーディング</h2>`;

      results.forEach((r, index)=>{
        summaryDiv.innerHTML += `
          <div class="summary-card">
            <h3>${r.card.name}（${positions[index]}）</h3>
            <p>${r.isReversed ? "見直しのタイミングです" : "良い流れにあります"}</p>
          </div>
        `;
      });

      // AI前
      summaryDiv.innerHTML += `<p>✨ AIが読み解いています...</p>`;
      resultEl.appendChild(summaryDiv);

      try{
        const aiMessage = await getFinalReading(results);

        summaryDiv.innerHTML += `
          <div class="final-ai">
            <h3>✨ 最終リーディング</h3>
            <p>${aiMessage}</p>
          </div>
        `;
      }catch(e){
        summaryDiv.innerHTML += `<p>⚠️ AI取得エラー</p>`;
      }

      isDrawing = false;

    }, 2500);

  }, 1000);
}

//
console.log("JS読み込みOK");


// ===== カード =====

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

// ===== 音 =====
const shuffleSound = new Audio("sounds/shuffle.mp3");
const flipSound = new Audio("sounds/flip.mp3");

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
async function getFinalReading(results){
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

  const data = await res.json();
  return data.message;
}

// ===== 占い =====
let isDrawing = false;

function drawThree(){
  if(isDrawing) return;
  isDrawing = true;

  resultEl.innerHTML = "🔮 シャッフル中...";

  shuffleSound.currentTime = 0;
  shuffleSound.play();

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
          <div class="card-inner">
            <div class="card-back">🔮</div>
            <div class="card-front">
              <h3>${positions[index]}</h3>
              <img src="${card.img}" class="${isReversed ? "reversed" : ""}">
              <p class="name">${card.name}</p>
              <p class="pos">${isReversed ? "🔻逆位置" : "🔺正位置"}</p>
              <p class="text">${text}</p>
            </div>
          </div>
        `;

        resultEl.appendChild(cardEl);

        setTimeout(()=>{
          cardEl.classList.add("flip");
          flipSound.currentTime = 0;
          flipSound.play();
        }, 400);

        cardEl.addEventListener("click", ()=>{
          openModal(card, isReversed);
        });

      }, index * 800);
    });

    // ===== 総合リーディング =====
    setTimeout(async ()=>{

      const summaryDiv = document.createElement("div");
      summaryDiv.className = "summary";

      summaryDiv.innerHTML = `<h2>🔮 総合リーディング</h2>`;

      results.forEach((r, index)=>{
        summaryDiv.innerHTML += `
          <div class="summary-card">
            <h3>${r.card.name}（${positions[index]}）</h3>
            <p>${r.isReversed ? "見直しのタイミングです" : "良い流れにあります"}</p>
          </div>
        `;
      });

      // AI前
      summaryDiv.innerHTML += `<p>✨ AIが読み解いています...</p>`;
      resultEl.appendChild(summaryDiv);

      try{
        const aiMessage = await getFinalReading(results);

        summaryDiv.innerHTML += `
          <div class="final-ai">
            <h3>✨ 最終リーディング</h3>
            <p>${aiMessage}</p>
          </div>
        `;
      }catch(e){
        summaryDiv.innerHTML += `<p>⚠️ AI取得エラー</p>`;
      }

      isDrawing = false;

    }, 2500);

  }, 1000);
}

//
app.use(express.json());
//
app.post("/api/tarot", (req, res) => {
  res.json({ message: "テストメッセージ" });
});




// ===== モーダル =====
function openModal(card, isReversed){
  modalEl.classList.add("active");
  modalImg.src = card.img;
  modalName.textContent = card.name;
  modalText.textContent = isReversed ? card.rev : card.up;
}

function closeModal(){
  modalEl.classList.remove("active");
}

// ===== イベント =====
drawBtn.addEventListener("click", drawThree);
closeBtn.addEventListener("click", closeModal);

modalEl.addEventListener("click", (e)=>{
  if(e.target === modalEl){
    closeModal();
  }
});

import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

// テストAPI
app.post("/api/tarot", (req, res) => {
  console.log("受信:", req.body);

  res.json({
    message: "🔮 あなたの未来は良い流れにあります。自信を持って進んでください。"
  });
});

// 起動
app.listen(3000, () => {
  console.log("http://localhost:3000 で起動中");
});


// ===== モーダル =====
function openModal(card, isReversed){
  modalEl.classList.add("active");
  modalImg.src = card.img;
  modalName.textContent = card.name;
  modalText.textContent = isReversed ? card.rev : card.up;
}

function closeModal(){
  modalEl.classList.remove("active");
}

// ===== イベント =====
drawBtn.addEventListener("click", drawThree);
closeBtn.addEventListener("click", closeModal);

modalEl.addEventListener("click", (e)=>{
  if(e.target === modalEl){
    closeModal();
  }
});