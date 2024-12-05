import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
import router from './router'
app.use(router)

app.mount('#app')
