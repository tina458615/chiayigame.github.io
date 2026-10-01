<script setup>
import { useRoute } from "vue-router";
import { storyById } from "../data/game.js";
import TopBar from "../components/TopBar.vue";
const story = storyById(useRoute().params.id);
</script>
<template>
  <section class="screen active">
    <TopBar to="/stories" label="← 回手帳" :title="story.name" />
    <div class="bookPage">
      <h3>{{ story.storyTitle }}</h3>
      <p class="storyBody">{{ story.story }}</p>
    </div>
  </section>
</template>
