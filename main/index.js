/* =========================
   📂 分類展開
========================= */

function toggleMenu(menuId){

    const menu =
    document.getElementById(menuId);

    menu.classList.toggle("show");

}

/* =========================
   ☰ 側邊選單
========================= */

const sideMenu =
document.getElementById("sideMenu");

const menuOverlay =
document.getElementById("menuOverlay");

/* 開啟 */
function openSideMenu(){

    sideMenu.classList.add("show");
    menuOverlay.classList.add("show");

}

/* 關閉 */
function closeMenu(){

    sideMenu.classList.remove("show");
    menuOverlay.classList.remove("show");

}

/* 左上按鈕 */
function toggleSideMenu(){

    if(sideMenu.classList.contains("show")){

        closeMenu();

    }else{

        openSideMenu();

    }

}

/* =========================
   📊 本地紀錄
========================= */

function showLocalData(){

    let text = "";

    /* 2048 */
    const best2048 =
    localStorage.getItem("best2048");

    if(best2048){

        text +=
        `2048 最高分：${best2048}\n`;

    }

    /* 2A3B */
    const best2A3B =
    localStorage.getItem("best2A3B");

    const win2A3B =
    localStorage.getItem("win2A3B");

    if(best2A3B || win2A3B){

        text +=
        `2A3B 最佳：${best2A3B || "--"} 次\n`;

        text +=
        `2A3B 通關：${win2A3B || 0} 次\n`;

    }

    /* 1-25 */
    const bestTime =
    localStorage.getItem("bestTime");

    if(bestTime){

        text +=
        `1-25 最快：${bestTime} 秒\n`;

    }

    /* OOXX */
    const ttt =
    JSON.parse(
        localStorage.getItem("tttScore")
    );

    if(ttt){

        text +=
        `OOXX\n`;

        text +=
        `你：${ttt.player}\n`;

        text +=
        `電腦：${ttt.ai}\n`;

        text +=
        `平手：${ttt.draw}\n`;

    }

    /* 沒資料 */
    if(text === ""){

        text = "目前沒有紀錄";

    }

    alert(text);

}

/* =========================
   🗑 清除全部紀錄
========================= */

function clearAllData(){

    const ok =
    confirm("確定清除所有本地紀錄？");

    if(!ok) return;

    localStorage.clear();

    alert("已清除");

}
