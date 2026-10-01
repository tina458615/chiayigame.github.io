<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dialogueScript, preludeScripts, zones } from '../data/game.js'
import TopBar from '../components/TopBar.vue'
import DialogueBox from '../components/DialogueBox.vue'
const route = useRoute(), router = useRouter()
const zone = computed(() => route.params.zone)
const script = computed(() => zone.value ? preludeScripts[zone.value] : dialogueScript)
const step = computed(() => Math.max(0, Math.min(script.value.length - 1, parseInt(route.query.line, 10) - 1 || 0)))
function move(delta) { router.push({ path: route.path, query: { line: step.value + delta + 1 } }) }
</script>
<template><section class="screen active"><TopBar :to="zone ? '/map' : '/'" :label="zone ? '← 回地圖' : '← 回首頁'" :title="zone ? zones[zone].name : '開場角色對話'" /><div class="card"><h2 class="title" style="font-size:30px">{{ zone ? zones[zone].storyTitle : '小嘉博的任務說明' }}</h2><DialogueBox :item="script[step]" :step="step" :total="script.length" :hint="zone ? '點擊「下一句」，聽聽這一區的追蹤線索。' : '點擊「下一句」聽小嘉博繼續說明任務。'" @previous="move(-1)" @next="move(1)" @finish="router.push(zone ? `/zone/${zone}/clue` : '/map')">{{ zone ? '開始追蹤桃喜' : '打開百味手帳地圖' }}</DialogueBox></div></section></template>
