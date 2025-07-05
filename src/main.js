import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(createPinia())
app.use(naive)
app.mount('#app')