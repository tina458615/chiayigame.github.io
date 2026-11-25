import { reactive, computed } from "vue";
import { zones, order, players } from "./data/game.js";
import { normalizeProgress, storageKey } from "./progress.js";

const playerKey = "taocityPlayerV1";
const settingsKey = "taocitySettingsV1";
const redeemedKey = "taocityRedeemedV1";

export const fontFamilies = {
  sans: {
    label: "黑體",
    css: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  serif: {
    label: "明體",
    css: '"Noto Serif TC", "Songti TC", "PMingLiU", "MingLiU", Georgia, serif',
  },
};

export const fontSizes = {
  small: { label: "小（15px）", px: 15, scale: 0.88 },
  medium: { label: "中（18px，預設）", px: 18, scale: 1 },
  large: { label: "大（21px）", px: 21, scale: 1.14 },
  xlarge: { label: "特大（24px）", px: 24, scale: 1.28 },
};

const defaultSettings = { fontFamily: "sans", fontSize: "medium" };

let initial, savedPlayer, savedSettings, savedRedeemed;
try {
  initial = JSON.parse(localStorage.getItem(storageKey) || "{}");
} catch {
  initial = {};
}
try {
  savedPlayer = localStorage.getItem(playerKey);
} catch {
  savedPlayer = null;
}
try {
  savedSettings = JSON.parse(localStorage.getItem(settingsKey) || "{}");
} catch {
  savedSettings = {};
}
try {
  savedRedeemed = JSON.parse(localStorage.getItem(redeemedKey) || "null");
} catch {
  savedRedeemed = null;
}

export const settings = reactive({
  fontFamily: Object.hasOwn(fontFamilies, savedSettings?.fontFamily)
    ? savedSettings.fontFamily
    : defaultSettings.fontFamily,
  fontSize: Object.hasOwn(fontSizes, savedSettings?.fontSize)
    ? savedSettings.fontSize
    : defaultSettings.fontSize,
  open: false,
});

export function applySettings() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const fam = fontFamilies[settings.fontFamily] || fontFamilies.sans;
  const sz = fontSizes[settings.fontSize] || fontSizes.medium;
  root.style.setProperty("--app-font", fam.css);
  root.style.setProperty("--text-scale", String(sz.scale));
  root.style.setProperty("--body-px", `${sz.px}px`);
}

function saveSettings() {
  try {
    localStorage.setItem(
      settingsKey,
      JSON.stringify({
        fontFamily: settings.fontFamily,
        fontSize: settings.fontSize,
      }),
    );
  } catch {
    // Ignore storage failures in restricted browsers.
  }
}

export function updateSettings({ fontFamily, fontSize }) {
  if (Object.hasOwn(fontFamilies, fontFamily)) settings.fontFamily = fontFamily;
  if (Object.hasOwn(fontSizes, fontSize)) settings.fontSize = fontSize;
  saveSettings();
  applySettings();
}

export function resetSettings() {
  settings.fontFamily = defaultSettings.fontFamily;
  settings.fontSize = defaultSettings.fontSize;
  saveSettings();
  applySettings();
}

export function openSettings() {
  settings.open = true;
}

export function closeSettings() {
  settings.open = false;
}

applySettings();

export const game = reactive({
  ...normalizeProgress(initial),
  player: Object.hasOwn(players, savedPlayer) ? savedPlayer : null,
  redeemed: Boolean(savedRedeemed?.redeemed),
  redeemedAt: savedRedeemed?.redeemedAt || null,
  pendingCameraStart: null,
  toast: "",
});

export function redeemReward() {
  if (game.redeemed) return false;
  const redeemedAt = new Date().toISOString();
  game.redeemed = true;
  game.redeemedAt = redeemedAt;
  try {
    localStorage.setItem(
      redeemedKey,
      JSON.stringify({ redeemed: true, redeemedAt }),
    );
  } catch {
    notify("此瀏覽器無法儲存兌換紀錄，本次畫面仍會保留。");
  }
  notify("已完成獎勵兌換");
  return true;
}

export function setPlayer(id) {
  if (!Object.hasOwn(players, id)) return;
  game.player = id;
  try {
    localStorage.setItem(playerKey, id);
  } catch {
    notify("此瀏覽器無法儲存角色，本次遊戲仍可繼續。");
  }
}

export const doneCount = computed(
  () => order.filter((id) => game.done[id]).length,
);

function save() {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ done: game.done, journey: game.journey }),
    );
  } catch {
    notify("此瀏覽器無法儲存進度，本次遊戲仍可繼續。");
  }
}

export function foundTaoxi(id) {
  game.journey[id] = Math.max(game.journey[id], 1);
  save();
}

export function finishQuestion(id, number) {
  if (game.journey[id] < number) return false;
  game.journey[id] = Math.max(game.journey[id], number + 1);
  if (number === zones[id].questions.length) game.done[id] = true;
  save();
  return true;
}

export function resetGame() {
  Object.assign(game, normalizeProgress({}));
  game.pendingCameraStart = null;
  save();
  notify("Demo 進度已重置");
}

export function restartGame() {
  Object.assign(game, normalizeProgress({}));
  game.player = null;
  game.pendingCameraStart = null;
  try {
    localStorage.removeItem(playerKey);
  } catch {
    // Ignore storage failures.
  }
  save();
  notify("已重新開始遊戲");
}

let toastTimer;
export function notify(text) {
  game.toast = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    game.toast = "";
  }, 2200);
}
