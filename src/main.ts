import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import Vue3Cookies from 'vue3-cookies'
import VueFeather from 'vue-feather'
import VueSelect from 'vue-select'
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'

// css
import '@fortawesome/fontawesome-free/css/all.min.css'
import "@marcoschulte/vue3-progress/dist/index.css";
import 'vue-toastification/dist/index.css'
import 'vue-select/dist/vue-select.css'
// import './assets/css/datatables.css'
import './assets/css/styles.css'
import './style.css'

// js
import 'bootstrap'
import './assets/js/scripts.js'

const pinia = createPinia()
const app = createApp(App)

app.component(VueFeather.name, VueFeather)
app.component('v-select', VueSelect)

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
  .use(router)
  .use(Toast)
  .use(Vue3Cookies)
  .use(Vue3ProgressPlugin)
  .mount('#app')
