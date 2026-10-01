import zones from "./zones.json" with { type: "json" };
import order from "./order.json" with { type: "json" };
import extraStories from "./extraStories.json" with { type: "json" };
import dialogueScript from "./dialogueScript.json" with { type: "json" };
import preludeScripts from "./preludeScripts.json" with { type: "json" };
import portraitImages from "./portraitImages.json" with { type: "json" };
export {
  zones,
  order,
  extraStories,
  dialogueScript,
  preludeScripts,
  portraitImages,
};
export const asset = (path) => `/${path}`;
export const storyById = (id) =>
  zones[id] || extraStories.find((story) => story.id === id);
