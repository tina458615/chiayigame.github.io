<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const links = [
  { path: "/", icon: "🏠", label: "首頁", active: ["home"] },
  {
    path: "/map",
    icon: "🗺️",
    label: "地圖",
    active: ["map", "zone-intro", "clue", "scan", "question", "stamp"],
  },
  {
    path: "/stories",
    icon: "📖",
    label: "手帳",
    active: ["stories", "story-detail"],
  },
  { path: "/points", icon: "🎟️", label: "集點", active: ["points", "reward"] },
];
</script>
<template>
  <nav class="footerNav" aria-label="主要選單">
    <RouterLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="navBtn"
      :class="{ active: link.active.includes(route.name) }"
      ><span>{{ link.icon }}</span
      >{{ link.label }}</RouterLink
    >
  </nav>
</template>
