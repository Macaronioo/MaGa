<script>

alert("2048 JS 有載入");
    
document.addEventListener(
    "gesturestart",
    e => e.preventDefault(),
    { passive:false }
);

let board;
let score = 0;
let best = localStorage.getItem("best2048") || 0;

const boardEl = document.getElementById("board");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overMask = document.getElementById("overMask");

bestEl.innerText = best;

function init(){
    console.log("init 有進來");

    board = Array(4).fill().map(()=>Array(4).fill(0));
    score = 0;

    add();
    add();

    render();
}

/* =========================
   新增方塊
========================= */

function add(){
    console.log("add 有進來");
    let empty = [];

    for(let r=0;r<4;r++){
        for(let c=0;c<4;c++){
            if(board[r][c] === 0) empty.push({r,c});
        }
    }

    if(empty.length === 0) return;

    let {r,c} = empty[Math.floor(Math.random()*empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
}

/* =========================
   畫面
========================= */

function render(){
    console.log("render 有進來");

    boardEl.innerHTML = "";

    for(let r=0;r<4;r++){
        for(let c=0;c<4;c++){

            let div = document.createElement("div");
            div.className = "g2048Cell";

            let v = board[r][c];

            if(v !== 0){
               div.innerText = v;
               div.dataset.v = v;

               div.style.lineHeight = "1";

            }
         

            boardEl.appendChild(div);
        }
    }

    scoreEl.innerText = score;

    if(score > best){
        best = score;
        localStorage.setItem("best2048", best);
        bestEl.innerText = best;
    }
}

/* =========================
   合併邏輯
========================= */

function slide(row){

    row = row.filter(v=>v!==0);

    for(let i=0;i<row.length-1;i++){
        if(row[i] === row[i+1]){
            row[i] *= 2;
            score += row[i];
            row[i+1] = 0;
        }
    }

    row = row.filter(v=>v!==0);

    while(row.length < 4){
        row.push(0);
    }

    return row;
}

function moveLeft(){
    for(let r=0;r<4;r++){
        board[r] = slide(board[r]);
    }
}

function moveRight(){
    for(let r=0;r<4;r++){
        board[r] = slide([...board[r]].reverse()).reverse();
    }
}

function moveUp(){
    for(let c=0;c<4;c++){
        let col = [];
        for(let r=0;r<4;r++) col.push(board[r][c]);

        col = slide(col);

        for(let r=0;r<4;r++) board[r][c] = col[r];
    }
}

function moveDown(){
    for(let c=0;c<4;c++){
        let col = [];

        for(let r=0;r<4;r++){
            col.push(board[r][c]);
        }

        col = slide([...col].reverse()).reverse();

        for(let r=0;r<4;r++){
            board[r][c] = col[r];
        }
    }
}

/* =========================
   判斷 Game Over
========================= */

function isGameOver(){

    for(let r=0;r<4;r++){
        for(let c=0;c<4;c++){
            if(board[r][c] === 0) return false;
        }
    }

    for(let r=0;r<4;r++){
        for(let c=0;c<3;c++){
            if(board[r][c] === board[r][c+1]) return false;
        }
    }

    for(let c=0;c<4;c++){
        for(let r=0;r<3;r++){
            if(board[r][c] === board[r+1][c]) return false;
        }
    }

    return true;
}

/* =========================
   鍵盤
========================= */

document.addEventListener("keydown", e=>{

    let before = JSON.stringify(board);

    if(e.key==="ArrowLeft") moveLeft();
    if(e.key==="ArrowRight") moveRight();
    if(e.key==="ArrowUp") moveUp();
    if(e.key==="ArrowDown") moveDown();

    if(JSON.stringify(board) !== before){
        add();
        render();
    }

    if(isGameOver()){
        overMask.style.display="flex";
    }
});

/* =========================
   手機滑動
========================= */

let startX, startY;

boardEl.addEventListener("touchstart", e=>{

    e.preventDefault();

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

}, { passive:false });

boardEl.addEventListener("touchmove", e=>{

    e.preventDefault();

}, { passive:false });

boardEl.addEventListener("touchend", e=>{

    e.preventDefault();

    let dx = e.changedTouches[0].clientX - startX;
    let dy = e.changedTouches[0].clientY - startY;

    let before = JSON.stringify(board);

    const threshold = 30;
    if(Math.abs(dx) > Math.abs(dy)){

        if(Math.abs(dx) < threshold) return;

        if(dx > 0) moveRight();
        else moveLeft();

    }else{

        if(Math.abs(dy) < threshold) return;

        if(dy > 0) moveDown();
        else moveUp();
    }

    if(JSON.stringify(board) !== before){
        add();
        render();
    }

    if(isGameOver()){
        overMask.style.display="flex";
    }

}, { passive:false });

/* =========================
   控制
========================= */

function closeOver(){

    overMask.style.display = "none";

    init();
}

init();

</script>
