<script>
    let tttBoard = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;
    let playerLock = false;

    let score = {
        player: 0,
        ai: 0,
        draw: 0
    };
    const WIN_PATTERNS = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // 讀取紀錄
    if (localStorage.getItem("tttScore")) {
        score = JSON.parse(localStorage.getItem("tttScore"));
    }

    const tttBoardDiv = document.getElementById("tttBoard");
    const scoreText = document.getElementById("score");

    function drawtttBoard() {
        tttBoardDiv.innerHTML = "";

        tttBoard.forEach((tttCell, index) => {
            const div = document.createElement("div");
            div.className = "tttCell";
            div.innerText = tttCell;

            div.onclick = () => playerMove(index);

            tttBoardDiv.appendChild(div);
        });

        updateScore();
    }

    function playerMove(index) {
        if (tttBoard[index] !== "" || gameOver || playerLock) return;

        tttBoard[index] = "❌";
        drawtttBoard();

        if (checkWin("❌")) {
            showEndScreen("🎉 你贏了！");
            score.player++;
            saveScore();
            gameOver = true;
            playerLock = false;
            return;
        }

        if (!tttBoard.includes("")) {
            showEndScreen("🤝 平手！");
            score.draw++;
            saveScore();
            gameOver = true;
            playerLock = false;
            return;
        }

        playerLock = true;
        setTimeout(aiMove, 120);
    }

    function aiMove() {
        if (gameOver) return;

        playerLock = true;

        let move = findBestMove();

        tttBoard[move] = "⭕";
        drawtttBoard();

        if (checkWin("⭕")) {
            showEndScreen("😢 你輸了！");
            score.ai++;
            saveScore();
           gameOver = true;
           playerLock = false;
           return;
        }

        if (!tttBoard.includes("")) {
            showEndScreen("🤝 平手！");
            score.draw++;
            saveScore();
            gameOver = true;
            playerLock = false;
            return;
        }
        playerLock = false;
    }

    // 🤖 AI核心（防守 + 進攻）
    function findBestMove() {

        // 1. 先找自己能贏的位置
        let winMove = findWinningMove("⭕");
        if (winMove !== -1) return winMove;

        // 2. 再找阻止玩家的位置
        let blockMove = findWinningMove("❌");
        if (blockMove !== -1) return blockMove;

        // 3. 中心優先
        if (tttBoard[4] === "") return 4;

        // 4. 隨機
        let empty = tttBoard
            .map((v, i) => v === "" ? i : null)
            .filter(v => v !== null);

        return empty[Math.floor(Math.random() * empty.length)];
    }

    function findWinningMove(player) {

      for (let pattern of WIN_PATTERNS) {

          let values = pattern.map(i => tttBoard[i]);

          let countPlayer = values.filter(v => v === player).length;
          let countEmpty = values.filter(v => v === "").length;

          if (countPlayer === 2 && countEmpty === 1) {
              return pattern.find(i => tttBoard[i] === "");
          }
      }

      return -1;
  }

  function checkWin(player) {

      return WIN_PATTERNS.some(pattern =>
          pattern.every(i => tttBoard[i] === player)
      );
  }

    function saveScore() {
        localStorage.setItem("tttScore", JSON.stringify(score));
        updateScore();
    }

    function updateScore() {
        scoreText.innerHTML =
            `你：${score.player} ｜ 電腦：${score.ai} ｜ 平手：${score.draw}`;
    }

    function showEndScreen(text) {
        document.getElementById("endText").innerText = text;
        document.getElementById("endScreen").classList.remove("hidden");
    }

    function hideEndScreen() {
        document.getElementById("endScreen").classList.add("hidden");
    }

    function resetGame() {
        tttBoard = ["", "", "", "", "", "", "", "", ""];
        gameOver = false;
        playerLock = false;

        hideEndScreen();
        drawtttBoard();
    }

    drawtttBoard();
</script>
