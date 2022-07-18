import axios from 'axios'
import { ElMessage } from 'element-plus'

const $http = axios.create({
	baseURL: 'http://101.206.110.187:2000/',
	timeout: 2000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
})

// 请求拦截器
$http.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	}
)

// 响应拦截器
$http.interceptors.response.use(
	response => {
		const code: number = response.data.code
		if (code !== 200) {
			//登陆失败
			ElMessage.error(response.data.msg)
			return Promise.reject(response.data)
		} else {
			//登陆成功
			ElMessage.success(response.data.msg)
			return response.data
		}
	},
	error => {
		const code: number = error.response.status
		if (code === 401) {
			ElMessage.error('登录已过期，请重新登录')
			setTimeout(() => {
				window.location.href = '/user_login'
			}, 1000)
			return Promise.reject(error)
		}
		return Promise.reject(error)
	}
)

export default $http