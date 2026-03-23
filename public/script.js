console.log("JS読み込みOK");

// =========================
// ① DOM取得
// =========================
const resultEl = document.getElementById("result");
const drawBtn = document.getElementById("drawBtn");

const modalEl = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeBtn");

// 広告モーダル
const adModal = document.getElementById("adModal");
const watchAdBtn = document.getElementById("watchAdBtn");

// =========================
// ② 状態管理
// =========================
let isDrawing = false;


// =========================
// カードのデータ
// =========================

const cards = [
{
name:"愚者",
img:"images/major_01_fool.png",
up:"新しい始まりの時です。恐れず一歩踏み出すことで運命が動き出します。直感を信じて行動することが成功の鍵となるでしょう。",
rev:"軽率な行動や無計画さがトラブルを招く暗示です。今は慎重に判断することが必要です。"
},
{
name:"魔術師",
img:"images/major_02_magician.png",
up:"あなたにはすべてを実現する力があります。今は行動することでチャンスを掴めるタイミングです。",
rev:"自信のなさや迷いがチャンスを逃しています。本来の力を信じることが重要です。"
},
{
name:"女教皇",
img:"images/major_03_high_priestess.png",
up:"直感が冴えています。焦らず内面の声に耳を傾けることで正しい答えが見つかります。",
rev:"直感が鈍り、迷いや不安に支配されやすい状態です。冷静さを取り戻しましょう。"
},
{
name:"女帝",
img:"images/major_04_empress.png",
up:"豊かさや愛情に恵まれる時期です。人との関係も良好に進んでいくでしょう。",
rev:"依存や甘えが強くなっています。自立する意識が必要です。"
},
{
name:"皇帝",
img:"images/major_05_emperor.png",
up:"安定と成功の象徴です。自信を持ってリーダーシップを発揮することで道が開けます。",
rev:"支配的になりすぎています。柔軟な考え方を持つことが大切です。"
},
{
name:"教皇",
img:"images/major_06_hierophant.png",
up:"正しい道を示す存在です。信頼できる人の助言を受け入れることで良い結果につながります。",
rev:"常識に縛られすぎています。自分の価値観を大切にしましょう。"
},
{
name:"恋人",
img:"images/major_07_lovers.png",
up:"愛と調和を象徴します。大切な選択のタイミングであり、心に従うことが重要です。",
rev:"すれ違いや迷いが生じています。重要な決断は慎重に行うべきです。"
},
{
name:"戦車",
img:"images/major_08_chariot.png",
up:"勢いと勝利のカードです。強い意志を持って進むことで成功を掴めます。",
rev:"焦りや暴走による失敗に注意。冷静な判断が必要です。"
},
{
name:"力",
img:"images/major_09_strength.png",
up:"忍耐と優しさで困難を乗り越えられます。焦らず自分を信じて進みましょう。",
rev:"自信のなさや不安が強くなっています。自分を信じることが大切です。"
},
{
name:"隠者",
img:"images/major_10_hermit.png",
up:"内省の時期です。自分を見つめ直すことで重要な気づきを得られます。",
rev:"孤独になりすぎています。周囲との関係も大切にしましょう。"
},
{
name:"運命の輪",
img:"images/major_11_wheel_of_fortune.png",
up:"大きな転機が訪れます。流れに身を任せることで幸運を掴めるでしょう。",
rev:"タイミングが合わず停滞しています。今は流れを待つことが必要です。"
},
{
name:"正義",
img:"images/major_12_justice.png",
up:"公平な判断が求められます。誠実な行動が良い結果につながります。",
rev:"不公平な判断や偏った考えに注意が必要です。客観的に物事を見ましょう。"
},
{
name:"吊るされた男",
img:"images/major_13_hanged_man.png",
up:"忍耐の時期です。今は無理に動かず待つことで未来が開けます。",
rev:"無駄な我慢や停滞が続いています。視点を変える必要があります。"
},
{
name:"死神",
img:"images/major_14_death.png",
up:"終わりと再生の象徴です。新しいスタートのための変化が訪れています。",
rev:"変化を恐れています。不要なものを手放すことで道が開けます。"
},
{
name:"節制",
img:"images/major_15_temperance.png",
up:"バランスと調和が大切な時です。無理せず自然体でいることで安定します。",
rev:"バランスが崩れています。生活や心の調整が必要です。"
},
{
name:"悪魔",
img:"images/major_16_devil.png",
up:"執着や誘惑に注意が必要です。自分を縛るものに気づくことが大切です。",
rev:"執着や依存から抜け出せない状態です。原因に気づくことが重要です。"
},
{
name:"塔",
img:"images/major_17_tower.png",
up:"突然の変化が起こりますが、それは新しい道へのきっかけでもあります。",
rev:"最悪の事態は回避されますが、注意が必要な状況です。"
},
{
name:"星",
img:"images/major_18_star.png",
up:"希望と癒しのカードです。未来は明るく、願いは叶う方向に進んでいます。",
rev:"希望を失いかけていますが、諦めなければ状況は改善します。"
},
{
name:"月",
img:"images/major_19_moon.png",
up:"不安や迷いがある状態です。慎重に行動し、真実を見極めましょう。",
rev:"不安が晴れ、真実が見えてきます。冷静な判断ができるようになります。"
},
{
name:"太陽",
img:"images/major_20_sun.png",
up:"成功と喜びに満ちた状態です。すべてが良い方向へ進んでいきます。",
rev:"成功は近いですが、結果が出るまでに時間がかかります。"
},
{
name:"審判",
img:"images/major_21_judgement.png",
up:"復活と目覚めの時です。過去を乗り越え、新たなチャンスが訪れます。",
rev:"決断できず過去にとらわれています。前に進む覚悟が必要です。"
},
{
name:"世界",
img:"images/major_22_world.png",
up:"完成と達成を意味します。努力が実を結び、大きな成功を手にします。",
rev:"あと一歩で完成です。最後まで努力を続けることが成功の鍵です。"
}
];


