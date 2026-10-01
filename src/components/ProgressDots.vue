<script setup>
import { order } from '../data/game.js'
import { game } from '../store.js'
</script>
<template><div class="bookTabs" aria-label="五區完成進度"><div v-for="id in order" :key="id" class="dot" :class="{ done: game.done[id] }">{{ game.done[id] ? '✓' : '' }}</div></div></template>
