import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueFeather from 'vue-feather'

// css
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/css/styles.css'

// js
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/js/scripts.js'

const app = createApp(App)

app.component(VueFeather.name, VueFeather)

app.use(router).mount('#app')
