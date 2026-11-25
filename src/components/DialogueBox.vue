<script setup>
import { computed } from "vue";
import { portraitImages, players, asset } from "../data/game.js";
import { game } from "../store.js";
const props = defineProps({
  item: Object,
  step: Number,
  total: Number,
  hint: String,
  pose: { type: String, default: "normal" },
});
defineEmits(["previous", "next", "finish"]);
const isPlayer = computed(
  () => props.item.role === "player" || props.item.speaker === "MoMo醬",
);
const isNarrator = computed(() => props.item.role === "narrator");
const showHelper = computed(() => isPlayer.value || isNarrator.value);
const isTaoxi = computed(() => props.item.speaker === "桃喜");
const isJiabo = computed(() => !showHelper.value && !isTaoxi.value);
const speakerName = computed(() =>
  props.item.speaker === "MoMo醬" ? "小幫手" : props.item.speaker,
);
const portrait = computed(() => {
  if (showHelper.value) {
    const p = players[game.player] || players.girl;
    return props.pose === "puzzle" ? p.puzzleImage : p.dialogueImage;
  }
  return portraitImages[props.item.speaker] || portraitImages["小嘉博"];
});
</script>
<template>
  <div class="dialogueStage">
    <div class="portraitWrap">
      <img
        :src="asset(portrait)"
        :alt="(showHelper ? '小幫手' : speakerName) + '立繪'"
        class="portraitSprite"
        :class="{
          playerPortrait: showHelper,
          taoxiPortrait: isTaoxi,
          jiaboPortrait: isJiabo,
        }"
      />
    </div>
    <div class="dialogueBox">
      <div class="dialogueHeader">
        <div
          class="speakerTag"
          :class="{ player: isPlayer, narrator: isNarrator }"
        >
          {{ speakerName }}
        </div>
        <div class="dialogueStep">{{ step + 1 }} / {{ total }}</div>
      </div>
      <div class="dialogueText">{{ item.text }}</div>
      <div class="dialogueFooter">
        <div v-if="hint" class="dialogueHint">{{ hint }}</div>
        <div class="dialogueControls">
          <button
            type="button"
            class="secondary"
            :disabled="step === 0"
            @click="$emit('previous')"
          >
            上一句</button
          ><button
            v-if="step < total - 1"
            type="button"
            class="primary"
            @click="$emit('next')"
          >
            下一句</button
          ><button
            v-else
            type="button"
            class="primary"
            @click="$emit('finish')"
          >
            <slot>開始追蹤桃喜</slot>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
