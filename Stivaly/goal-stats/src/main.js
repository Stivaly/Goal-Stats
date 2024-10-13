import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/assets/css/login.css'

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'https://goalstats-api.onrender.com/api'

createApp(App).use(router).mount('#app')
