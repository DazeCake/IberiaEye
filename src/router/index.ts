import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AdminLoginViewVue from '../views/AdminLoginView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/admin_login',
		component: () => import('../views/AdminLoginView.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
