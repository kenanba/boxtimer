<template>
  <n-card
    title="Boxtimer Einstellungen"
    :style="cardStyle"
    :bordered="false"
  >
    <n-space vertical size="large" style="width: 100%">
      <div class="input-group">
        <n-text strong class="label">Vorbereitungszeit (Sekunden)</n-text>
        <n-input-number
          v-model:value="prepTime"
          placeholder="z. B. 10"
          :min="1"
          :max="86400"
          clearable
          :style="inputStyle"
          size="large"
          :show-button="false"
        />
      </div>

      <div class="input-group">
        <n-text strong class="label">Rundenzeit (Sekunden)</n-text>
        <n-input-number
          v-model:value="roundTime"
          placeholder="z. B. 30"
          :min="1"
          :max="86400"
          clearable
          :style="inputStyle"
          size="large"
          :show-button="false"
        />
      </div>

      <div class="input-group">
        <n-text strong class="label">Ruhezeit (Sekunden)</n-text>
        <n-input-number
          v-model:value="restTime"
          placeholder="z. B. 15"
          :min="1"
          :max="86400"
          clearable
          :style="inputStyle"
          size="large"
          :show-button="false"
        />
      </div>

      <div class="input-group">
        <n-text strong class="label">Anzahl der Runden</n-text>
        <n-input-number
          v-model:value="rounds"
          placeholder="z. B. 5"
          :min="1"
          :max="1000"
          clearable
          :style="inputStyle"
          size="large"
          :show-button="false"
        />
      </div>

      <n-button
        type="primary"
        block
        size="large"
        @click="saveSettings"
      >
        Weiter
      </n-button>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'

const prepTime = ref(30)
const roundTime = ref(180)
const restTime = ref(60)
const rounds = ref(8)

const emit = defineEmits(['settingsSaved'])

function saveSettings() {
  emit('settingsSaved', {
    prepTime: prepTime.value,
    roundTime: roundTime.value,
    restTime: restTime.value,
    rounds: rounds.value,
  })
}

const cardStyle = {
  maxWidth: '480px',
  margin: '2rem auto',
  padding: '2rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  borderRadius: '12px',
  fontSize: '1.2rem',
}

const inputStyle = {
  width: '100%',
  fontSize: '1.2rem',
  minHeight: '48px',
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.label {
  font-size: 1.25rem;
  color: #222;
}

@media (max-width: 480px) {
  .input-group {
    margin-bottom: 1.25rem;
  }

  .label {
    font-size: 1.1rem;
  }
}
</style>
