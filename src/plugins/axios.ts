import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import {userStore} from "../store/user";
import {useRouter} from "vue-router";

const service = axios.create()
service.interceptors.response.use(response => {
    return response.data
}, err => {
    if (err.response.status == 401) {
        createToast('登录过期，请重新登录', {
            showIcon: true,
            type: 'danger',
            transition: 'bounce',
        })
        userStore().logout()
        const router = useRouter()
        router.push({path: '/login'})
        return
    }
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
export const GetLoadDevices = () => get('showLoadedDevice')