import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimerStore = defineStore('timer', () => {
  const prepTime = ref(0)
  const roundTime = ref(0)
  const restTime = ref(0)
  const rounds = ref(0)
  const isPaused = ref(false)
    
  const currentRound = ref(1)
  const phase = ref('vorbereitung')
  const timeLeft = ref(0)
  const isRunning = ref(false)

  let interval = null

  function setup(settings) {
    prepTime.value = settings.prepTime
    roundTime.value = settings.roundTime
    restTime.value = settings.restTime
    rounds.value = settings.rounds
    reset()
  }

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    phase.value = 'vorbereitung'
    timeLeft.value = prepTime.value
    runPhase()
  }

  function runPhase() {
    clearInterval(interval)
    interval = setInterval(() => {
      // Spiele Sound 1 Sekunde vor Ende
      if (timeLeft.value === 1) {
        if (phase.value === 'vorbereitung') {
          playBoxingBell() // z. B. Gong vor Rundenstart
        } else if (phase.value === 'runde' && currentRound.value !== rounds.value) {
          playBeep(800, 0.6) // Fertig → hoher, längerer Ton
        } else if (phase.value === 'pause') {
          playBeep(600, 0.8) // Vorbereitung → tiefer Ton
        }
      }

      // Normaler Countdown
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        nextPhase()
      }
    }, 1000)
  }

  function nextPhase() {
    clearInterval(interval)

    if (phase.value === 'vorbereitung') {
      phase.value = 'runde'
      timeLeft.value = roundTime.value
      runPhase()
    } else if (phase.value === 'runde') {
      if (currentRound.value < rounds.value) {
        // Noch weitere Runden → Pause
        phase.value = 'pause'
        timeLeft.value = restTime.value
        runPhase()
      } else {
        playBeep(1000, 1.7) // Fertig → hoher, längerer Ton
        finish()
      }
    } else if (phase.value === 'pause') {
      // Nach Pause → nächste Runde starten
      currentRound.value++
      phase.value = 'runde'
      timeLeft.value = roundTime.value
      runPhase()
    }
  }

  function finish() {
    phase.value = 'fertig'
    isRunning.value = false
    clearInterval(interval)
  }

  function reset() {
    clearInterval(interval)
    currentRound.value = 1
    phase.value = 'vorbereitung'
    timeLeft.value = prepTime.value
    isRunning.value = false
    isPaused.value = false
  }

  function playBoxingBell() {
    const bell = new Audio('/tons/start.wav')
    bell.play()
  }

  function playBeep(frequency = 800, duration = 0.2) {
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    oscillator.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + duration)
  }

  function pause() {
    clearInterval(interval)
    isRunning.value = false
    isPaused.value = true
  }

  function resume() {
    if (timeLeft.value > 0 && phase.value !== 'fertig') {
      isRunning.value = true
      isPaused.value = false
      runPhase()
    }
  }

  return {
    prepTime,
    roundTime,
    restTime,
    rounds,
    currentRound,
    phase,
    timeLeft,
    isRunning,
    setup,
    start,
    reset,
    pause,
    resume,
    isPaused
  }
})