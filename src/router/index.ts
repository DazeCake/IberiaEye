import path from 'path'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/admin_login',
		component: () => import('../views/AdminLoginView.vue'),
	},
	{
		path: '/console',
		component: () => import('../views/ConsoleView.vue'),
		children: [
			{
				path: '/log',
				component: () => import('../views/LogView.vue'),
				meta: {
					isShow: true,
					title: "日志"
				}
			},
			{
				path: '/device',
				component: () => import('../views/DeviceView.vue'),
				meta: {
					isShow: true,
					title: "设备"
				}
			},
			{
				path: '/account',
				component: () => import('../views/AccountView.vue'),
				meta: {
					isShow: true,
					title: "账号"
				}
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
