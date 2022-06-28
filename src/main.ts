import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/el-message.css';

createApp(App).use(router).mount('#app')
