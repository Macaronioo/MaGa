記憶翻牌 俄羅斯方塊 打地鼠 踩地雷 貪食蛇 1010 方塊消除 Blackjack Solitaire 21點 Water Sort 拆螺絲Screw Jam 冰箱收納 行李箱整理 貨櫃分類
網站風格：
簡潔遊戲平台風格
柔和自然色系
統一圓角UI

主色（品牌色）：
#0B5351

背景色：
#DAEEE1

按鈕顏色：
#1E7A78

按鈕Hover：
#25908D

字體：
Arial

按鈕：
圓角12px
所有主畫面按鈕大小一致

主畫面：
遊戲列表置中排列

遊戲畫面：
左上角固定「返回主選單」按鈕

共用檔案：
css/style.css
js/common.js

所有遊戲頁面：
必須引用：
<link rel="stylesheet" href="css/style.css">


*複製模板
index.html

    <!-- 返回按鈕 -->
    <button class="backButton"
        onclick="location.href='index.html'">
        返回主畫面
    </button>

    <!-- 遊戲區 -->
    <div id="gameArea"></div>

    <!-- 共用JS -->
    <script src="js/common.js"></script>

    <!-- 遊戲JS -->
    <script src="js/game.js"></script>

</body>
</html>