// =========================
// ③ ユーティリティ
// =========================
function shuffle(array){
  const arr = [...array];
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getToday(){
  return new Date().toISOString().split("T")[0];
}

function canUseFree(){
  const lastDate = localStorage.getItem("lastUsedDate");
  return lastDate !== getToday();
}

function saveUsed(){
  localStorage.setItem("lastUsedDate", getToday());
}

// ⭐ これがないとエラーになる
//function showAdOrPay(){
//  adModal.classList.remove("hidden");
//}

function showAdOrPay(){
  console.log("広告モーダル出す");
  adModal.style.display = "flex";
}

// =========================
// ④ API
// =========================
async function getFinalReading(results){
  const res = await fetch("http://localhost:3000/api/tarot", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      cards: results.map((r, i)=>({
        name: r.card.name,
        position: ["過去","現在","未来"][i],
        isReversed: r.isReversed
      }))
    })
  });

  const data = await res.json();
  return data.message;
}

// =========================
// ⑤ メイン処理
// =========================
function drawThree(){

  console.log("ボタン押された");
  console.log("cards:", cards);
console.log("adModal:", adModal);

  // 🔒 連打防止
  if(isDrawing) return;

  console.log("isDrawing",isDrawing);

  // 💡 ここが最重要（最初に判定）
   console.log("pass001");
   console.log("canUseFree:", canUseFree());
  if(!canUseFree()){
    showAdOrPay();
    return;
  }

  console.log("pass002");

  saveUsed();
  isDrawing = true;
 console.log("pass003");
  resultEl.innerHTML = "🔮 シャッフル中...";

  const results = [];

 console.log("pass004");

setTimeout(() => {

  console.log("シャッフル開始");
console.log("pass005");
  resultEl.innerHTML = "";

  const draw = shuffle(cards).slice(0,3);
  const positions = ["過去","現在","未来"];

  draw.forEach((card, index) => {

    setTimeout(() => {

      console.log("カード表示", index);

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




    // AI結果
    setTimeout(async ()=>{

      const summary = document.createElement("div");
      summary.innerHTML = `
        <h2>🔮 総合リーディング</h2>
        <p id="loading">✨ AIが読み解いています...</p>
        <p id="resultText"></p>
      `;
      resultEl.appendChild(summary);

      try{
        const aiMessage = await getFinalReading(results);

        document.getElementById("loading").remove();
        document.getElementById("resultText").innerHTML =
          `<span class="fade-in">${aiMessage}</span>`;

      }catch(e){
        console.log(e);
      }

      isDrawing = false;

    }, 3000);

  }, 1000);
}

// =========================
// ⑥ イベント
// =========================
drawBtn.addEventListener("click", drawThree);

// 広告視聴
watchAdBtn.addEventListener("click", async ()=>{
  watchAdBtn.textContent = "広告再生中...";
  watchAdBtn.disabled = true;

  await new Promise(r => setTimeout(r, 3000));

  // 制限解除
  localStorage.removeItem("lastUsedDate");

  adModal.classList.add("hidden");
});