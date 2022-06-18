import { createRouter, createWebHistory } from 'vue-router'
import { createToast } from 'mosha-vue-toastify'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/Home.vue'),
      meta: { title: '控制台' },
    },
    {
      path: '/device',
      name: 'Device',
      component: () => import('../views/Devices.vue'),
      meta: { title: '设备管理' },
    },
    {
      path: '/Config',
      name: 'Config',
      component: () => import('../views/Config.vue'),
      meta: { title: '基础配置', noAuth: true },
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { title: '账号登录', noAuth: true },
    },
  ],
})
router.beforeEach((to, from, next) => {
  const udata = JSON.parse(localStorage.getItem('aegir_user') || '{}')
  if (to.matched.some((record) => !record.meta.noAuth) && !udata?.['user']?.['isLogin']) {
    createToast('请先登录', {
      showIcon: true,
      type: 'info',
      transition: 'bounce',
    })
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
  next()
})
