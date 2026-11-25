<script setup>
import { computed } from "vue";
import { zones, order } from "../data/game.js";
import { game, doneCount } from "../store.js";
import TopBar from "../components/TopBar.vue";

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
</script>
<template>
  <section class="screen active screen-points">
    <TopBar to="/map" label="← 回地圖" title="集點護照" />
    <div class="card pointSummary">
      <div class="questBadge">STAMPS</div>
      <h2 class="title">桃城百味集點頁</h2>
      <p class="subtitle">
        {{
          doneCount === 5
            ? "恭喜完成桃城百味集點任務！"
            : "完成展區任務即可獲得一枚特色印章。"
        }}
      </p>
      <div class="pointCount">{{ doneCount }} / 5 章</div>
      <div class="pointTrack">
        <span :style="{ width: (doneCount / 5) * 100 + '%' }"></span>
      </div>
      <div class="tiny">
        {{
          game.redeemed
            ? "已完成獎勵兌換，感謝參與桃城百味！"
            : doneCount === 5
              ? "五章集滿！獎勵兌換資格已解鎖。"
              : `再完成 ${5 - doneCount} 個展區，就能集滿五章。`
        }}
      </div>
      <div class="stampGrid">
        <div
          v-for="id in order"
          :key="id"
          class="stampItem"
          :class="{ done: game.done[id] }"
        >
          <div class="stampCircle">
            <img
              :src="`/${zones[id].mapIcon}`"
              :alt="`${zones[id].name}集章圖案`"
            />
            <span v-if="game.done[id]" aria-label="已完成">✓</span>
          </div>
          <b>{{ zones[id].name }}</b>
        </div>
      </div>
      <div class="rewardBox">
        <h3>集滿五章可兌換</h3>
        <p>
          完成五個展區任務後，可憑集點頁至服務台兌換紀念小禮。此頁為 Demo
          的獎勵兌換參考。
        </p>
        <span class="rewardStatus" :class="{ redeemed: game.redeemed }">{{
          game.redeemed
            ? "已經兌換"
            : doneCount === 5
              ? "已解鎖兌換資格"
              : "尚未集滿"
        }}</span>
        <div v-if="game.redeemed && redeemedTimeText" class="tiny redeemedTime">
          兌換時間：{{ redeemedTimeText }}
        </div>
      </div>
      <RouterLink v-if="doneCount === 5" class="primary" to="/reward"
        >查看完成回饋</RouterLink
      >
    </div>
  </section>
</template>
