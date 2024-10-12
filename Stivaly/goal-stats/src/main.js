import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import '@/assets/css/login.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

createApp(App).use(router).mount('#app')
