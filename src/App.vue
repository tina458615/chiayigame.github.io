<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FooterNav from './components/FooterNav.vue'
import { game } from './store.js'
import { scanner } from './services/scanner.js'
const route = useRoute()
onMounted(() => {
  const preload = () => { void scanner.prepare().catch(() => {}) }
  if ('requestIdleCallback' in window) requestIdleCallback(preload, { timeout: 1500 })
  else setTimeout(preload, 0)
})
</script>
<template>
  <div class="app" :class="{ 'home-active': route.name === 'home' }">
    <RouterView :key="route.path" />
    <FooterNav v-if="route.name !== 'home'" />
    <div class="toast" :class="{ show: game.toast }" role="status">{{ game.toast }}</div>
  </div>
</template>
