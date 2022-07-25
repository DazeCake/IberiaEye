import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'welcome',
		component: () => import('../views/Welcome.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
