import axios from 'axios'

const $http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
})

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
        return response
    },
    error => {
        const code: number = error.response.status
        if (code === 401) {
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default $http