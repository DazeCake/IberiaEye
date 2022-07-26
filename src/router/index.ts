import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'welcome',
		component: () => import('../views/Welcome.vue')
	},
	{
		path: '/user',
		children: [
			{
				path: 'login',
				component: () => import('../views/user/Login.vue')
			},
			{
				path: 'register',
				component: () => import('../views/user/Register.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
