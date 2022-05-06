import { createApp } from 'vue'
import App from '@/App.vue'
import eventBus from 'vue3-eventbus'
import VueAxios from 'vue-axios'
import '@/css/index.css'
import store from '@/plugins/store'
import axios from '@/plugins/axios'
import router from '@/plugins/router'

const app = createApp(App)

app.use(eventBus)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
