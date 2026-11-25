<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { game, redeemReward } from "../store.js";
import TopBar from "../components/TopBar.vue";

const confirmOpen = ref(false);

const redeemedTimeText = computed(() => {
  if (!game.redeemedAt) return "";
  try {
    return new Intl.DateTimeFormat("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(game.redeemedAt));
  } catch {
    return "";
  }
});

function confirmRedeem() {
  redeemReward();
  confirmOpen.value = false;
}

function onKeydown(event) {
  if (event.key === "Escape" && confirmOpen.value) confirmOpen.value = false;
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
<template>
  <section class="screen active screen-points">
    <TopBar to="/points" label="← 回集點頁" title="集點完成" />
    <div class="card pointSummary">
      <div class="bigStamp">五章<br />集滿</div>
      <h2 class="title">恭喜完成集點！</h2>
      <p class="subtitle">你已找回五區的嘉義生活故事，獲得一次獎勵兌換資格。</p>
      <div class="rewardBox">
        <h3>獎勵兌換參考</h3>
        <p>請洽服務台向工作人員進行兌換。</p>
        <p class="tiny">獎勵內容請依現場公告與服務台實際供應內容為準。</p>
        <span class="rewardStatus" :class="{ redeemed: game.redeemed }">{{
          game.redeemed ? "已經兌換" : "兌換資格已解鎖"
        }}</span>
        <div v-if="game.redeemed && redeemedTimeText" class="tiny redeemedTime">
          兌換時間：{{ redeemedTimeText }}
        </div>
      </div>
      <button
        v-if="!game.redeemed"
        type="button"
        class="primary"
        @click="confirmOpen = true"
      >
        進行兌換（由工作人員操作）
      </button>
      <button
        v-else
        type="button"
        class="secondary redeemedBtn"
        style="margin-top: 16px"
        disabled
      >
        已經兌換
      </button>
      <RouterLink
        :class="game.redeemed ? 'primary' : 'secondary'"
        style="margin-top: 10px"
        to="/map"
        >回地圖探索</RouterLink
      >
    </div>

    <Teleport to=".app">
      <div
        v-if="confirmOpen"
        class="settingsBackdrop"
        @click.self="confirmOpen = false"
      >
        <div
          class="settingsDialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="redeem-dialog-title"
        >
          <div class="settingsHeader">
            <h2 id="redeem-dialog-title">確認進行兌換</h2>
            <button
              type="button"
              class="settingsCloseBtn"
              aria-label="關閉視窗"
              @click="confirmOpen = false"
            >
              ✕
            </button>
          </div>
          <div class="settingsBody">
            <p class="settingsIntro">確定要兌換此次集點獎勵嗎？</p>
            <div class="redeemWarning">
              ⚠️ 請由服務台工作人員操作確認。<br />
              一旦完成兌換即無法復原，且即使重新開始遊戲仍會保留已兌換紀錄。
            </div>
            <div class="settingsActions">
              <button
                type="button"
                class="settingsBtnSecondary"
                @click="confirmOpen = false"
              >
                取消
              </button>
              <button
                type="button"
                class="settingsBtnPrimary"
                @click="confirmRedeem"
              >
                確認兌換
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
