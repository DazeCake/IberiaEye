import path from 'path'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/admin_login',
		component: () => import('../views/AdminLoginView.vue'),
	},
	{
		path: '/user_login',
		component: () => import('../views/UserLoginView.vue'),
	},
	{
		path: '/user_register',
		component: () => import('../views/UserRegisterView.vue'),
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
			},
			{
				path: '/task',
				component: () => import('../views/TaskView.vue'),
				meta: {
					isShow: true,
					title: "任务"
				}
			},
		]
	},
	{
		path: '/userConsole',
		component: () => import('../views/UserConsoleView.vue'),
		children: [
			{
				path: '/user_settings',
				component: () => import('../views/UserSettingsView.vue'),
				meta: {
					isUser: true,
					isShow: true,
					title: "个人设置"
				}
			},
			{
				path: '/user_log',
				component: () => import('../views/UserLogView.vue'),
				meta: {
					isUser: true,
					isShow: true,
					title: "我的日志"
				}
			},
			{
				path: '/user_cdk',
				component: () => import('../views/UserActivateCDKView.vue'),
				meta: {
					isUser: true,
					isShow: true,
					title: "激活CDK"
				}
			},
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
