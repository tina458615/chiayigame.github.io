<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { zones, storyById } from "../data/game.js";
import TopBar from "../components/TopBar.vue";
const route = useRoute();
const id = computed(() => route.params.id);
const story = computed(() => storyById(id.value));
const isTaoxiDiary = computed(() => Object.hasOwn(zones, id.value));
</script>
<template>
  <section
    class="screen active"
    :class="isTaoxiDiary ? 'screen-diary-taoxi' : 'screen-diary-jiabo'"
  >
    <TopBar to="/stories" label="← 回手帳" :title="story.name" />
    <div class="bookPage">
      <h3>{{ story.storyTitle }}</h3>
      <p class="storyBody">{{ story.story }}</p>
    </div>
  </section>
</template>
