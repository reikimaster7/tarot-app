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


// ===== 占い =====
let isDrawing = false;

function drawThree(){
  if(isDrawing) return;
  isDrawing = true;

  resultEl.innerHTML = "🔮 シャッフル中...";

  const results = [];

  setTimeout(()=>{

    resultEl.innerHTML = "";

    const draw = shuffle(cards).slice(0,3);
    const positions = ["過去","現在","未来"];

    // 👇 ここが抜けてた！！！！
    draw.forEach((card,index)=>{

      setTimeout(()=>{
        console.log("カード処理", index);

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

        cardEl.addEventListener("click", ()=>{
          openModal(card, isReversed);
        });

      }, index * 800);
    });

    // ===== AI =====
    setTimeout(async ()=>{

      console.log("🔥 AIゾーン来た");

      const summary = document.createElement("div");
      summary.innerHTML = `
        <h2>🔮 総合リーディング</h2>
       <p>✨ AIが読み解いています<span class="dots">...</span></p>
      `;
      resultEl.appendChild(summary);

      try{
        const aiMessage = await getFinalReading(results);

        summary.innerHTML = `
          <h2>🔮 総合リーディング</h2>
          <p>${aiMessage}</p>
        `;
      }catch(e){
        summary.innerHTML += `<p>⚠️ AI取得エラー</p>`;
        console.log(e);
      }

      isDrawing = false;

    }, 3000); // ← 少し長く

  }, 1000);
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
