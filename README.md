# 桃喜的百味手帳

Vue 3 + Vite + Vue Router 的手機實境遊戲。以案主 0930 版本的內容為基礎，結合新版美術視覺、各頁底紋、角色陰影立繪、字型字級設定、老屋立體拼圖與集點兌換紀錄功能。

## 最新更新內容

### 版面視覺與背景底圖
- **開始畫面（`Home.vue`）**：主視覺更新為 `主視覺 V4.png`（`public/assets/img/home-visual-v4.jpg`）並疊加獨立透明標題圖 `遊戲標題.png`（`public/assets/img/game-title.png`），固定位於距手機畫面底部 `25%` 處，右上角提供設定按鈕。
- **角色選擇頁（`CharacterSelect.vue`）**：成為桃城小幫手頁面隱藏底部選單，維持專注的開場體驗。
- **任務地圖頁（`Map.vue`）**：5 區地圖改採 `地圖貼紙 底圖.png`（`map-sticker-bg.jpg`）搭配 5 張獨立展區貼紙（城中日常、生活家屋、嘉義滋味、百工巷、老店街）等比例排佈，保留完成勾選徽章與下方清單。
- **角色對話版面（`Dialogue.vue`、`DialogueBox.vue`）**：
  - 底圖為米白底色搭配連續重複排列之 `一般關卡通用底圖圖案.png`（`bg-general.png`）。
  - 採用 6 張含白邊與陰影之角色立繪（小嘉博、桃喜、男／女小幫手一般與解謎差分，含更新後的 `小幫手男-解謎-陰影.png`）；旁白段落亦同步顯示玩家所選小幫手角色圖。
  - 對話文字框設為 90% 不透明度，精簡長句內容避免出現滾動條，且「上一句」、「下一句」按鈕位置固定於底部不隨字數浮動；移除教學頁的「點擊『下一句』，了解如何使用桃喜追蹤器。」提示句。
- **關卡頁面（`Clue.vue`、`Question.vue`、`Scan.vue`、`Stamp.vue`）**：
  - 底圖為米白底色 + 連續重複排列之 `一般關卡通用底圖圖案.png` + 連續重複排列之 `紋理01.png`（`bg-texture-01.png`），各文字框與線索卡片套用 90% 不透明度。
  - 統一各關「🔎 線索」與題目內文排版格式（`.stageDesc` + `.clueCallout`），並移除各區第 1 小關線索下方的展場照片。
- **手帳總覽與文章頁（`Stories.vue`、`StoryDetail.vue`）**：
  - 手帳總覽頁使用底色 + `一般關卡通用底圖圖案.png`。
  - 「百味手帳」文章頁使用底色 + `桃喜日記內底圖圖案.png`（`bg-diary-taoxi.png`）；「小嘉博豆知識」文章頁使用底色 + `嘉博日記內底圖圖案.png`（`bg-diary-jiabo.png`）；文章閱讀框設為 90% 不透明度。
- **集點與獎勵兌換頁（`Points.vue`、`Reward.vue`）**：
  - 底圖為米白底色 + 連續重複排列之 `集點頁底圖.png`（`bg-points.png`），卡片套用 90% 不透明度。
  - 移除「重置 Demo 進度」按鈕；於「恭喜完成集點！」頁面新增「進行兌換（由工作人員操作）」按鈕，點擊後跳出桃粉色二次確認視窗提醒一旦兌換即無法復原。
  - 兌換紀錄獨立儲存於 `localStorage`（`taocityRedeemedV1`），即使透過設定重新開始遊戲，兌換紀錄仍會保留，集點頁狀態徽章將持續顯示「已經兌換」與兌換時間。

### 排版比例與文字設定功能
- 全站標題、副標、內文、線索框與按鈕改以 CSS 變數（`--app-font`、`--text-scale`）統一控制比例，移除各頁寫死字級。
- 於各頁頂部欄右側與首頁右上角加入設定（⚙）按鈕，開啟與遊戲標題同色系（桃粉色系）之設定視窗（`SettingsModal.vue`），支援：
  - **重新開始遊戲**（重置集章進度與角色選擇，保留已兌換紀錄）
  - **設定文字字體**：黑體（預設）、明體、楷體、圓體
  - **設定文字大小**：小（15px）、中（18px，預設）、大（21px）、特大（24px）
  - 即時預覽、確認儲存（`taocitySettingsV1`）與重置為預設

