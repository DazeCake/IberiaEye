import axios from 'axios'
import qs from 'qs'
import { createToast } from 'mosha-vue-toastify';
const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
service.interceptors.response.use(response => {
    return response.data
}, err => {
    createToast('网络故障，请稍后重试', {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
    })
})
function post(url: string, params: object) {
    return new Promise((resolve) => {
        service.post(url, qs.stringify(params)).then(res => {
            resolve(res)
        })
    })
}
function get(url: string) {
    return new Promise((resolve) => {
        service.get(url).then(res => {
            resolve(res)
        })
    })
}
export default service
export const Login = (username: string, password: string) =>
    post(`adminLogin?username=${username}&password=${password}`, {})