import { reactive, computed } from "vue";
import { zones, order } from "./data/game.js";
import { normalizeProgress, storageKey } from "./progress.js";
let initial;
try {
  initial = JSON.parse(localStorage.getItem(storageKey) || "{}");
} catch {
  initial = {};
}
export const game = reactive({
  ...normalizeProgress(initial),
  pendingCameraStart: null,
  toast: "",
});
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
let toastTimer;
export function notify(text) {
  game.toast = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    game.toast = "";
  }, 2200);
}
