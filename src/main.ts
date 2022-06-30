import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/el-message.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

// 全局注册el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(router).mount('#app')
