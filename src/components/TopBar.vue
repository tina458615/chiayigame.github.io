<script setup>
defineProps({
  to: { type: String, default: "/map" },
  label: { type: String, default: "← 回地圖" },
  title: String,
});
</script>
<template>
  <div class="topbar">
    <RouterLink class="backBtn" :to="to">{{ label }}</RouterLink
    ><span class="tiny">{{ title }}</span>
  </div>
</template>
