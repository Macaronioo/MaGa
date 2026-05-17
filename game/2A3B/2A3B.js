let bestRecord = parseInt(localStorage.getItem("best2A3B")) || null;

let winCount =
parseInt(
localStorage.getItem("win2A3B")
|| 0
);

let answer;
let input = [];
let tries = 0;

function initGame(){
    answer = generate();
    console.log("答案:", answer); // <- 放這裡
    input = [];
    tries = 0;

    document.getElementById("result").innerText = "";
    document.getElementById("log").innerHTML = "";

    render();
    updateInfo();
}

function generate(){
    let arr=[];
    while(arr.length<4){
        let n=Math.floor(Math.random()*10).toString();
        if(!arr.includes(n)) arr.push(n);
    }
    return arr;
}

function press(num){
    if(input.length>=4) return;
    if(input.includes(num)) return alert("不能重複");

    input.push(num);
    render();
}

function clearInput(){
    input=[];
    render();
}

function render(){
    for(let i=0;i<4;i++){
        let el = document.getElementById("b"+i);
        if(el) el.innerText = input[i] || "";
    }
}

function initGame(){

    answer = generate();

    input = [];

    tries = 0;

    document.getElementById("result")
    .innerText = "";

    document.getElementById("log")
    .innerHTML = "";

    render();

    updateInfo();
}

function updateInfo(){

    document.getElementById(
    "bestRecord"
    ).innerText =
    bestRecord
    ? bestRecord + " 次"
    : "--";

    document.getElementById(
    "winCount"
    ).innerText =
    winCount;
}

function checkGuess(){

    if(input.length<4){
        alert("請輸入4個數字");
        return;
    }

    tries++;

    let A=0,B=0;

    for(let i=0;i<4;i++){
        if(input[i]===answer[i]) A++;
        else if(answer.includes(input[i])) B++;
    }

    document.getElementById("result").innerText=`${A}A${B}B`;

    let log=document.getElementById("log");

    let card=document.createElement("div");
    card.className="card";
    card.innerText=`第${tries}次：${input.join("")} → ${A}A${B}B`;

    log.appendChild(card);

    if(A===4){

        document.getElementById(
        "result"
        ).innerText =
        "🎉 通關！";

        winCount++;

        localStorage.setItem(
        "win2A3B",
        winCount
        );

        if(
            !bestRecord ||
            tries < bestRecord
        ){

            bestRecord = tries;

            localStorage.setItem(
            "best2A3B",
            bestRecord
            );
        }

        updateInfo();
    }

    input=[];
    render();
}

initGame();
