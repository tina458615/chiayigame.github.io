import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {
  zones,
  order,
  extraStories,
  dialogueScript,
  preludeScripts,
} from "../src/data/game.js";
import { normalizeProgress, routeFallback } from "../src/progress.js";
test("migration retains client questions, answers and dialogue data", () => {
  const source = fs.readFileSync(
    new URL("../legacy/demo.html", import.meta.url),
    "utf8",
  );
  const code = source
    .slice(
      source.indexOf("const zones ="),
      source.indexOf("function updatePortrait"),
    )
    .replace(/let state=.*?;/, "")
    .replace(/const storeKey=.*?;/, "");
  const original = JSON.parse(
    JSON.stringify(
      vm.runInNewContext(
        code + ";({zones,order,extraStories,dialogueScript,preludeScripts})",
      ),
    ),
  );
  assert.deepEqual(
    { zones, order, extraStories, dialogueScript, preludeScripts },
    original,
  );
});
test("legacy completed stamps survive; invalid saved values cannot grant progress", () => {
  const p = normalizeProgress({
    done: { food: true, daily: "true" },
    journey: { home: 999, craft: -1, store: "2" },
  });
  assert.equal(p.done.food, true);
  assert.equal(p.journey.food, 3);
  assert.equal(p.done.daily, undefined);
  assert.equal(p.journey.home, 0);
  assert.equal(p.journey.craft, 0);
  assert.equal(p.journey.store, 0);
});
test("direct links do not award stamps, bypass scanning or unlock stories", () => {
  const p = normalizeProgress({});
  assert.equal(
    routeFallback(
      { name: "question", params: { zone: "food", number: "1" } },
      p,
    ),
    "/zone/food/clue",
  );
  assert.equal(
    routeFallback({ name: "stamp", params: { zone: "food" } }, p),
    "/zone/food/intro",
  );
  assert.equal(routeFallback({ name: "reward", params: {} }, p), "/points");
  assert.equal(
    routeFallback({ name: "story-detail", params: { id: "food" } }, p),
    "/stories",
  );
  assert.equal(
    routeFallback({ name: "story-detail", params: { id: "extra6" } }, p),
    null,
  );
});
test("invalid zones, stages and scan modes fall back safely", () => {
  const p = normalizeProgress({ done: { food: true, daily: true } });
  assert.equal(
    routeFallback(
      { name: "question", params: { zone: "missing", number: "1" } },
      p,
    ),
    "/map",
  );
  assert.equal(
    routeFallback(
      { name: "question", params: { zone: "food", number: "99" } },
      p,
    ),
    "/zone/food/intro",
  );
  assert.equal(
    routeFallback(
      { name: "scan", params: { zone: "daily", mode: "object", number: "2" } },
      p,
    ),
    "/zone/daily/question/2",
  );
});