### 關卡內容與測試快捷鍵
- **生活家屋（第 2 小關）**：陸軍／空軍眷村答案更新為「復興新村」與「建國二村」。
- **老店街（第 2、3 小關）**：
  - 更換為新版手繪木構老屋架構（`old-house-frame.png`，含去背開孔呈現前後立體景深）與新版屋頂（`old-house-roof.png`）、左側牆（`old-house-left.png`，對應左後側面）、右側牆（`old-house-right.png`），移除正面牆零件。
  - 移除「測試：模擬搖動」、「測試：自動完成拼圖」與 AR 掃描頁的「測試：略過掃描」按鈕，AR 掃描頁僅保留原本純白「啟動相機辨識」按鈕。
  - 搖動顯影達 100% 後不自動跳轉，待手動點擊「繼續」才進入下一頁。
  - **開發／驗收用鍵盤快捷鍵 `S`**（無畫面按鈕，非輸入框且設定視窗關閉時有效）：
    - 於 AR 掃描頁（`Scan.vue`）按 `S` 鍵可直接略過掃描。
    - 於老店街第 2 小關搖動顯影頁（`Question.vue`）按 `S` 鍵可立即顯現進度至 100%（停留於該頁待點擊「繼續」）。

### 檔案整理（`OLD/`）
- 新增根目錄 `OLD/` 資料夾，將已汰換或 Vue 畫面不再載入的舊圖檔整理移入：
  - `OLD/public-img/`：舊首頁圖（`home-visual.webp`）、舊版無陰影立繪（`img2.png`、`img3.png`）、未使用的舊展場照／圖示（`img1.png`、`img6.png`、`img7.jpg`～`img15.jpg`）、舊老屋架構與正面牆（`old-house-frame.svg`、`old-house-front.png`）以及與 `public/assets/targets/` 重複之參考圖副本。
  - `OLD/assets-img/`：舊版主視覺原檔（`主視覺v1.png`、`主視覺v2.png`、`主視覺-無標準字.png`）及對應已汰換原圖。

## 協作夥伴待辦：第 3 小關 AR 掃描圖

以下兩關的實際 AR 辨識目標尚待協作夥伴更新。本次提交保留參考原圖，不修改 MindAR 辨識資料或掃描流程；這些參考圖目前尚未編入 `targets.mind`：

- **嘉義滋味｜第 3 小關（豆漿豆花）**：原圖 `assets/img/嘉義滋味第3小關AR掃描.jpg`，參考副本 `public/assets/targets/food-douhua-level3.jpg`。
- **百工巷｜第 3 小關（管樂小雞刺繡）**：原圖 `assets/img/百工巷第3小關AR掃描.jpg`，參考副本 `public/assets/targets/craft-wind-chicken-level3.jpg`。

請協作夥伴將兩張參考圖加入為第 3 小關的辨識目標（不要覆蓋五張展區桃喜目標），設定各關只接受正確目標，重新編譯 `public/assets/targets/targets.mind`，並同步維護個別目標檔、`public/assets/targets/manifest.json` 和 `src/services/scan-targets.js`。完成後請驗證這兩關及原有五區尋找桃喜的掃描流程。

## 開發與驗證

Node.js 22.12 以上：

```sh
npm ci
npm run dev
npm test
npm run test:e2e
npm run build
```

`npm run preview` 用於檢查 `dist` 成品。瀏覽器測試在 macOS 預設使用 Google Chrome；Windows 或其他環境設定 `CHROME_PATH`（例如 `C:\Program Files\Google\Chrome\Application\chrome.exe`），或調整 Playwright 的 browser 設定。E2E 以受控辨識引擎與相機串流測試生命週期、路由、字體設定、對話框不溢位、老屋 3 零件拼圖與兌換紀錄保留；正式驗收仍須用實際圖片與手機相機測試 MindAR。

## 內容維護

