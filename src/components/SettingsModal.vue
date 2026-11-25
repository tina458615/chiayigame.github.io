<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import {
  settings,
  fontFamilies,
  fontSizes,
  updateSettings,
  resetSettings,
  closeSettings,
  restartGame,
} from "../store.js";

const router = useRouter();
const draftFont = ref(settings.fontFamily);
const draftSize = ref(settings.fontSize);

watch(
  () => settings.open,
  (isOpen) => {
    if (isOpen) {
      draftFont.value = settings.fontFamily;
      draftSize.value = settings.fontSize;
    }
  },
);

function confirm() {
  updateSettings({ fontFamily: draftFont.value, fontSize: draftSize.value });
  closeSettings();
}

function resetDefault() {
  draftFont.value = "sans";
  draftSize.value = "medium";
  resetSettings();
}

function handleRestart() {
  restartGame();
  closeSettings();
  router.replace("/");
}

function onKeydown(event) {
  if (event.key === "Escape" && settings.open) closeSettings();
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div
    v-if="settings.open"
    class="settingsBackdrop"
    @click.self="closeSettings"
  >
    <div
      class="settingsDialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div class="settingsHeader">
        <h2 id="settings-title">設定</h2>
        <button
          type="button"
          class="settingsCloseBtn"
          aria-label="關閉設定"
          @click="closeSettings"
        >
          ✕
        </button>
      </div>
      <div class="settingsBody">
        <p class="settingsIntro">讓故事讀起來更自在。</p>

        <div class="settingsRestartRow">
          <button
            type="button"
            class="settingsRestartLink"
            @click="handleRestart"
          >
            重新開始遊戲
          </button>
        </div>

        <label class="settingsRow" for="setting-font-family">
          <span class="settingsLabel">設定文字字體</span>
          <select
            id="setting-font-family"
            v-model="draftFont"
            class="settingsSelect"
          >
            <option
              v-for="(item, key) in fontFamilies"
              :key="key"
              :value="key"
            >
              {{ item.label }}
            </option>
          </select>
        </label>

        <label class="settingsRow" for="setting-font-size">
          <span class="settingsLabel">設定文字大小</span>
          <select
            id="setting-font-size"
            v-model="draftSize"
            class="settingsSelect"
          >
            <option v-for="(item, key) in fontSizes" :key="key" :value="key">
              {{ item.label }}
            </option>
          </select>
        </label>

        <div
          class="settingsPreview"
          :style="{
            fontFamily: fontFamilies[draftFont].css,
            fontSize: fontSizes[draftSize].px + 'px',
          }"
        >
          在桃城百味裡，遇見一段屬於嘉義的故事。
        </div>

        <div class="settingsActions">
          <button type="button" class="settingsBtnPrimary" @click="confirm">
            確認
          </button>
          <button
            type="button"
            class="settingsBtnSecondary"
            @click="resetDefault"
          >
            重置為預設
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
