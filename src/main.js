import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from '@/router'
import store from "@/store.js";

import { configure } from 'vee-validate'

// VeeValidate global config
configure({
  validateOnBlur: false,
  validateOnChange: true,
  validateOnInput: true
})

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
