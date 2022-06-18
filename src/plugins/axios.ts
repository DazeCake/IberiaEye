import axios from 'axios'
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
    console.log(err)
})
function post(url: string, params: object) {
    return new Promise((resolve) => {
        service.post(url, params).then(res => {
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
export const HeartBeat = () => post('heartBeat', {status: 0, deviceToken: 'string'})
export const GetLogs = (current: number, size: number) => get(`showLog?current=${current}&size=${size}`)
export const GetTasks = (token: string) => get(`getTask?deviceToken=${token}`)