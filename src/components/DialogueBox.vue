<script setup>
import { portraitImages, asset } from "../data/game.js";
defineProps({ item: Object, step: Number, total: Number, hint: String });
defineEmits(["previous", "next", "finish"]);
</script>
<template>
  <div class="dialogueStage">
    <div class="portraitWrap">
      <div>
        <img
          :src="asset(portraitImages[item.speaker] || portraitImages['小嘉博'])"
          :alt="item.speaker + '立繪'"
        />
        <div class="miniPortraitName">{{ item.speaker }}</div>
      </div>
    </div>
    <div class="dialogueBox">
      <div class="dialogueHeader">
        <div
          class="speakerTag"
          :class="{
            player: item.role === 'player' || item.speaker === 'MoMo醬',
          }"
        >
          {{ item.speaker }}
        </div>
        <div class="dialogueStep">{{ step + 1 }} / {{ total }}</div>
      </div>
      <div class="dialogueText">{{ item.text }}</div>
      <div class="dialogueHint">{{ hint }}</div>
      <div class="dialogueControls">
        <button
          class="secondary"
          :disabled="step === 0"
          @click="$emit('previous')"
        >
          上一句</button
        ><button v-if="step < total - 1" class="primary" @click="$emit('next')">
          下一句</button
        ><button v-else class="primary" @click="$emit('finish')">
          <slot>開始追蹤桃喜</slot>
        </button>
      </div>
    </div>
  </div>
</template>
