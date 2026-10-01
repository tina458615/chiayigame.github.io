<script setup>
import { useRoute, useRouter } from 'vue-router'
import { zones, asset } from '../data/game.js'
import { game } from '../store.js'
import TopBar from '../components/TopBar.vue'
const route = useRoute(), router = useRouter(), id = route.params.zone, zone = zones[id]
function scan() { const path = `/zone/${id}/scan/taoxi`; game.pendingCameraStart = path; router.push(path) }
</script>
<template><section class="screen active"><TopBar title="第 1 小關：尋找桃喜" /><div class="clueBox"><div class="scanBadge">🗺️ 地圖線索</div><h2 class="clueTitle">{{ zone.name }}｜桃喜躲在哪裡？</h2><p class="clueText">「{{ zone.clue }}」<br><span class="tiny">提示：{{ zone.hint }}</span></p><img class="scenePhoto" :src="asset(zone.photo)" alt="展場照片"><button class="primary" @click="scan">開始尋找桃喜</button><RouterLink class="secondary" style="margin-top:10px" to="/map">換一區探索</RouterLink></div></section></template>
