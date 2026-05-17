
/* =========================
   🧠 基本資料
========================= */

const grid = document.getElementById("grid");
const timerEl = document.getElementById("timer");

let numbers = [];
let current = 1;

let startTime = 0;
let timerInterval = null;

let bestTime = localStorage.getItem("bestTweFi")
    ? parseFloat(localStorage.getItem("bestTweFi"))
    : null;

/* =========================
   🔀 洗牌
========================= */

function shuffle(arr){

    for(let i=arr.length-1;i>0;i--){

        const j = Math.floor(Math.random()*(i+1));

        [arr[i],arr[j]] = [arr[j],arr[i]];

    }

}

/* =========================
   🎮 開始遊戲
========================= */

function startGame(){

    grid.innerHTML = "";

    current = 1;

    numbers = [];

    clearInterval(timerInterval);

    timerEl.innerText = "0.00 秒";

    generate();

    render();

    updateBestUI();

    startTime = Date.now();

    timerInterval = setInterval(updateTimer, 50);

}

/* =========================
   🔢 生成 1~25
========================= */

function generate(){

    numbers = Array.from({length:25}, (_,i)=>i+1);

    shuffle(numbers);

}

/* =========================
   🎨 渲染
========================= */

function render(){

    grid.innerHTML = "";

    numbers.forEach(num=>{

        const div = document.createElement("div");

        div.className = "cell";

        div.innerText = num;

        div.onclick = ()=>click(num, div);

        grid.appendChild(div);

    });

}

/* =========================
   👆 點擊
========================= */

function click(num, div){

    if(num === current){

        div.classList.add("done");

        current++;

        if(current > 25){

            endGame();

        }

    }else{

        div.classList.add("wrong");

        setTimeout(()=>{

            div.classList.remove("wrong");

        },200);

    }

}

/* =========================
   ⏱ 計時
========================= */

function updateTimer(){

    const t = (Date.now() - startTime)/1000;

    timerEl.innerText = t.toFixed(2) + " 秒";

}

/* =========================
   🏁 結束
========================= */

function endGame(){

    clearInterval(timerInterval);

    const finalTime =
        (Date.now() - startTime) / 1000;

    const timeStr = finalTime.toFixed(2);

    // 🎉 顯示完成訊息
    timerEl.innerText =
        "🎉 恭喜完成！ " + timeStr + " 秒";

    // 🏆 更新最佳紀錄（正確邏輯）
    if(!bestTime || finalTime < bestTime){

        bestTime = finalTime.toFixed(2);

        localStorage.setItem(
        "bestTweFi",
        bestTime
        );

        updateBestUI();

    }

    // 🔒 防止繼續點
    current = 999;

    // 💡 可選：提示區
    document.getElementById("best").innerText =
        "🎉 已完成！";

}

function updateBestUI(){

    if(bestTime){

        document.getElementById("best").innerText =
            "🏆 最佳紀錄：" + bestTime + " 秒";

    }else{

        document.getElementById("best").innerText =
            "🏆 最佳紀錄：-- 秒";

    }

}

startGame();
