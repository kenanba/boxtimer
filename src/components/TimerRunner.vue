<template>
  <n-space vertical size="large" align="center" style="max-width: 480px; margin: 2rem auto;">
    <n-button quaternary type="info" @click="$emit('back')" size="large" style="align-self: flex-start;">
      🔙 Zurück zu den Einstellungen
    </n-button>

    <hr style="width: 100%; border-color: #eee; margin: 1rem 0" />

    <n-card title="Timer läuft" :style="cardStyle">
      <n-space vertical align="center" size="large" style="width: 100%">
        <n-text strong style="font-size: 1.6rem">{{ title }}</n-text>

        <n-statistic
          :value="timeLeft"
          suffix="Sekunden"
          :style="{ fontSize: '3rem', fontWeight: '700' }"
        />

        <n-text
          v-if="phase !== 'fertig'"
          style="font-size: 1.3rem; margin-bottom: 1rem;"
        >
          🥊 Runde {{ currentRound }} / {{ rounds }}
        </n-text>

        <n-space size="medium" style="width: 100%" justify="center" wrap>
          <n-button
            v-if="phase === 'vorbereitung' && !isRunning && !isPaused"
            @click="start"
            type="primary"
            size="large"
            style="min-width: 140px;"
          >
            Start
          </n-button>

          <n-button
            v-if="isRunning && !isPaused"
            @click="pause"
            type="warning"
            size="large"
            style="min-width: 140px;"
          >
            Pause
          </n-button>

          <n-button
            v-if="!isRunning && isPaused"
            @click="resume"
            type="primary"
            size="large"
            style="min-width: 140px;"
          >
            Weiter
          </n-button>

          <n-button
            @click="reset"
            type="error"
            size="large"
            style="min-width: 140px;"
          >
            Reset
          </n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimerStore } from '../store/timerStore'

const emit = defineEmits(['back'])
const store = useTimerStore()
const { phase, timeLeft, currentRound, rounds, isRunning, isPaused } = storeToRefs(store)
const { start, reset, pause, resume } = store

const title = computed(() => {
  switch (phase.value) {
    case 'vorbereitung':
      return 'Vorbereitungszeit'
    case 'runde':
      return 'Rundenzeit'
    case 'pause':
      return 'Ruhezeit'
    case 'fertig':
      return 'Fertig!'
    default:
      return ''
  }
})

const cardStyle = {
  padding: '2rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  borderRadius: '12px',
  width: '100%',
}
</script>

<style scoped>
hr {
  border: none;
  border-top: 1px solid #eee;
}
</style>
