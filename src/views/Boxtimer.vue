<script setup>
import { useTimerStore } from '../store/timerStore'
import TimerSettings from '../components/TimerSettings.vue'
import TimerRunner from '../components/TimerRunner.vue'
import { ref } from 'vue'

const showTimer = ref(false)
const timerStore = useTimerStore()

function handleSettingsSaved(settings) {
  timerStore.setup(settings)
  showTimer.value = true
}

function handleBackToSettings() {
  showTimer.value = false
  timerStore.reset()
}
</script>

<template>
  <TimerSettings v-if="!showTimer" @settingsSaved="handleSettingsSaved" />
  <TimerRunner v-else @back="handleBackToSettings" />
</template>
