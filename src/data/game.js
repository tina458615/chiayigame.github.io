import zones from "./zones.json" with { type: "json" };
import order from "./order.json" with { type: "json" };
import extraStories from "./extraStories.json" with { type: "json" };
import dialogueScript from "./dialogueScript.json" with { type: "json" };
import tutorialScript from "./tutorialScript.json" with { type: "json" };
import preludeScripts from "./preludeScripts.json" with { type: "json" };
import cutsceneScripts from "./cutsceneScripts.json" with { type: "json" };
import portraitImages from "./portraitImages.json" with { type: "json" };
export {
  zones,
  order,
  extraStories,
  dialogueScript,
  tutorialScript,
  preludeScripts,
  cutsceneScripts,
  portraitImages,
};
export const players = {
  boy: {
    label: "男生小幫手",
    image: "assets/img/player-boy.png",
    dialogueImage: "assets/img/char-boy-shadow.png",
    puzzleImage: "assets/img/char-boy-puzzle-shadow.png",
  },
  girl: {
    label: "女生小幫手",
    image: "assets/img/player-girl.png",
    dialogueImage: "assets/img/char-girl-shadow.png",
    puzzleImage: "assets/img/char-girl-puzzle-shadow.png",
  },
};
export const mapStickers = {
  food: "assets/img/sticker-food.png",
  daily: "assets/img/sticker-daily.png",
  home: "assets/img/sticker-home.png",
  store: "assets/img/sticker-store.png",
  craft: "assets/img/sticker-craft.png",
};
export const asset = (path) => `/${path}`;
export const storyById = (id) =>
  zones[id] || extraStories.find((story) => story.id === id);
