import { createRouter,createWebHistory} from "vue-router";
import {createToast} from "mosha-vue-toastify";

export const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: "/dashboard",
        name: "Dashboard",
        component: () => import('../views/Home.vue'),
        meta: { title: '控制台' }
    }, {
        path: "/device",
        name: "Device",
        component: () => import('../views/Devices.vue'),
        meta: { title: '设备管理' }
    }]
})
router.beforeEach((to, from, next) => {
    const udata = JSON.parse(localStorage.getItem('dd_user') || '{}')
    if (to.matched.some(record => !record.meta.noAuth) && !udata?.['user']?.['isLogin']) {
        createToast('请先登录', {
            showIcon: true,
            type: 'info',
            transition: 'bounce',
        })
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
    next()
})
