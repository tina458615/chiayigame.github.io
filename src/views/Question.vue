<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { zones, asset } from '../data/game.js'
import { game, finishQuestion } from '../store.js'
import TopBar from '../components/TopBar.vue'
const route = useRoute(), router = useRouter(), id = route.params.zone, zone = zones[id], number = Number(route.params.number), question = zone.questions[number - 1]
const answer = ref(''), selected = ref(null), feedback = ref(''), accepted = ref(false), filled = ref([]), piece = ref(null)
const parts = ['屋頂', '窗框', '門面', '招牌'], shuffledParts = ['窗框', '屋頂', '招牌', '門面']
let timer
function next() {
  if (!finishQuestion(id, number)) return
  router.push(number === zone.questions.length ? `/zone/${id}/stamp` : `/zone/${id}/question/${number + 1}`)
}
function result(correct) {
  if (accepted.value) return
  accepted.value = correct
  feedback.value = correct ? '✅ ' + question.ok : '💡 再觀察一下展場線索，桃喜等你重試喔！'
  if (correct) timer = setTimeout(next, 750)
}
function choose(index) { if (!accepted.value) { selected.value = index; result(index === question.answer) } }
function submit() { result(question.answer.includes(answer.value.replace(/\s/g, ''))) }
function scan() { const path = `/zone/${id}/scan/object/${number}`; game.pendingCameraStart = path; router.push(path) }
function place(part) { if (accepted.value) return; if (piece.value !== part) { feedback.value = '💡 位置不對，換個零件試試看！'; return }; if (!filled.value.includes(part)) filled.value.push(part); piece.value = null; if (filled.value.length === 4) result(true) }
function autoSolve() { filled.value = [...parts]; result(true) }
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template><section class="screen active"><TopBar :title="zone.name + '｜' + question.stage" /><div class="card"><img :src="asset('assets/img/img5.png')" class="heroTaoxi" style="width:110px;margin-top:-4px" alt="桃喜"><div class="questionNum">{{ question.stage }}</div><div class="question">{{ question.text }}</div><div v-if="question.type === 'choice'" class="options"><button v-for="(option,index) in question.options" :key="option" class="opt" :class="{ correct: selected !== null && index === question.answer, wrong: selected === index && index !== question.answer }" :disabled="accepted" @click="choose(index)">{{ option }}</button></div><form v-else-if="question.type === 'text'" class="inputRow" @submit.prevent="submit"><input v-model="answer" class="answerInput" aria-label="請輸入答案" placeholder="請輸入答案" :disabled="accepted"><button class="primary" style="width:auto;padding:12px 18px" :disabled="accepted">送出</button></form><template v-else-if="question.type === 'scan'"><button class="primary" @click="scan">開始 AR 掃描</button><div class="demoNote">對準目標圖片後，系統會自動辨識並完成掃描。</div></template><template v-else-if="question.type === 'puzzle'"><div class="puzzle"><button v-for="part in parts" :key="part" class="slot" :class="{ filled: filled.includes(part) }" @dragover.prevent @drop.prevent="place(part)" @click="place(part)">{{ part }}{{ filled.includes(part) ? ' ✓' : '' }}</button><button v-for="part in shuffledParts.filter(p => !filled.includes(p))" :key="part" class="piece" :class="{ selected: piece === part }" draggable="true" @dragstart="piece = part" @click="piece = part">{{ part }}零件</button></div><div class="tiny">可拖曳零件；手機請先點零件，再點對應位置。</div><button class="secondary" :disabled="accepted" @click="autoSolve">DEMO：自動完成拼圖</button></template><div v-if="feedback" class="feedback" role="status">{{ feedback }}</div></div></section></template>