- `src/data/zones.json`：各區線索、題目、答案、老屋 3 零件座標與解鎖故事。
- `src/data/cutsceneScripts.json`：五區關卡過場對話，依「已完成步驟」編號（`0` 為掃描到桃喜後、`1` 為第 1 題答對後）；路由為 `/zone/:zone/scene/:step?`，`nextPath()`（`src/progress.js`）決定下一步。
- `src/data/tutorialScript.json`：開場故事後的「遊戲教學｜桃喜追蹤器」，結束後進入地圖。
- `src/data/dialogueScript.json`：開場故事「開頭｜桃喜大混亂」（旁白與小幫手段落皆顯示玩家所選小幫手陰影立繪）。
- `src/data/game.js`：可選角色 `players`（角色選擇圖 `player-*.png`、一般對話圖 `char-*-shadow.png`、解謎過場圖 `char-*-puzzle-shadow.png`）與 5 區地圖貼紙 `mapStickers`（`sticker-*.png`）。
- `src/data/preludeScripts.json`：各區前導對話。
- `src/data/extraStories.json`：一開始即可閱讀的小嘉博豆知識。
- `src/data/portraitImages.json`：NPC 陰影立繪對應（`char-jiabo-shadow.png`、`char-taoxi-shadow.png`）。
- `src/store.js`：遊戲進度（`taocityDemoStateV2`）、角色選擇（`taocityPlayerV1`）、字體與字級設定（`taocitySettingsV1`）與永久兌換紀錄（`taocityRedeemedV1`）。
- `src/views/`、`src/components/`：各頁面與共用元件（含 `SettingsModal.vue`）。
- `public/assets/img/`：前端實際載入之最佳化圖片；`assets/img/` 保留美術原檔與 AR 參考原圖；`OLD/` 封存已汰換或未使用之舊素材。
- `legacy/demo.html`：案主原始版本，供內容比對。

**後續內容修改以 `src/data/` 和 Vue 元件為準**，不要只編輯舊 HTML。

## 路由與進度

使用 History 路由。網址帶有展區、題號、故事 ID 和對話句數；網址本身不會授予印章或解鎖獎勵。進度保存在同網域的 `localStorage`：

- `taocityDemoStateV2`：五區集章完成狀態（`done`）與關卡進度（`journey`）。
- `taocityPlayerV1`：玩家所選角色（`boy` / `girl`）。
- `taocitySettingsV1`：使用者偏好字型與文字大小。
- `taocityRedeemedV1`：服務台工作人員確認後寫入的獎勵兌換紀錄與時間（重新開始遊戲不會清除）。

不同部署網域、不同預覽網址與不同裝置不共享資料；目前為純前端本機紀錄，未串接後端帳號系統。

## MindAR

`src/services/scanner.js` 使用 MindAR 1.2.5，從固定版本 CDN 載入；需要網路、WebGL，以及 HTTPS 或 localhost。首頁空閒時預載模組、辨識檔並用空白畫布預熱，不呼叫相機。按下掃描後開啟後鏡頭；連續兩次比對成功發出一次 `scanSuccess`。

所有掃描目前只接受五張新版桃喜圖片：嘉義滋味、城中日常、生活家屋、老店街、百工巷。`public/assets/targets/targets.mind` 包含五張已編譯目標，獨立 `.mind` 與 PNG 依 `taoxi-展區代號` 命名。舊六目標與素材保留於 `public/assets/targets/archive/six-targets/`，不再載入辨識。

合併檔的索引依序為 0：嘉義滋味（food）、1：城中日常（daily）、2：生活家屋（home）、3：老店街（store）、4：百工巷（craft）。`src/services/scan-targets.js` 與 `public/assets/targets/manifest.json` 記錄此順序。

## Cloudflare Pages

主要開發與部署 repo 為 **tnstiger/chiayigame.github.io**，正式網站為 https://chiayigame.pages.dev 。案主原 repo 保留為 upstream；後續修改請推送至主要 repo。

| 欄位                   | 值                               |
| ---------------------- | -------------------------------- |
| Production branch      | `main`                           |
| Build command          | `npm run build`                  |
| Build output directory | `dist`                           |
| Node.js                | 22.12 以上，建議 22 的最新修補版 |

`public/_redirects` 明確將 Vue 頁面路由代理至網站入口 `/`（HTTP 200，保留網址與 query），`/assets/*` 維持靜態資產。

上線檢查：深層網址直接開啟與重新整理、五區通關、字體與字級設定、老屋 3 零件拼圖、獎勵兌換與重啟保留紀錄、相機權限與關閉串流、iPhone Safari 與 Android Chrome 實機辨識。
