import { createRouter, createWebHistory } from 'vue-router'
import { createToast } from 'mosha-vue-toastify'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/Landing.vue'),
      meta: { title: '平台首页', noAuth: true },
    },
    {
      path: '/user',
      component: () => import('../components/layout/User.vue'),
      meta: { title: '用户平台', noAuth: true },
      children: [
        {
          path: 'cdk',
          component: () => import('../views/Master/CDK.vue'),
          meta: { title: 'CDK管理' },
        },
        {
          path: 'login',
          component: () => import('../views/User/Login.vue'),
          meta: { title: '用户登录', noAuth: true },
        },
        {
          path: 'reg',
          component: () => import('../views/User/Reg.vue'),
          meta: { title: '用户注册', noAuth: true },
        },
      ],
    },
    {
      path: '/master',
      component: () => import('../components/layout/Master.vue'),
      meta: { title: '后台中心', noAuth: true },
      children: [
        {
          path: 'cdk',
          component: () => import('../views/Master/CDK.vue'),
          meta: { title: 'CDK管理' },
        },
        {
          path: 'login',
          component: () => import('../views/Master/Login.vue'),
          meta: { title: '后台登录', noAuth: true },
        },
        {
          path: 'home',
          component: () => import('../views/Master/Home.vue'),
          meta: { title: '数据统计' },
        },
        {
          path: '/device',
          component: () => import('../views/Master/Devices.vue'),
          meta: { title: '设备管理' },
        },
      ],
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
      path: '/user/login',
      query: { redirect: to.fullPath },
    })
  }
  next()
})
