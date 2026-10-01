<script setup>
import { zones, order, extraStories } from "../data/game.js";
import { game } from "../store.js";
import TopBar from "../components/TopBar.vue";
</script>
<template>
  <section class="screen active">
    <TopBar title="支線小故事" />
    <h2 class="title" style="font-size: 30px">百味手帳</h2>
    <p class="subtitle">
      完成主線任務，解鎖桃喜日記；小嘉博日記一開始就能閱讀。
    </p>
    <div class="storyGrid">
      <div class="storySection">桃喜日記（趣味性故事）</div>
      <RouterLink
        v-for="id in order"
        :key="id"
        :to="game.done[id] ? `/stories/${id}` : '/stories'"
        class="storyCard"
        :class="{ locked: !game.done[id] }"
        :aria-disabled="!game.done[id]"
        @click="!game.done[id] && $event.preventDefault()"
        ><div class="storyIcon" :style="{ background: zones[id].color }">
          {{ game.done[id] ? "📖" : "🔒" }}
        </div>
        <div>
          <b>{{ zones[id].storyTitle }}</b
          ><br /><span class="tiny"
            >桃喜日記｜{{ zones[id].name }}｜{{
              game.done[id] ? "已解鎖" : "完成主線任務後解鎖"
            }}</span
          >
        </div></RouterLink
      >
      <div class="storySection">小嘉博日記（嘉義日常紀實）</div>
      <RouterLink
        v-for="story in extraStories"
        :key="story.id"
        :to="`/stories/${story.id}`"
        class="storyCard"
        ><div class="storyIcon" style="background: #fe9f4d">📘</div>
        <div>
          <b>{{ story.storyTitle }}</b
          ><br /><span class="tiny">{{ story.name }}｜一開始即可閱讀</span>
        </div></RouterLink
      >
    </div>
  </section>
</template>
