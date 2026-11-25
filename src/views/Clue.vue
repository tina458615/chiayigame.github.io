<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { zones, asset } from "../data/game.js";
import { game } from "../store.js";
import TopBar from "../components/TopBar.vue";
const route = useRoute(),
  router = useRouter(),
  id = route.params.zone,
  zone = zones[id];
const playing = ref(false);
let melody;

const clueParts = computed(() => {
  if (!zone.mission) {
    return {
      paragraphs: [`「${zone.clue}」`],
      callout: zone.hint,
    };
  }
  if (zone.mission.tip) {
    return {
      paragraphs: zone.mission.text,
      callout: zone.mission.tip,
    };
  }
  if (zone.mission.audio) {
    return {
      paragraphs: zone.mission.text.slice(0, -1),
      callout: zone.mission.text[zone.mission.text.length - 1],
    };
  }
  if (zone.mission.text.length >= 3) {
    return {
      paragraphs: [zone.mission.text[0], zone.mission.text[2]],
      callout: zone.mission.text[1],
    };
  }
  return {
    paragraphs: zone.mission.text,
    callout: "",
  };
});

function scan() {
  const path = `/zone/${id}/scan/taoxi`;
  game.pendingCameraStart = path;
  router.push(path);
}
async function toggleMelody() {
  if (!melody) {
    melody = new Audio(asset(zone.mission.audio));
    melody.addEventListener("ended", () => (playing.value = false));
  }
  if (playing.value) {
    melody.pause();
    playing.value = false;
    return;
  }
  try {
    await melody.play();
    playing.value = true;
  } catch {
    playing.value = false;
  }
}
onBeforeUnmount(() => melody?.pause());
</script>
<template>
  <section class="screen active screen-stage">
    <TopBar title="第 1 小關：尋找桃喜" />
    <div class="clueBox">
      <div class="scanBadge">🗺️ 地圖線索</div>
      <h2 class="clueTitle">
        {{ zone.mission ? zone.mission.title : `${zone.name}｜桃喜躲在哪裡？` }}
      </h2>
      <div class="stageDesc">
        <p v-for="line in clueParts.paragraphs" :key="line" class="preLine">
          {{ line }}
        </p>
      </div>
      <div v-if="clueParts.callout" class="clueCallout">
        <div class="clueCalloutTitle">🔎 線索</div>
        <div class="clueCalloutBody preLine">{{ clueParts.callout }}</div>
      </div>
      <button
        v-if="zone.mission?.audio"
        class="secondary melodyBtn"
        @click="toggleMelody"
      >
        {{ playing ? "⏸ 暫停旋律" : "▶ 播放旋律" }}
      </button>
      <button class="primary" style="margin-top: 6px" @click="scan">
        開始尋找桃喜</button
      ><RouterLink class="secondary" style="margin-top: 10px" to="/map"
        >換一區探索</RouterLink
      >
    </div>
  </section>
</template>
